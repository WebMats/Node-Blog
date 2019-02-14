import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom'
import PostsList from './components/PostsList/PostsList';
import './App.css';

class App extends Component {
  state = {
    users: [],
    userPosts: [],
    fetchedUsers: false
  }
  componentDidMount() {
    this.fetchData()
    this.setState({fetchedUsers: true})
  }
  fetchData = (varObj = null) => {
    const requestBody = {
      query: `
        query Users($userId: Int, $withPosts: Boolean = false) {
          users(id: $userId) {
            id
            name
            postsList @include (if: $withPosts) {
              id
              text
            }
          }
        }
      `,
      variables: {
        ...varObj
      }
    }
    fetch('http://localhost:8000/graphql', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    }).then(async (result) => {
      const resData = await result.json();
      if (varObj) {
        const userPosts = resData.data.users[0].postsList
        if (userPosts.length === 0) {
          this.setState({userPosts: "There are no posts for this user."})
          return 
        }
        this.setState({userPosts})
      } else {
        this.setState({users: resData.data.users})
      }
    }).catch((err) => {
      console.log(err)
      throw err
    });
  }
  render() {
    return (
      <div className="App">
        <div className="users__container">
          <ul className="user__list">
              {this.state.users.map(user => <li className="user__list-item" key={user.id}>
                                                {user.name} <button type="button" onClick={this.fetchData.bind(this, {userId: +user.id, withPosts: true})}>
                                                              <Link to={`/users/${user.id}`}>Show Posts</Link>
                                                            </button>
                                            </li>)}
          </ul>
        </div>
        <Route path="/users/:id" render={() => <PostsList triggerFetch={this.fetchData} posts={this.state.userPosts} />} />
      </div>
    );
  }
}

export default withRouter(App);

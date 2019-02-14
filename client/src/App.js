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
    this.fetchUsers()
    this.setState({fetchedUsers: true})
  }
  fetchUsers = () => {
    const requestBody = {
      query: `
        query {
          users {
            id
            name
          }
        }
      `
    }
    fetch('http://localhost:8000/graphql', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    }).then(async (result) => {
      const resData = await result.json()
      
      this.setState({users: resData.data.users})
    }).catch((err) => {
      console.log(err)
      throw err
    });
  }
  fetchPosts = (userId) => {
    const requestBody = {
      query: `
        query Users($userId: Int){
          users(id: $userId) {
            name
            postsList {
              id
              text
            }
          }
        }
      `,
      variables: {
        userId: +userId
      }
    }
    fetch(`http://localhost:8000/graphql`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  }).then( async (result) => {
      const resData = await result.json();
      console.log('ran')
      const userPosts = resData.data.users[0].postsList
      if (userPosts.length === 0) {
        this.setState({userPosts: "There are no posts for this user."})
        return 
      }
      this.setState({userPosts})
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
                                                {user.name} <button type="button" onClick={this.fetchPosts.bind(this, user.id)}>
                                                              <Link to={`/users/${user.id}`}>Show Posts</Link>
                                                            </button>
                                            </li>)}
          </ul>
        </div>
        <Route path="/users/:id" render={() => <PostsList triggerFetch={this.fetchPosts} posts={this.state.userPosts} />} />
      </div>
    );
  }
}

export default withRouter(App);

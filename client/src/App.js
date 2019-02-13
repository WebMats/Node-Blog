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
    fetch('http://localhost:8000/users', {method: "GET"}).then(async (result) => {
      const users = await result.json()
      this.setState({users})
    }).catch((err) => {
      console.log(err)
      throw err
    });
  }
  fetchPosts = (userId) => {
    fetch(`http://localhost:8000/users/posts/${userId}`, {method: "GET"}).then( async (result) => {
      const userPosts = await result.json();
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

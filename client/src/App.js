import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import PostsList from './components/PostsList/PostsList';
import './App.css';

class App extends Component {
  state = {
    users: [],
    userPosts: []
  }
  componentDidMount() {
    this.fetchUsers()
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
      this.setState({userPosts})
    }).catch((err) => {
      
    });
  }
  render() {
    return (
      <div className="App">
        <div className="users__container">
          <ul className="user__list">
              {this.state.users.map(user => <li className="user__list-item" key={user.id}>{user.name} <span onClick={this.fetchPosts.bind(this, user.id)}><Link to={`/users/${user.id}`}>Show Posts</Link></span></li>)}
          </ul>
        </div>
        <Route path="/users" render={() => <PostsList posts={this.state.userPosts} />} />
      </div>
    );
  }
}

export default App;

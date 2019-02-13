import React, { Component } from 'react';
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
              {this.state.users.map(user => <li className="user__list-item" key={user.id}>{user.name} <span onClick={this.fetchPosts.bind(this, user.id)}>Show Posts</span></li>)}
          </ul>
        </div>
        <div className="posts__container">
          <ul className="posts__list">
              {this.state.userPosts.map(post => <li className="posts__list-item" key={post.id}>{post.text}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;

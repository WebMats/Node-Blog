import React from 'react'

import './PostsList.css';


const postsList = (props) => (
    <div className="posts__container">
          <ul className="posts__list">
              {props.posts.map(post => <li className="posts__list-item" key={post.id}>{post.text}</li>)}
          </ul>
        </div>
)

export default postsList

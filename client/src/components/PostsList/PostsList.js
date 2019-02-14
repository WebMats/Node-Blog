import React from 'react'
import { withRouter} from 'react-router-dom'
import './PostsList.css';


const postsList = (props) => {
    let user;
    if (Array.isArray(props.posts) && props.posts.length < 1) {
        props.triggerFetch({userId: +props.match.params.id, withPosts: true})
    } else {
        user = props.posts[0].postedBy;
    }
    if (typeof props.posts === "string") {
        return <p style={{fontSize:"3rem"}}>{props.posts}</p>
    }
    return (
    <div className="posts__container">
        <h3>Showing Posts by: {user}</h3>
          <ol className="posts__list">
              {props.posts.map(post => <li className="posts__list-item" key={post.id}>{post.text}</li>)}
          </ol>
        </div>
    )
}

export default withRouter(postsList)

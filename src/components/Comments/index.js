import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]
const l = initialContainerBackgroundClassNames.length - 1

// Write your code here

class Comments extends Component {
  state = {
    name: '',
    comment: '',
    commentList: [],
    namemsg: '',
    commentmsg: '',
  }

  onchangeName = e => {
    this.setState({name: e.target.value, namemsg: ''})
  }

  onChangeComment = e => {
    this.setState({comment: e.target.value, commentmsg: ''})
  }

  likeUnLikeComment = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (eachComment.id === id) {
          return {
            ...eachComment,
            isLiked: !eachComment.isLiked,
          }
        }
        return eachComment
      }),
    }))
  }

  delteComment = id => {
    this.setState(prevStat => ({
      commentList: prevStat.commentList.filter(each => each.id !== id),
    }))
  }

  onAddComment = e => {
    e.preventDefault()

    let {name, comment} = this.state
    name = name.trim()
    comment = comment.trim()

    if (name !== '' && comment !== '') {
      const randomNo = Math.ceil(Math.random() * l)
      console.log(randomNo)
      const randomBgColor = initialContainerBackgroundClassNames[randomNo]
      const newComment = {
        id: uuidv4(),
        randomBgColor,
        name,
        comment,
        isLiked: false,
        postedTime: new Date(),
      }
      this.setState(prevState => ({
        commentList: [...prevState.commentList, newComment],
        name: '',
        comment: '',
        namemsg: '',
        commentmsg: '',
      }))
    } else if (name === '' && comment === '') {
      this.setState({
        namemsg: '*Please type your name',
        commentmsg: '*please type your comment',
      })
    } else if (name === '') {
      this.setState({
        namemsg: '*Please type your name',
      })
    } else if (comment === '') {
      this.setState({
        commentmsg: '*please type your comment',
      })
    }
  }

  render() {
    const {comment, name, commentList, namemsg, commentmsg} = this.state
    const commentsCount = commentList.length
    localStorage.setItem('commentList', JSON.stringify(commentList))
    return (
      <div className="app-container">
        <div className="container">
          <h1 className="comments-heading">Comments</h1>
          <div className="top-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
            <div className="inputs-container">
              <p className="description-heading">
                Say Something about 4.0 Technologies
              </p>
              <form onSubmit={this.onAddComment}>
                <input
                  type="text"
                  onChange={this.onchangeName}
                  placeholder="Your Name"
                  value={name}
                />

                <br />
                <p className="msg">{namemsg}</p>
                <textarea
                  rows={6}
                  cols={30}
                  placeholder="Your Comment"
                  onChange={this.onChangeComment}
                  value={comment}
                />
                <br />
                <p className="msg">{commentmsg}</p>
                <button type="submit" className="add-comment-button">
                  Add Comment
                </button>
              </form>
            </div>
          </div>
          <p className="comments-count">
            <span className="span">{commentsCount}</span>Comments
          </p>
          <ul className="comments-list-container">
            {commentList.map(eachComment => (
              <CommentItem
                commentDetails={eachComment}
                likeUnLikeComment={this.likeUnLikeComment}
                delteComment={this.delteComment}
                key={eachComment.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments

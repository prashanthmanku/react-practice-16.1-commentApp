// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const likeImg =
  'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
const likedImg =
  'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

const CommentItem = props => {
  const {commentDetails, likeUnLikeComment, delteComment} = props
  const {id, postedTime, name, comment, isLiked, randomBgColor} = commentDetails
  const firstletter = name[0].toUpperCase()
  const date = formatDistanceToNow(postedTime)

  const onClickLike = () => {
    likeUnLikeComment(id)
  }

  const onClickDelete = () => {
    delteComment(id)
  }

  const likeTextClassName = isLiked ? 'color-blue' : 'color-light'

  const imgUrl = isLiked ? likedImg : likeImg

  return (
    <li className="list-item-container">
      <div className="text-bg-container">
        <p className={`profile-letter ${randomBgColor}`}>{firstletter}</p>
        <div className="content-container">
          <div className="name-container">
            <h1 className="user-name">{name}</h1>
            <p className="time">{date}</p>
          </div>
          <p className="comment-description">{comment}</p>
        </div>
      </div>
      <div className="delete-like-imgae-container">
        <div className="like-container">
          <button type="button" className="like-button" onClick={onClickLike}>
            <img src={imgUrl} alt="Like" className="like-img" />
          </button>
          <p className={likeTextClassName}>Like</p>
        </div>
        <button
          type="button"
          className="delete-btn"
          onClick={onClickDelete}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="delete-img"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}
export default CommentItem

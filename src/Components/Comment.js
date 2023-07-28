import PropTypes from "prop-types";

import styles from "../Styles/home.module.css";

const Comment = ({ comment }) => {
    return (
        <div className={styles.postCommentsItem}>
            <div className={styles.postCommentHeader}>
                <span className={styles.postCommentAuthor}>
                    {comment.user.name}
                </span>
                <span className={styles.postCommentTime}>
                    {comment.createdAt}
                </span>
                <span className={styles.postCommentLikes}>
                    {comment.likes.length}
                </span>
            </div>

            <div className={styles.postCommentContent}>
                <span>{comment.content}</span>
                {/* // You can add these functionalities for liking the comment it works fine but need little improvement */}
                {/* <div className={styles.commentActions}>
                    <div className={styles.commentLike}>
                        <Link onClick={handlePostLikeClick}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
                                alt="likes-icon"
                            />
                        </Link>
                    </div>

                    <div className={styles.commentIcon}></div>
                </div> */}
            </div>
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
};

export default Comment;

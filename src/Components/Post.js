import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { createComment, toggleLike } from "../Api";
import { usePosts } from "../Hooks";
import styles from "../Styles/home.module.css";
import { Comment } from "/";

const Post = ({ post }) => {
    const [comment, setComment] = useState("");
    const [creatingComment, setCreatingComment] = useState(false);
    const posts = usePosts();
    const { addToast } = useToasts();

    const handleAddComment = async (e) => {
        if (e.key === "Enter") {
            setCreatingComment(true);

            const response = await createComment(comment, post._id);

            if (response.success) {
                setComment("");
                posts.addComment(response.data.comment, post._id);
                addToast("Comment created successfully!", {
                    appearance: "success",
                });
            } else {
                addToast(response.message, {
                    appearance: "error",
                });
            }

            setCreatingComment(false);
        }
    };

    // Handle like click event for Post and Comment it will not update it in the UI because of the limitation of the API
    const handlePostLikeClick = async () => {
        const response = await toggleLike(post._id, "Post");

        if (response.success) {
            if (response.data.deleted) {
                addToast("Like Remove Successfully!", {
                    appearance: "success",
                });
            } else {
                addToast("Like Added successfully!", {
                    appearance: "success",
                });
            }
        } else {
            addToast(response.message, {
                appearance: "error",
            });
        }
    };
    return (
        <div className={styles.postWrapper} key={`posts-${post._id}`}>
            <div className={styles.postHeader}>
                {/* Avatar */}
                <div className={styles.postAvatar}>
                    <img
                        // src="https://cdn-icons-png.flaticon.com/128/456/456212.png"
                        src="https://cdn-icons-png.flaticon.com/128/3899/3899618.png"
                        alt="user-pic"
                    />

                    <div>
                        <Link
                            to={{
                                pathname: `/user/${post.user._id}`,
                            }}
                            state={{ user: post.user }}
                            className={styles.postAuthor}
                        >
                            {post.user.name}
                        </Link>
                        <span className={styles.postTime}>
                            {/* a minute ago */}
                            {post.createdAt}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className={styles.postContent}>{post.content}</div>

                {/* Actions */}
                <div className={styles.postActions}>
                    <div className={styles.postLike}>
                        <Link onClick={handlePostLikeClick}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
                                alt="likes-icon"
                            />
                        </Link>

                        <span>{post.likes.length}</span>
                    </div>

                    <div className={styles.postCommentsIcon}>
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/3114/3114810.png"
                            alt="comment-icon"
                        />

                        <span>{post.comments.length}</span>
                    </div>
                </div>

                {/* Comment Box */}
                <div className={styles.postCommentBox}>
                    <input
                        placeholder="Start typing a comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={handleAddComment}
                    />
                </div>

                {/* Comment List */}
                <div className={styles.postCommentsList}>
                    {post.comments.map((comment) => {
                        return <Comment comment={comment} />;
                    })}
                </div>
            </div>
        </div>
    );
};

Post.propTypes = {
    posts: PropTypes.object.isRequired,
};

export default Post;

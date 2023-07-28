import PropTypes from "prop-types";

import styles from "../Styles/home.module.css";
import { Loader, Post, FriendsList, CreatePost } from "../Components";
import { useAuth, usePosts } from "../Hooks";

const Home = () => {
    const auth = useAuth();
    const posts = usePosts();

    if (posts.loading) {
        return <Loader />;
    }

    return (
        <div className={styles.home}>
            <div className={styles.postsList}>
                <CreatePost />
                {posts.data.map((post) => (
                    <Post post={post} key={`post-${post._id}`} />
                ))}
            </div>
            {auth.user && <FriendsList />}
        </div>
    );
};

Home.propTypes = {
    posts: PropTypes.array.isRequired,
};

export default Home;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import styles from "../Styles/settings.module.css";
import { useAuth } from "../Hooks";
import { addFriend, fetchUserProfile, removeFriend } from "../Api";
import { Loader } from "../Components";

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [requestInProgress, setRequestInProgress] = useState(false);
    const { userId } = useParams(); // useParams will give ous an object from where we are getting userId
    const { addToast } = useToasts();
    const navigate = useNavigate();
    const auth = useAuth();

    console.log("UserId", userId);

    useEffect(() => {
        const getUser = async () => {
            const response = await fetchUserProfile(userId);

            if (response.success) {
                setUser(response.data.user);
            } else {
                addToast(response.message, {
                    appearance: "error",
                });
                return navigate("/");
            }

            setLoading(false);
        };
        getUser();
    }, [userId, navigate, addToast]);

    if (loading) {
        return <Loader />;
    }

    const checkIfUserIsAFriend = () => {
        const friends = auth.user?.friends;

        /*  is creating an array of friend IDs. */
        const friendIds = friends.map((friend) => friend.to_user._id);
        const index = friendIds.indexOf(userId);

        /* is checking if the `userId` exists in the `friendIds` array. */
        if (index !== -1) {
            return true; // user is a friend
        }

        return false;
    };

    const handleRemoveFriendClick = async () => {
        setRequestInProgress(true);

        const response = await removeFriend(userId);

        if (response.success) {
            const friendship = auth.user.friends.filter(
                (friend) => friend.to_user._id === userId
            );

            auth.updateUserFriends(false, friendship[0]);
            addToast("Friend Remove Successfully", {
                appearance: "success",
            });
        } else {
            addToast(response.message, {
                appearance: "error",
            });
        }

        setRequestInProgress(false);
    };

    const handleAddFriendClick = async () => {
        setRequestInProgress(true);

        const response = await addFriend(userId);

        if (response.success) {
            const { friendship } = response.data;

            auth.updateUserFriends(true, friendship);
            addToast("Friend added Successfully", {
                appearance: "success",
            });
        } else {
            addToast(response.message, {
                appearance: "error",
            });
        }

        setRequestInProgress(false);
    };

    return (
        <div className={styles.settings}>
            <div className={styles.imgContainer}>
                <img
                    src="https://cdn-icons-png.flaticon.com/128/6388/6388129.png"
                    alt=""
                />
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Email</div>
                <div className={styles.fieldLabel}>{user.email}</div>
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Name</div>
                <div className={styles.fieldLabel}>{user.name}</div>
            </div>

            <div className={styles.btnGrp}>
                {checkIfUserIsAFriend() ? (
                    <button
                        className={`button ${styles.saveBtn}`}
                        onClick={handleRemoveFriendClick}
                        disabled={requestInProgress}
                    >
                        {requestInProgress
                            ? "Removing Friend..."
                            : "Remove Friend"}
                    </button>
                ) : (
                    <button
                        className={`button ${styles.saveBtn}`}
                        onClick={handleAddFriendClick}
                        disabled={requestInProgress}
                    >
                        {requestInProgress ? "Adding Friend..." : "Add Friend"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserProfile;

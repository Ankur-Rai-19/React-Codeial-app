import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "../Styles/navbar.module.css";
import { useAuth } from "../Hooks";
import { searchUsers } from "../Api";

const Navbar = () => {
    const [results, setResults] = useState([]);
    const [searchText, setSearchText] = useState("");
    const auth = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await searchUsers(searchText);

            if (response.success) {
                setResults(response.data.users);
            }
        };

        if (searchText.length > 2) {
            fetchUsers();
        } else {
            setResults([]);
        }
    }, [searchText]);

    const handleInputBlur = () => {
        // Reset the search text
        setSearchText("");
        // Clear the search results
        setResults([]);
    };

    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <Link to="/">
                    <img
                        src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
                        alt="logo"
                    />
                </Link>
            </div>

            <div className={styles.searchContainer}>
                <img
                    className={styles.searchIcon}
                    src="https://cdn-icons-png.flaticon.com/128/149/149852.png"
                    alt=""
                />

                <input
                    placeholder="Search Users"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                {results.length > 0 && (
                    <div className={styles.searchResults}>
                        <ul>
                            {results.map((user) => (
                                <li
                                    className={styles.searchResultsRow}
                                    key={`user-${user._id}`}
                                >
                                    <Link to={`/user/${user._id}`}>
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/128/6639/6639394.png"
                                            alt=""
                                        />

                                        <span onClick={handleInputBlur}>
                                            {user.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className={styles.rightNav}>
                {auth.user && (
                    <div className={styles.user}>
                        <Link to="/settings">
                            <img
                                className={styles.userDp}
                                // src="https://cdn-icons-png.flaticon.com/128/9187/9187532.png"
                                src="https://cdn-icons-png.flaticon.com/128/6639/6639394.png"
                                alt="user-profile-pic"
                            />
                        </Link>
                        <span>{auth.user.name}</span>
                    </div>
                )}

                <div className={styles.navLinks}>
                    <ul>
                        {auth.user ? (
                            <>
                                <li onClick={auth.logout}>
                                    Log out
                                    {/* <Link onClick={auth.logout}>Log out</Link> */}
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">Log in</Link>
                                </li>

                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

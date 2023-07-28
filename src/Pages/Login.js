import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { Navigate } from "react-router-dom";

import styles from "../Styles/login.module.css";
import { useAuth } from "../Hooks";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);
    const { addToast } = useToasts();
    const auth = useAuth();
    console.log(auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoggingIn(true);

        if (!email || !password) {
            return addToast("Please Enter Both Email and Password", {
                appearance: "error",
            });
        }

        const response = await auth.login(email, password);

        if (response.success) {
            addToast("Successfully Logged In", {
                appearance: "success",
            });
        } else {
            addToast(response.message, {
                appearance: "error",
            });
        }

        setLoggingIn(false);
    };

    if (auth.user) {
        return <Navigate to="/" />;
    }

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <span className={styles.loginSignupHeader}>Log In</span>

            <div className={styles.field}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <button disabled={loggingIn}>
                    {loggingIn ? "Logging In..." : "Login"}
                </button>
            </div>
        </form>
    );
};

export default Login;

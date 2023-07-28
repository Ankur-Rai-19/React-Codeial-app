// BrowserRouter is  the way they store the URL and communicate with your web server and sync your Ui with server url
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import { Home, Login, Signup, Settings, UserProfile } from "../Pages";
import { Loader, Navbar } from "./";
import { useAuth } from "../Hooks";

function PrivateRoute({ children }) {
    const auth = useAuth();
    return auth.user ? children : <Navigate to={"/login"} />;
}

const Page404 = () => {
    return <h1>404</h1>;
};

function App() {
    const auth = useAuth();

    if (auth.loading) {
        return <Loader />;
    }

    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Signup />}></Route>
                    <Route
                        path="/settings"
                        element={
                            <PrivateRoute>
                                <Settings />
                            </PrivateRoute>
                        }
                    ></Route>

                    <Route
                        path="/user/:userId"
                        element={
                            <PrivateRoute>
                                <UserProfile />
                            </PrivateRoute>
                        }
                    ></Route>

                    {/*// if no other route matches then this will be rendered*/}
                    <Route path="*" element={<Page404 />}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;

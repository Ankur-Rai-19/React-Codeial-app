import React from "react";
import ReactDOM from "react-dom/client";
import { ToastProvider } from "react-toast-notifications";
import "./Styles/index.css";
import { App } from "./Components";
import { AuthProvider, PostsProvider } from "./Providers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
        <AuthProvider>
            <PostsProvider>
                <App />
            </PostsProvider>
        </AuthProvider>
    </ToastProvider>
    // </React.StrictMode>
);

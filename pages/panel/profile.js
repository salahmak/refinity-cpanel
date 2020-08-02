import Layout from "../../components/Layout/Layout.js";
import Profile from "../../components/profile/profile.js";
import { auth } from "../../utils/auth.js";
import Router from "next/router";
import { useState } from "react";
import { API } from "../../exports/config.js";
import { useRouter } from "next/router";

const ProfilePage = ({ user, authenticated, token }) => {
    const Router = useRouter();

    const [emailChange, setEmailChange] = useState({
        newEmail: "",
        password: "",
    });

    const [passwordChange, setPasswordChange] = useState({
        current: "",
        new: "",
        confirm: "",
    });

    const onEmailSubmit = async (e) => {
        e.preventDefault();

        if (user.email === emailChange.newEmail) return;

        const res = await fetch(`${API}/auth/emailChange`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token,
            },
            body: JSON.stringify({
                currentEmail: user.email,
                newEmail: emailChange.newEmail,
                password: emailChange.password,
            }),
        });

        const data = await res.json();
        if (res.ok) Router.reload();
    };

    //pw
    const onPasswordSubmit = async (e) => {
        e.preventDefault();

        if (
            passwordChange.current === passwordChange.new ||
            passwordChange.new !== passwordChange.confirm
        )
            return;

        const res = await fetch(`${API}/auth/passwordChange`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token,
            },
            body: JSON.stringify({
                email: user.email,
                currentPassword: passwordChange.current,
                newPassword: passwordChange.new,
            }),
        });

        const data = await res.json();
        if (res.ok) Router.reload();
    };

    return (
        <Layout name={user.username} authenticated={authenticated}>
            <Profile
                passwordChange={passwordChange}
                setPasswordChange={setPasswordChange}
                emailChange={emailChange}
                setEmailChange={setEmailChange}
                onEmailSubmit={onEmailSubmit}
                onPasswordSubmit={onPasswordSubmit}
                user={user}
            />
        </Layout>
    );
};

export const getServerSideProps = async (ctx) => {
    const { user, error, authenticated, token } = await auth(ctx);
    if (user && !error) {
        return {
            props: {
                user,
                authenticated,
                token,
            },
        };
    } else {
        if (ctx.res) {
            ctx.res.writeHead(302, {
                Location: "/login",
            });
            ctx.res.end();
        } else {
            Router.push("/login");
        }
    }
};

export default ProfilePage;

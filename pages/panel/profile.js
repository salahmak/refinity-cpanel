import Layout from "../../components/Layout/Layout.js";
import Profile from "../../components/profile/profile.js";
import { auth } from "../../utils/auth.js";
import Router from "next/router";
import { useState } from "react";
import signOut from "../../utils/signout.js";
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

    const [alert, setAlert] = useState({ display: false, msg: "", type: "" });

    const [emailLoading, setEmailLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);

    const onEmailSubmit = async (e) => {
        e.preventDefault();

        setEmailLoading(true);
        setAlert({ display: false, msg: "", type: "" });

        if (user.email === emailChange.newEmail) {
            setAlert({
                display: true,
                msg: "the new email can't be the same as the old one",
                type: "email",
            });
            setEmailLoading(false);
            return;
        }
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
        if (!res.ok) {
            if (res.status === 401) return signOut("?msg=unautherized");
            const data = await res.json();
            setAlert({ display: true, msg: data.msg, type: "email" });
            setEmailLoading(false);
            return;
        }

        setEmailLoading(false);
        setAlert({
            display: true,
            msg: "Email has been changed successfully. Reloading...",
            type: "email",
            variant: "success",
        });

        Router.reload();
    };

    //pw
    const onPasswordSubmit = async (e) => {
        e.preventDefault();

        setPasswordLoading(true);
        setAlert({ display: false, msg: "", type: "" });

        if (
            passwordChange.current === passwordChange.new ||
            passwordChange.new !== passwordChange.confirm
        ) {
            setAlert({ display: true, msg: "password doesn't match", type: "password" });
            setPasswordLoading(false);
            return;
        }
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
        if (!res.ok) {
            if (res.status === 401) return signOut("?msg=unautherized");
            const data = await res.json();
            setAlert({ display: true, msg: data.msg, type: "password" });
            setPasswordLoading(false);
            return;
        }

        setPasswordLoading(false);
        setAlert({
            display: true,
            msg: "Password has been changed successfully",
            type: "password",
            variant: "success",
        });

        Router.reload();
    };

    return (
        <Layout title="Refinity panel | Profile" name={user.username} authenticated={authenticated}>
            <Profile
                passwordChange={passwordChange}
                setPasswordChange={setPasswordChange}
                emailChange={emailChange}
                setEmailChange={setEmailChange}
                onEmailSubmit={onEmailSubmit}
                onPasswordSubmit={onPasswordSubmit}
                user={user}
                alert={alert}
                emailLoading={emailLoading}
                passwordLoading={passwordLoading}
            />
        </Layout>
    );
};

export const getServerSideProps = async (ctx) => {
    try {
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
    } catch {
        console.log("there was an error while getting initial props for /profile");
    }
};

export default ProfilePage;

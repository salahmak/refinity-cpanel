import { useState } from "react";
import { useRouter } from "next/router";

function WithAuth(WrappedComponent, type) {
    return (props) => {
        const Router = useRouter();
        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const onSubmit = async (e) => {
            e.preventDefault();

            const valid = ["register", "login"];
            if (!valid.includes(type)) return;

            const body = type === "login" ? { email, password } : { username, email, password };

            const res = await fetch(`/api/auth?type=${type}`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(body),
            });

            if (res.ok) {
                Router.push("/panel");
            }
        };

        return (
            <WrappedComponent
                onSubmit={onSubmit}
                setUsername={setUsername}
                setEmail={setEmail}
                setPassword={setPassword}
                {...props}
            />
        );
    };
}
export default WithAuth;

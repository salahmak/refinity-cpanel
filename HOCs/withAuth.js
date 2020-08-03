import { useState } from "react";
import { useRouter } from "next/router";

function WithAuth(WrappedComponent, type) {
    return (props) => {
        const Router = useRouter();
        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const [alert, setAlert] = useState({ display: false, msg: "", variant: "info" });

        const [loading, setLoading] = useState(false);

        const onSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setAlert({ display: false, msg: "" });
            const valid = ["register", "login"];
            if (!valid.includes(type)) return;

            const body = type === "login" ? { email, password } : { username, email, password };

            try {
                const res = await fetch(`/api/auth?type=${type}`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(body),
                });

                const data = await res.json();

                if (!res.ok) {
                    setAlert({ display: true, msg: data.msg, variant: "danger" });
                    setLoading(false);
                    return;
                }
                setAlert({
                    display: true,
                    msg: "Authenticated succesfully. Redirecting...",
                    variant: "success",
                });
                Router.push("/panel");
            } catch (e) {
                console.error(e);
            }
        };

        return (
            <WrappedComponent
                onSubmit={onSubmit}
                setUsername={setUsername}
                setEmail={setEmail}
                setPassword={setPassword}
                alert={alert}
                loading={loading}
                {...props}
            />
        );
    };
}
export default WithAuth;

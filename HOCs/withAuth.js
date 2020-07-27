import { useState } from "react";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
// This function takes a component...
function WithAuth(WrappedComponent, type) {
    // ...and returns another component...
    return (props) => {
        const Router = useRouter();
        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const onSubmit = async (e) => {
            console.log("clickzed");
            e.preventDefault();
            console.log("prevented");

            const valid = ["register", "login"];
            if (!valid.includes(type)) return;

            const body = type === "login" ? { email, password } : { username, email, password };
            console.log(body);
            const res = await fetch(`http://localhost:3001/auth/${type}`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                const token = await res.json();
                cookies.set("token", token);
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

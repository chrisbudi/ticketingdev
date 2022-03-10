import Router from "next/router";
import { useState } from "react";
import useRequest from "../../hook/use-request";

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: "post",
        body: {
            email,
            password
        },
        onSuccess: () => Router.push('/')
    });;

    const onSubmit = async (e) => {
        e.preventDefault();
        // console.log(email, password);
        await doRequest();

    };
    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div>
                <label htmlFor="">Email</label>
                <input type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-control" />
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    name="Password"
                    className="form-control" />
            </div>
            {errors}
            <button className="btn btn-primary">Sign Up</button>
        </form>);
};
import axios from "axios";
import { useState } from "react";

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        // console.log(email, password);

        try {
            const response = await axios.post('/api/users/signup', {
                email,
                password
            });

            console.log(response.data);
        } catch (error) {

        }
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
            <button className="btn btn-primary">Sign Up</button>
        </form>);
};
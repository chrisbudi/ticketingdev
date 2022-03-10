import axios from "axios";
import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
    console.log(currentUser, "currentUser");
    return currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>;
};


LandingPage.getInitialProps = async (context) => {
    const client = buildClient(context);
    const { data } = await client.get('api/users/currentuser');
    return data;

    // const response = await axios.get('/api/users/currentUser').catch((err) => {
    //     console.log(err.message, "error message");
    // });
    // console.log(response);

    // return response.data;
};

export default LandingPage;
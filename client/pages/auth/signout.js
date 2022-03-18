import Router from "next/router";
import { useEffect } from "react";
import useRequest from "../../hook/use-request";

export default () => {
    const { doRequest } = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/')
    });

    useEffect(() => {
        doRequest();
    }, []);

    return <div>signin you out...</div>;
};
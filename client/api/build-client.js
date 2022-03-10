import axios from "axios";


export default ({ req }) => {
    console.log(typeof window, typeof window === 'undefined', "window");
    if (typeof window === 'undefined') {
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    }
    else {
        return axios.create({
            baseURL: '/'
        });
    }
};
import jwt_decode from "jwt-decode";

const decoder = () => {
    const session = localStorage.getItem('session');
    const decodeSession = jwt_decode(session);
    return decodeSession;
};

export default decoder;
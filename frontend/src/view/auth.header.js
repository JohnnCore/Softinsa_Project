export default function authHeader() {
    const token = JSON.parse(sessionStorage.getItem('user'));
    if (token) {
    return { Authorization: 'Bearer ' + token };
    } else {
    return {};
    }
    }
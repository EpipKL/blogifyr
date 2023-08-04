import decode from 'jwt-decode';

class AuthService {
    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        const token = this.getToken();
        return token ? true : false;
    }

    getToken() {
        const token = localStorage.getItem('id_token');

        try {
            const {exp} = decode(token);

            if (Date.now() >= exp * 1000) {
                return '';
            }
        } catch (err) {
            console.error(err);
            return '';
        }
        return token;
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/me');
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.assign("/");
    }
}

export default new AuthService();
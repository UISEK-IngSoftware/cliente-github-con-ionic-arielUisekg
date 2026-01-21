import axios from 'axios';

const TOKEN_KEY = 'github_auth_token';
const USERNAME_KEY = 'github_auth_username';
const GITHUB_API_URL = import.meta.env.VITE_API_URL || 'https://api.github.com';

class AuthService{
    async login(username: string, token: string): Promise<boolean> {
        if (!username || !token) {
            return false;
        }
        try {
            // Validate token by making a test request
            const response = await axios.get(`${GITHUB_API_URL}/user`, {
                headers: {
                    Authorization: `token ${token}`,
                },
            });
            if (response.status === 200 && response.data.login === username) {
                this.logout();
                localStorage.setItem(USERNAME_KEY, username);
                localStorage.setItem(TOKEN_KEY, token);
                return true;
            }
        } catch (error) {
            console.error('Token validation failed:', error);
        }
        return false;
    }
    logout(){
        localStorage.removeItem(USERNAME_KEY);
        localStorage.removeItem(TOKEN_KEY);
    }
    isAuthenticated(): boolean{
        return localStorage.getItem(TOKEN_KEY) !== null &&
               localStorage.getItem(USERNAME_KEY) !== null;
    }
    getToken(){
        return localStorage.getItem(TOKEN_KEY);

    }

    getUsername(){
        return localStorage.getItem(USERNAME_KEY);
    }

    getAuthHeader(){
        const token = this.getToken();
        const username = this.getUsername();
        if(token && username){
          return 'Bearer ' + token;
        }
        return null;
    }
}
export default new AuthService();
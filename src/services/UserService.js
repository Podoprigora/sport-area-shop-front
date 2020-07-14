import authData from '@remote/json/identity-auth.json';
import notAuthData from '@remote/json/identity-not-auth.json';

import fakeRequest from './fakeRequest';

export default class UserService {
    static async fetchIdentity(auth = true) {
        if (auth) {
            return fakeRequest(authData, { success: true, delay: 1000 });
        }

        return fakeRequest(notAuthData, { success: true, dalay: 1500 });
    }

    static async login(values = {}) {
        if (values.login === 'demo@mail.com') {
            return fakeRequest({ success: true }, { success: true, dalay: 1500 });
        }

        return fakeRequest(
            { errors: { login: 'Email not found!' } },
            { success: false, delay: 2000 }
        );
    }

    static async logout(success = true) {
        return fakeRequest({ success }, { success, delay: 1500 });
    }
}

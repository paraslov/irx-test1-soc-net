import {_axios, _BaseURL} from '../n7-helpers/fake_axios'


export type TLoginParams = {
    email: string
    password: string
}

export const authAPI = {
    login(payload: TLoginParams) {
        return _axios.post(_BaseURL + 'auth/login', {...payload}).then((res: any) => res.data)
    },
    logout() {
        return _axios.delete(_BaseURL+'auth/me').then((res: any) => res.data)
    },
    authMe(payload: {token: string}) {
        return _axios.post(_BaseURL+'auth/me', payload).then((res: any) => res.data)
    }
}
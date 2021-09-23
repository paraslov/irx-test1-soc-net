export const _BaseURL = 'https://test1-soc-net/'
const _baseResponse = {
    status: 200,
    headers: {},
    request: {},
    config: {}
}

const fake_db = {
    '#4545777666': {
        userName: 'Sergio',
        userId: '#4545777666',
        email: 'test@mail.good',
        password: 'test999'
    }
}

const generatedTokenFromServer = 'aaaaaaa.bbbbbbb.ccccccc'

export const _axios = {
    post(url: string, payload: any) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                switch (url) {
                    case _BaseURL + 'auth/login':
                        if (payload.email === fake_db['#4545777666'].email && payload.password === fake_db['#4545777666'].password) {
                            res({
                                ..._baseResponse, data: {
                                    token: generatedTokenFromServer,
                                    userName: fake_db['#4545777666'].userName,
                                    userId: fake_db['#4545777666'].userId,
                                    resultCode: 0
                                },
                            })
                        } else rej({message: 'Check email or password', resultCode: 1})
                        break
                    case _BaseURL + 'auth/me':
                        if(payload.token === generatedTokenFromServer) {
                            res({..._baseResponse, data: {
                                    userName: fake_db['#4545777666'].userName,
                                    userId: fake_db['#4545777666'].userId,
                                    resultCode: 0
                                }})
                        }
                        break
                    default:
                        rej({message: 'Error: check if URL is correct', resultCode: 1})
                }
            }, randomDelay(500, 1500))
        })
    },
    delete(url: string) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                switch (url) {
                    case _BaseURL + 'auth/me':
                        res({
                            ..._baseResponse, data: {
                                resultCode: 0
                            },
                        })
                        break
                    default:
                        rej({message: 'Error: check if URL is correct', resultCode: 1})
                }
            }, randomDelay(500, 1500))
        })
    }
}

const randomDelay = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
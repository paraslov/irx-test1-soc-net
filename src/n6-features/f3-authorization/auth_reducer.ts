import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authAPI, TLoginParams} from '../../n3-api/auth-api'
import {delete_cookie, set_cookie} from '../../n7-helpers/cookie'
import {setIsFetching} from '../../n1-app/a1-app/app_reducer'

export const login = createAsyncThunk('auth/login', async (payload: TLoginParams, thunkAPI) => {
    thunkAPI.dispatch(setIsFetching({isFetching: true}))
    try {
        const data = await authAPI.login(payload)
        // localStorage.setItem('token', data.token)
        set_cookie('token', data.token)
        thunkAPI.dispatch(setIsFetching({isFetching: false}))
        return data
    } catch (err) {
        thunkAPI.dispatch(setIsFetching({isFetching: false}))
        return thunkAPI.rejectWithValue(err)
    }
})
export const logout = createAsyncThunk('auth/logout', async (payload, thunkAPI) => {
    thunkAPI.dispatch(setIsFetching({isFetching: true}))
    try {
        const data: any = await authAPI.logout()
        if(data.resultCode === 0) {
            // localStorage.removeItem('token')
            delete_cookie('token')
        }
        thunkAPI.dispatch(setIsFetching({isFetching: false}))
        return data
    } catch (error) {
        thunkAPI.dispatch(setIsFetching({isFetching: false}))
        return thunkAPI.rejectWithValue(error)
    }
})


const initState = {
    isAuth: false,
    userName: null,
    userId: null,
}

const slice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        setIsAuth(state, action: PayloadAction<{isAuth: boolean}>) {
            state.isAuth = action.payload.isAuth
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.userName = action.payload.userName
                state.userId = action.payload.userId
                state.isAuth = !state.isAuth
            })
            .addCase(login.rejected, (state, action: any) => {
                alert(action.payload.message)
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuth = false
                state.userId = null
                state.userName = null
            })
    }
})

export const {setIsAuth} = slice.actions
export const authReducer = slice.reducer
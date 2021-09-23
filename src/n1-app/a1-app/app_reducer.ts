import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authAPI} from '../../n3-api/auth-api'
import {setIsAuth} from '../../n6-features/f3-authorization/auth_reducer'
import {get_cookie} from '../../n7-helpers/cookie'


export const initializeApp = createAsyncThunk('app/initializeApp', async (payload, thunkAPI) => {
    try {
        // const token = localStorage.getItem('token')
        const token = get_cookie('token')
        if(token) {
            thunkAPI.dispatch(setIsFetching({isFetching: true}))
            const data = await authAPI.authMe({token})
            if (data.resultCode === 0) {
                thunkAPI.dispatch(setIsAuth({isAuth: true}))
                thunkAPI.dispatch(setIsFetching({isFetching: false}))
                return {isAppInitialized: true}
            } else {
                thunkAPI.dispatch(setIsFetching({isFetching: false}))
                return {isAppInitialized: true}
            }
        } else {
            thunkAPI.dispatch(setIsFetching({isFetching: false}))
            return {isAppInitialized: true}
        }
    } catch (error) {
        thunkAPI.dispatch(setIsFetching({isFetching: false}))
        return thunkAPI.rejectWithValue(error)
    }
})

const initState = {
    isAppInitialized: false,
    isFetching: false,
}

const slice = createSlice({
    name: 'app',
    initialState: initState,
    reducers: {
        setIsFetching(state, action: PayloadAction<{isFetching: boolean}>) {
            state.isFetching = action.payload.isFetching
        }
    },
    extraReducers: builder => {
        builder.addCase(initializeApp.fulfilled, (state, action) => {
            state.isAppInitialized = action.payload.isAppInitialized
        })
    }
})

export const appReducer = slice.reducer
export const {setIsFetching} = slice.actions
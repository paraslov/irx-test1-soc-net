import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import { appReducer } from '../../n1-app/a1-app/app_reducer'
import { authReducer } from '../../n6-features/f3-authorization/auth_reducer'


const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
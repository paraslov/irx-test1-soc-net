import React from 'react'
import {useAppDispatch, useAppSelector} from '../../n2-bll/store/store'
import {Redirect} from 'react-router-dom'
import { PATH } from '../../n1-app/a2-routes/Routes'
import {logout} from '../f3-authorization/auth_reducer'
import s from './News.module.css'


export const News = () => {

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()

    const logoutHandler = () => dispatch(logout())


    if(!isAuth) return <Redirect to={PATH.AUTHORIZATION}/>

    return (
        <div className={s.wrapper}>
            <button className={s.btn} onClick={logoutHandler}>Logout</button>
        </div>
    )
}
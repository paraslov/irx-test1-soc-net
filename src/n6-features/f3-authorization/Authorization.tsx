import React from 'react'
import {useAppDispatch, useAppSelector} from '../../n2-bll/store/store'
import {useFormik} from 'formik'
import {TLoginParams} from '../../n3-api/auth-api'
import {login} from './auth_reducer'
import {Redirect} from 'react-router-dom'
import { PATH } from '../../n1-app/a2-routes/Routes'
import s from './Authorization.module.css'


export const Authorization = () => {

    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const formik = useFormik<TLoginParams>({
        initialValues: {
            email: 'test@mail.good',
            password: 'test999',
        },
        onSubmit: values => {
            dispatch(login(values))
        }
    })

    if(isAuth) return <Redirect to={PATH.NEWS}/>

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className={s.wrapper}>
                <input name={'email'}
                       className={s.formItem}
                       placeholder={'Enter your email'}
                       type={'text'}
                       onChange={formik.handleChange}
                       value={formik.values.email}/>
                <input name={'password'}
                       className={s.formItem}
                       placeholder={'Enter your password'}
                       type={'password'}
                       onChange={formik.handleChange}
                       value={formik.values.password}/>
                <button className={s.formItem} type={'submit'}>Sign in</button>
            </form>
        </div>
    )
}
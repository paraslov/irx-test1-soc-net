import React, {useEffect} from 'react'
import './App.css'
import {Routes} from '../a2-routes/Routes'
import {HashRouter} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../n2-bll/store/store'
import {initializeApp} from './app_reducer'

function App() {
    const isAppInitialized = useAppSelector(state => state.app.isAppInitialized)
    const isFetching = useAppSelector(state => state.app.isFetching)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(!isAppInitialized) dispatch(initializeApp())
    }, [])

    if(isFetching) return <div className={'preloader'}>Loading...</div>
    return (
        <HashRouter>
            <div className="App">
                <Routes />
            </div>
        </HashRouter>
    )
}

export default App

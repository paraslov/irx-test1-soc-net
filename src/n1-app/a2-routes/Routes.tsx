import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {News} from '../../n6-features/f1-news/News'
import {Authorization} from '../../n6-features/f3-authorization/Authorization'


export const PATH = {
    AUTHORIZATION: '/authorization',
    NEWS: '/news',
    NOT_FOUND: '/404'
}

export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path={'/'} render={() => <Redirect to={PATH.NEWS}/>}/>
                <Route path={PATH.AUTHORIZATION} render={() => <Authorization/>}/>
                <Route path={PATH.NEWS} render={() => <News/>}/>
            </Switch>
        </div>
    )
}
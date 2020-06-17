import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import Menu from './core/Menu';
const MainRouter = () => {
    return (
        <div>
            <Menu />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
            </Switch>
        </div>
    )
}

export default MainRouter

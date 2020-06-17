import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from "../auth";
const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" }
    } else {
        return { color: "#ffffff" }
    }
}




const menu = ({ history }) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                {!isAuthenticated() ? (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Signup</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">Signin</Link>
                        </li>
                    </>
                ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" style={{ cursor: "pointer", color: "#ffffff" }} onClick={() => signout(() => history.push("/signin"))}>Signout</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" style={{ cursor: "pointer", color: "#ffffff" }} >{isAuthenticated().user.name}</a>
                            </li>
                        </>
                    )}


            </ul>
        </div>
    )
}

export default withRouter(menu)

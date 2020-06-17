import React, { Component } from 'react'
import { signup } from "../auth";
import { Redirect } from 'react-router-dom';
export class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false,
            redirectToReferer: false,
        }
    }


    handleChange = (name) => (e) => {
        this.setState({ error: "" })
        this.setState({
            [name]: e.target.value
        })
    }

    clickSubmit = (e) => {
        e.preventDefault()
        const { name, email, password } = this.state
        const user = {
            name,
            email,
            password
        }
        console.log(user)
        signup(user).then(data => {
            console.log(data)
            if (data.error) {
                this.setState({
                    error: data.error
                })
            } else {
                this.setState({
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    open: true,
                    redirectToReferer: true
                })
            }
        })
    }



    signupForm(name, email, password) {
        return <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" placeholder="name" className="form-control" onChange={this.handleChange("name")} value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="text" placeholder="email" className="form-control" onChange={this.handleChange("email")} value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="text" placeholder="password" className="form-control" onChange={this.handleChange("password")} value={password} />
            </div>
            <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>Signup</button>
        </form>
    }



    render() {
        const { name, email, password, error, open, redirectToReferer } = this.state
        if (redirectToReferer) {
            return <Redirect to="/signin" />
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                <div className="alert alert-info" style={{ display: open ? "" : "none" }}>
                    Sucessfully Created User
                </div>
                {this.signupForm(name, email, password)}
            </div>
        )
    }
}

export default Signup

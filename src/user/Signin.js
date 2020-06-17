import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";

export class Signin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
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
        this.setState({ loading: true })
        const { email, password } = this.state
        const user = {
            email,
            password
        }
        console.log(user)
        signin(user).then(data => {
            console.log(data)
            if (data.error) {
                this.setState({
                    error: data.error,
                    loading: false
                })
            } else {
                authenticate(data, () => {
                    this.setState({ redirectToReferer: true })
                })
            }
        })
    }



    signinForm(email, password) {
        return <form>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="text" placeholder="email" className="form-control" onChange={this.handleChange("email")} value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="text" placeholder="password" className="form-control" onChange={this.handleChange("password")} value={password} />
            </div>
            <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>Signin</button>
        </form>
    }



    render() {
        const { email, password, error, redirectToReferer, loading } = this.state
        if (redirectToReferer) {
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signin</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                {loading ? (<div className="jumbotron text-center">
                    <h2>Loading....</h2>
                </div>) : ("")}

                {this.signinForm(email, password)}

            </div>
        )
    }
}

export default Signin

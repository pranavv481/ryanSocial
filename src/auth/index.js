export const signup = (user) => {
    return fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
        .catch(err => console.log(err))
}

export const signin = (user) => {
    return fetch("http://localhost:8080/api/signin", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
        .catch(err => console.log(err))
}

export const authenticate = (jwt, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem("jwt", JSON.stringify(jwt))
        next()
    }
}


export const isAuthenticated = () => {
    // if (typeof window !== "undefined") {
    //     return false
    // }

    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }
}

export const signout = (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt")
    } next()
    return fetch("http://localhost:8080/api/signout", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },

    }).then(res => {
        console.log(res)
        res.json()
    })
        .catch(err => console.log(err))
}
import React from 'react'
import './login.css'

const Login = () => {

    return (
        <form action="http://localhost:8000/api/google" method="get">
            <input type="submit" value="Press to log in through Google" />
        </form>
    )
}

export default Login
import React, { useState, useContext } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
    const [inputs, setInputs] = useState({
        username:"",
        password:"",
    })

    const [err, setError] = useState(null)

    const navigate = useNavigate()

    const {login} = useContext(AuthContext)

    const handleChange = e => {
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await login(inputs)
            navigate("/")
        } catch(err) {
            setError(err.response.data)
        }
    }
    
    return (
        <>
            <h3 className="my-4">Login</h3>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Benutzer</InputGroup.Text>
                <Form.Control
                required
                placeholder="..."
                name="username"
                onChange={handleChange}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Passwort</InputGroup.Text>
                <Form.Control
                required
                placeholder="..."
                name="password"
                onChange={handleChange}
                />
            </InputGroup>
            {err && 
            <Alert key="warning" variant="warning">{err}</Alert>}
            <Button onClick={handleSubmit}>Anmelden</Button>
            <p className="my-3">Hast du noch kein Konto? <Link to="/register">Hier registrieren..</Link></p>
        </>
    )
}

export default Login
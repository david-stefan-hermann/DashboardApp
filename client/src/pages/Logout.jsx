import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
    const [inputs, setInputs] = useState({
        username:"",
        password:"",
    })

    const [err, setError] = useState(null)

    const navigate = useNavigate()

    const handleChange = e => {
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post("/auth/login", inputs)
            navigate("/")
        } catch(err) {
            setError(err.response.data)
        }
    }
    
    return (
        <>
            <h3 className="my-4">Logout</h3>
            <Button onClick={handleSubmit}>Abmelden</Button>
            {err && 
            <Alert key="warning" variant="warning">{err}</Alert>}
            <p className="my-1"><Link to="/">..zurück</Link></p>
        </>
    )
}

export default Logout
import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Logout = () => {
    const [err, setError] = useState(null)

    const navigate = useNavigate()

    const {logout} = useContext(AuthContext)

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await logout()
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
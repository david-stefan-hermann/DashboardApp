import React, { useContext } from "react"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { AuthContext } from "../context/authContext"
import { Link } from "react-router-dom"

const Header = () => {

    const { currentUser } =useContext(AuthContext)

    return (
        <header>
            <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">David Hermann</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="">
                            <Nav.Link href="/portfolio">Portfolio</Nav.Link>
                            <Nav.Link href="/experience">Erfahrung</Nav.Link>
                        </Nav>

                        <Navbar.Collapse className="justify-content-end">
                            {!currentUser &&
                                <Navbar.Text><Link to="/login">zum Login..</Link></Navbar.Text>
                            }
                            {currentUser &&
                                <Navbar.Text>Hallo <Link to="/logout">{currentUser.username}</Link>!</Navbar.Text>
                            }
                        </Navbar.Collapse>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
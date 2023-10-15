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
            <Navbar expand="lg" variant="dark" bg="dark" className="fw-normal">
                <Container>
                    <Navbar.Brand className="background-color-text" href="/">David Hermann</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav>
                            <Nav.Link className="background-color-text" href="/doku/?category=public">Dokumentation</Nav.Link>
                            <Nav.Link className="background-color-text" href="https://github.com/david-stefan-hermann">Meine Projekte</Nav.Link>
                        </Nav>

                        <Navbar.Collapse className="justify-content-end">
                            {!currentUser &&
                                <Navbar.Text><Link className="background-color-text" to="/login">zum Login..</Link></Navbar.Text>
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
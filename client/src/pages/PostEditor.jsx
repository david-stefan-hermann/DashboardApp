import React, { useEffect, useState, useContext } from "react"
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/esm/Image"
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Trash, Upload } from "react-bootstrap-icons"

import axios from "axios"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import PostList from "../components/PostList"
import TableOfContent from "../components/TableOfContent"
import OnSitePost from "../components/OnSitePost"
import SiteLocation from "../components/SiteLocation"
import { AuthContext } from '../context/authContext';
import ReactMarkdown from 'react-markdown';
import LoadingSpinner from "../components/LoadingSpinner"
import moment from "moment"

const PostEditor = () => {
    const { currentUser } = useContext(AuthContext)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ updater, setUpdater ] = useState(false)
    const [ creatingNewPost, setCreatingNewPost ] = useState(false)
    const [ post, setPost ] = useState({})
    const [ newPost, setNewPost ] = useState({})
    const [postLinks, setPostLinks] = useState([])

    const navigate = useNavigate()

    const blankNewPost = {
        id: -1,
        is_private: false,
        parentid: 0,
        uid: 0,
        image: "",
        title: "",
        short: "",
        content: ""
    }
    
    const postIdFromUrl = useLocation().pathname.split("/")[2]
    
    console.log("PE: new Post?: " + creatingNewPost)
    //console.log("PE: " + typeof postIdFromUrl)

    useEffect(() => {
        if (isNaN(postIdFromUrl)) {
            setCreatingNewPost(true)
            setPost(blankNewPost)
            setNewPost(blankNewPost)
        } else {    
            const fetchData = async () => {
                try {
                    const res = await axios.get("/posts/" + postIdFromUrl)
                    setPost(res.data)
                    setNewPost(res.data)
                    console.log(res.data)
                } catch(err) {
                    console.log(err)
                }
            }
            fetchData()
        }
        setIsLoading(false)

        // load available posts
        const fetchLinks = async () => {
            try {
                const res = await axios.get("/links/")
                setPostLinks(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchLinks()
    }, [])

    useEffect(() => {
        const updatePreview = async () => {
            

            console.log("PE : " + newPost)
        }
    }, [updater])

    function handleChangeTitle() {
        const thisPost = newPost
        const elem = document.getElementById("edit-title")
        thisPost.title = elem.value
        setNewPost(thisPost)
        setUpdater(!updater)
    }

    function handleChangePrivate() {
        const thisPost = newPost
        const elem = document.getElementById("edit-private")
        thisPost.is_private = elem.checked
        setNewPost(thisPost)
        setUpdater(!updater)
    }

    function handleChangeParent() {
        const thisPost = newPost
        const elem = document.getElementById("edit-parent")
        thisPost.parentid = elem.value
        setNewPost(thisPost)
        setUpdater(!updater)
    }

    function handleChangeImage() {
        const thisPost = newPost
        const elem = document.getElementById("edit-image")
        thisPost.image = elem.value
        setNewPost(thisPost)
        setUpdater(!updater)
    }

    function handleChangeShort() {
        const thisPost = newPost
        const elem = document.getElementById("edit-short")
        thisPost.short = elem.value
        setNewPost(thisPost)
        setUpdater(!updater)
    }

    function handleChangeContent() {
        const thisPost = newPost
        const elem = document.getElementById("edit-content")
        thisPost.content = elem.value
        setNewPost(thisPost)
        setUpdater(!updater)
    }
    
    const handleDelete = async() => {
        try {
            await axios.delete("/posts/" + postIdFromUrl)
            navigate("/doku")
        } catch(err) {
            console.log(err)
        }
    }

    const handleUpdate = async() => {
        const thisUserId = currentUser ? currentUser.id : 0

        if (creatingNewPost) {
            // Post
            try {
                await axios.post("/posts/", {
                    is_private: newPost.is_private,
                    parentid: newPost.parentid,
                    uid: thisUserId,
                    image: newPost.image,
                    title: newPost.title,
                    short: newPost.short,
                    content: newPost.content,
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                })
                navigate("/doku/" + newPost.id)
            } catch(err) {
                console.log(err)
            }
        } else {
            // Update
            try {
                await axios.put("/posts/" + postIdFromUrl, {
                    is_private: newPost.is_private,
                    parentid: newPost.parentid,
                    image: newPost.image,
                    title: newPost.title,
                    short: newPost.short,
                    content: newPost.content,
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                })
                navigate("/doku/" + newPost.id)
            } catch(err) {
                console.log(err)
            }
        }
    }

    return (
        <>
            { isLoading ? <LoadingSpinner></LoadingSpinner> : null }
            <Row className="bg-dark text-light p-5 m-3 rounded">
                <Col sm={6}>
                    <FloatingLabel 
                    label="Titel" 
                    controlId="edit-title" 
                    data-bs-theme="dark"
                    className="mb-4"
                    onChange={() => handleChangeTitle()}
                    >
                        <Form.Control
                        value={post.title}
                        className="box-shadow text-input-field"
                        as="textarea"
                        style={{ height: '100px' }}
                        />
                    </FloatingLabel>

                    <FloatingLabel 
                    label="Titelbild" 
                    controlId="edit-image" 
                    data-bs-theme="dark"
                    className="mb-4"
                    onChange={() => handleChangeImage()}
                    >
                        <Form.Control
                        value={post.image}
                        className="box-shadow text-input-field"
                        as="textarea"
                        style={{ height: '100px' }}
                        />
                    </FloatingLabel>

                    <FloatingLabel 
                    label="Übergeordneter Beitrag" 
                    controlId="edit-parent" 
                    data-bs-theme="dark"
                    className="mb-4"
                    onChange={() => handleChangeImage()}
                    >
                        <Form.Select 
                        onChange={() => handleChangeParent()}
                        >
                            <option value="0">kein übergeordneter Beitrag</option>
                            {postLinks?.map(link => {
                                return(<option value={link.id}>{link.title}</option>)
                            })}
                        </Form.Select>
                    </FloatingLabel>

                    <Form.Check
                        label="privat?"
                        id="edit-private"
                        type="switch"
                        data-bs-theme="dark"
                        className="mb-4"
                        checked={post.is_private}
                        onChange={() => handleChangePrivate()}
                    />
                </Col>
                <Col sm={6}>
                    <h4 className="mb-4">{newPost?.title}</h4>
                    {newPost?.image ?
                        <Image
                        className="mb-4"
                        src={newPost.image}
                        fluid></Image>
                        : "Titelbild"
                    }
                </Col>
            </Row>
            <Row className="bg-dark text-light p-5 m-3 rounded">
                <Col sm={6}>
                    <FloatingLabel 
                    label="Beschreibung" 
                    controlId="edit-short" 
                    data-bs-theme="dark"
                    className="mb-4"
                    onChange={() => handleChangeShort()}
                    >
                        <Form.Control
                        value={post.short}
                        className="box-shadow text-input-field"
                        as="textarea"
                        style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                </Col>
                <Col sm={6}>
                    { newPost?.short ? 
                        <>
                        <Container className="box-shadow px-4 primary-color rounded-top">
                            Vorschau
                        </Container>
                        <Container className="box-shadow p-4 mb-4 rounded-bottom">
                            <ReactMarkdown>{newPost?.short}</ReactMarkdown>
                        </Container>
                        </>
                        :
                        <p>Hier wird die Beschreibung angezeigt</p>
                    }
                </Col>
            </Row>
            <Row className="bg-dark text-light p-5 m-3 rounded">
                <Col sm={6}>
                    <FloatingLabel 
                    label="Inhalt" 
                    controlId="edit-content" 
                    data-bs-theme="dark"
                    className="mb-4"
                    onChange={() => handleChangeContent()}
                    >
                        <Form.Control
                        value={post.content}
                        className="box-shadow text-input-field"
                        as="textarea"
                        style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                    {
                        creatingNewPost ?
                        "" :
                        <Button variant="dark" className="me-4 border-danger" onClick={handleDelete}><Trash /> &nbsp;Beitrag löschen</Button>
                    }
                        <Button variant="success" onClick={handleUpdate}>
                            <Upload /> &nbsp;{creatingNewPost ? "Beitrag hochladen" : "Beitrag Updaten"}
                        </Button>
                </Col>
                <Col sm={6}>
                    { newPost?.content ? 
                        <>
                        <Container className="box-shadow px-4 primary-color rounded-top">
                            Vorschau
                        </Container>
                        <Container className="box-shadow p-4 rounded-bottom">
                            <ReactMarkdown>{newPost?.content}</ReactMarkdown>
                        </Container>
                        </>
                        :
                        <p>Hier wird der Inhalt angezeigt</p>
                    }
                </Col>
            </Row>
        </>
    )
}

export default PostEditor
import React, { useEffect, useState, useContext } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/esm/Image"
import Button from 'react-bootstrap/Button'
import LoadingSpinner from "./LoadingSpinner"
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { HouseFill, CaretRightFill } from 'react-bootstrap-icons';

import axios from "axios"
import { PostContext } from "../context/postContext"
import { Link, useLocation } from "react-router-dom"

const SiteLocation = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [siteLocation, setSiteLocation] = useState([])
    const [ currentPostExists, setCurrentPostExists ] = useState([])
    // loading the correct sub site
    const { replaceSpaces, parentId, setParentId, setCurrentPostId, currentPostId } = useContext(PostContext)

    const findById = async id => {
        if (id <= 0 || !id || id == null) {
        } else {
            try {
                const res = await axios.get("/links/" + id)
                //setLoopCurrentId(res.data[0].parentid)
                
                findById(res.data[0].parentid)
                
                setSiteLocation(oldSiteLocation => [res.data[0], ...oldSiteLocation])                
            } catch(err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        // clear site location
        setSiteLocation([])
        findById(currentPostId)
        setIsLoading(false)
    }, [currentPostId])

    return (
        <>
            { currentPostId > 0 ? <>
                { isLoading ? <LoadingSpinner></LoadingSpinner> : null }
                <Container>
                <Link to={"/doku/"}><HouseFill color="var(--green-1)" /></Link>
                    {siteLocation.map((loc, idx) => {
                        return (
                            <>
                            <span className="not-active">&nbsp;&nbsp;<CaretRightFill />&nbsp;&nbsp;</span>  
                            <Link 
                            to={"/doku/" + loc.id + "/" + replaceSpaces(loc.title)}
                            key={"loc-" + loc.id} 
                            className={ loc.id == currentPostId ? "active font-weight-light cursor-pointer" : "font-weight-light cursor-pointer"} 
                            >{loc.title}</Link></>
                            )
                        })}
                </Container>
            </> : ""}
        </>
    )
}

export default SiteLocation
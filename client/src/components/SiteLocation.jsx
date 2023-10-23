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
                
                findById(res.data.parent)
                
                setSiteLocation(oldSiteLocation => [res.data, ...oldSiteLocation])                
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
            { currentPostId != "" ? <>
                { isLoading ? <LoadingSpinner></LoadingSpinner> : null }
                <Container>
                <Link to={"/"}><HouseFill color="var(--green-1)" /></Link>
                    {siteLocation.map((loc, idx) => {
                        return (
                            <>
                            <span className="not-active">&nbsp;&nbsp;<CaretRightFill />&nbsp;&nbsp;</span>  
                            <Link 
                            to={"/" + loc?._id + "/" + replaceSpaces(loc?.title)}
                            key={"loc-" + loc?._id} 
                            className={ loc?._id == currentPostId ? "active font-weight-light cursor-pointer" : "font-weight-light cursor-pointer"} 
                            >{loc?.title}</Link></>
                            )
                        })}
                </Container>
            </> : ""}
        </>
    )
}

export default SiteLocation
import { createContext, useEffect, useState } from "react"

export const PostContext = createContext()

export const PostContextProvider = ({children}) => {
    const [post, setPost] = useState({})
    const [parentId, setParentId] = useState([])
    const [currentPostId, setCurrentPostId] = useState([])

    return <PostContext.Provider value={{post, setPost, parentId, setParentId, currentPostId, setCurrentPostId}}>
        {children}
    </PostContext.Provider>
}
import { createContext, useEffect, useState } from "react"

export const PostContext = createContext()

export const PostContextProvider = ({children}) => {
    const [parentId, setParentId] = useState(0)
    const [currentPostId, setCurrentPostId] = useState(null)
    const [subSitesExist, setSubSitesExist] = useState(false)

    const goToTopLevel = () => {
        setParentId(0)
        setCurrentPostId(null)
    }

    return <PostContext.Provider value={{ subSitesExist, setSubSitesExist, goToTopLevel, parentId, setParentId, currentPostId, setCurrentPostId}}>
        {children}
    </PostContext.Provider>
}
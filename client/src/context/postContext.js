import { createContext, useEffect, useState } from "react"

export const PostContext = createContext()

export const PostContextProvider = ({children}) => {
    const [parentId, setParentId] = useState(0)
    const [currentPostId, setCurrentPostId] = useState(null)
    const [subSitesExist, setSubSitesExist] = useState(false)
    const [currentPostTitle, setCurrentPostTitle] = useState("")

    const replaceSpaces = str => str.replace(/ /g, '-'); // Replaces spaces with dashes

    return <PostContext.Provider value={{ replaceSpaces, currentPostTitle, setCurrentPostTitle, subSitesExist, setSubSitesExist, parentId, setParentId, currentPostId, setCurrentPostId}}>
        {children}
    </PostContext.Provider>
}
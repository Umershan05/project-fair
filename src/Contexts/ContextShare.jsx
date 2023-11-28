import React, { createContext, useState } from 'react'
export const addprojectResponceContext=createContext()
export const editProjectResponseContext=createContext()
function ContextShare({children}) {
    const [addProjectResponce,setAddProjectResponce]=useState({})
    const[editProjectResponse,setEditprojectResponse]=useState({})
  return (
    <>
    <addprojectResponceContext.Provider value={{addProjectResponce,setAddProjectResponce}}>
        <editProjectResponseContext.Provider value={{editProjectResponse,setEditprojectResponse}}>{children}</editProjectResponseContext.Provider>
        </addprojectResponceContext.Provider>
    </>
  )
}

export default ContextShare
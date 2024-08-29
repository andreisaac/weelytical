"use client"
import { createContext, useContext, useReducer,useEffect } from 'react';
import {createClient } from "@utils/supabase/client";
import { useUserContext } from './userContext';




const supabase = createClient();

// Create a context to hold the state
const ProjectsContext = createContext();

// Define the initial state
const initialState = null;

// Define the reducer function to handle state transitions
const reducer = (projects, action) => {
    if (action.type === 'setProjects') {
      return action.payload;
    } else if (action.type === 'clearProjects') {
      return null;
    } else {
      throw Error('Unknown action: ' + action.type);
    }
}


// Create a component that will provide the context
// IncrementProvider takes in an argument called children
const ProjectsProvider = ( {children} ) => {
  const [projects, dispatch] = useReducer(reducer, initialState);
  const {user} = useUserContext();

  useEffect(()=>{
    const asyncFunc = async() => {
      const projectsReq = await fetch(process.env.NEXT_PUBLIC_LOCAL_API_URL+'api/getProjects',{
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({userId: user?.id, projectId: false})
    });

    const {projects} = await projectsReq.json();

    if(projects) {
      dispatch({type: "setProjects", payload: projects})
    }
    };
    asyncFunc();
  },[user])

// In this return value, we passed-in children as the CONSUMER of the PROVIDER
// This will able children components to access the data inside the context
  return (
    <ProjectsContext.Provider value={{projects, dispatch }}>
      
        {children}
      
    </ProjectsContext.Provider>
  );
}

export default ProjectsProvider;

// Create a function that invokes the context 
export const useProjectsContext = () => {
  return useContext(ProjectsContext)
}
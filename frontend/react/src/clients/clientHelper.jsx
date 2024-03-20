// react
import { useLocation,Navigate } from "react-router-dom"





// JWT token helpers for authentification

export const setJwtToken = (jwtToken)=>{
    console.log("Saving jwtToken: " + jwtToken)
    localStorage.setItem('authToken', jwtToken)
    //broadcastAuthStateChange(true)
}
export const fetchJwtToken = ()=>{
    const jwtToken = localStorage.getItem('authToken')
    //console.log("Loading jwtToken: " + jwtToken)
    return jwtToken
}
export const clearJwtToken = ()=>{
    localStorage.removeItem('authToken')
    //broadcastAuthStateChange(false)
}

export function RequireJwtToken({children}){
    // this is not currently used but came with sample code for fetching and setting tokens
    let auth = fetchJwtToken()
    let location = useLocation()
    if(!auth){
        return <Navigate to='/' state ={{from : location}}/>;
    }
    return children;
}




// helper
export const isLoggedIn = ()=> {
    const jwtToken = fetchJwtToken()
    return jwtToken && true
}






// helpers for persistent messages to show when we renavigate to a new page
export const setApiResultMessage = (msg)=> {
    localStorage.setItem("ApiResultMessage", msg)
}
export const getApiResultMessage = ()=> {
    const persistentMessage = localStorage.getItem("ApiResultMessage")
    return persistentMessage
}
export const clearApiResultMessage = (msg)=> {
    localStorage.removeItem("ApiResultMessage")
}



// component helpers

export function onSubmitBlockDefaultReload(e) {
    // react forms cause a reload of the page, which loses our console log for test
    // this function is referenced in the submit field for React components that we build.
    e.preventDefault();
  };

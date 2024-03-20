// react
import { useNavigate } from "react-router";
import { useState } from "react";
import React from "react";

// user imports
import { fetchJwtToken, setJwtToken, clearJwtToken } from "../../clients/clientHelper";
import { FapiClient } from "../../clients/fapiClient";
import { JrForm, JrFormInput, JrFormButton, JrNavLink } from "../../components/jr/jrform"


 
const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


  const login = async () => {
    // call to back end
    const fapiClient = new FapiClient(setSuccess, setError)
      try {
        const response = await fapiClient.postFields("/auth/jwt/login", {username: username, password: password})
        if (response.data.access_token) {
          setJwtToken(response.data.access_token);
          fapiClient.setSuccess("Logged in successfully.", true)
          navigate("/auth/profile");
        }
      } catch (error) {
        fapiClient.setError(error.toString())
      }
  };


  const logout = async () => {
    clearJwtToken();
    const fapiClient = new FapiClient(setSuccess, setError)
    try {
      await fapiClient.postPayload("/auth/jwt/logout")
      fapiClient.setSuccess("Logged out successfully.", true)
      navigate("/auth/login");
    } catch (error) {
      // ATTN: TODO - Currently the back end throws an error (401) even on "successful" logout
      fapiClient.setError(error.toString())
    }
  };


  return (
    <>
    {fetchJwtToken() ? (
      <JrForm success={success} error={error} title="You Are Logged In">
        <JrFormButton onClick={logout} label="Log Out"/>
      </JrForm>
      ) : (
      <JrForm success={success} error={error} title="Log In to Your Account">
        <JrFormInput label="Username or Email" setFunc={setUsername}/>
        <JrFormInput label="Password" setFunc={setPassword}/>
        <JrFormButton onClick={login} label="Login"/>
        <JrNavLink label="Register Here" href="/auth/register">Need to create a new account?</JrNavLink>
      </JrForm>
      )
    }
    </>
  );


};
 
export default Login;

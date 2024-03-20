// reace
import { useNavigate } from "react-router";
import { React, useState } from "react";

// user imports
import { fetchJwtToken } from "../../clients/clientHelper";
import { FapiClient } from "../../clients/fapiClient";
import {JrForm, JrFormInput, JrFormButton, JrNavLink} from "../../components/jr/jrform"

 
const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


  const register = async () => {
    // call to back end
    const fapiClient = new FapiClient(setSuccess, setError)
    try {
      const response = await fapiClient.postPayload("/auth/register", {email: email, username: username, password: password})
      if (response.status === 201) {
        fapiClient.setSuccess("Registered successfully.", true)
        navigate("/auth/login");
      } else {
        throw new Error("Registration failed: " + JSON.stringify(response))
      }
    } catch (error) {
      fapiClient.setError(error.toString());
    }
  };





  return (
    <>
    {fetchJwtToken() ? (
      <JrForm success={success} error={error} title="You Are Logged In">
      </JrForm>
      ) : (
      <JrForm success={success} error={error} title="Register a New Account">
        <JrFormInput label="Username" setFunc={setUsername}/>
        <JrFormInput label="Email" setFunc={setEmail}/>
        <JrFormInput label="Password" setFunc={setPassword}/>
        <JrFormButton onClick={register} label="Sign Up"/>
        <JrNavLink label="Log In Here" href="/auth/login">Already have an account?</JrNavLink>
      </JrForm>
      )
    }
    </>
  );




};
 
export default Register;

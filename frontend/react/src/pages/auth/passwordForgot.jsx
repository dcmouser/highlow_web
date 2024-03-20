// react
import { useNavigate } from "react-router";
import { React, useState } from "react";

// user imports
import {FapiClient} from "../../clients/fapiClient";
import {JrForm, JrFormInput, JrFormButton} from "../../components/jr/jrform"

 
const PasswordForgot = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


  const passwordForgot = async () => {
    // call to back end
    const fapiClient = new FapiClient(setSuccess, setError)
    try {
      const response = await fapiClient.postPayload("/auth/forgot-password", {email: username})
      if (response.status === 202) {
        fapiClient.setSuccess("Password forgot generated.", true)
        navigate("/auth/passwordReset");
      } else {
        throw new Error("Password forgot error: " + JSON.stringify(response))
      }
    } catch (error) {
      fapiClient.setError(error.toString());
    }
  };



  return (
    <>
    <JrForm success={success} error={error} title="Forgot Password">
      <JrFormInput label="Username or Email" setFunc={setUsername}/>
      <JrFormButton onClick={passwordForgot}/>
    </JrForm>
    </>
  );

};
 

export default PasswordForgot;

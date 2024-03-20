// react
import { useNavigate } from "react-router";
import { React, useState } from "react";

// user imports
import { FapiClient } from "../../clients/fapiClient";
import { JrForm, JrFormInput, JrFormButton } from "../../components/jr/jrform"

 

const PasswordReset = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [resetToken, setResetToken] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


  const passwordReset = async () => {
    // call to back end
    const fapiClient = new FapiClient(setSuccess, setError)
    try {
      const response = await fapiClient.postPayload("/auth/reset-password", {password: password, token: resetToken})
      if (response.status === 200) {
        fapiClient.setSuccess("Password set complete.", true)
        navigate("/auth/login");
      } else {
        throw new Error("Password reset error: " + JSON.stringify(response))
      }
    } catch (error) {
      fapiClient.setError(error.toString());
    }
  };




  return (
    <>
    <JrForm success={success} error={error} title="Password Reset">
      <JrFormInput label="Verification Token" setFunc={setResetToken}/>
      <JrFormInput label="Password or Email" setFunc={setPassword}/>
      <JrFormButton onClick={passwordReset}/>
    </JrForm>
    </>
  );


};
 

export default PasswordReset;

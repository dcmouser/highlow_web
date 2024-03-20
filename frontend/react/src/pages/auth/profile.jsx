// react
import { React, useState, useEffect, useRef } from "react";

// user imports
import {FapiClient} from "../../clients/fapiClient";
import { JrForm,  JrFormButton } from "../../components/jr/jrform"

 
const Profile = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get profile immediately dont wait for user to press button
  // ranOnce is used to avoid dev builds from calling this twice
  // see https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode/61897567#61897567
  const ranOnce = useRef(false)
  useEffect( () => {
    async function doAsyncWork() {
      await getProfile()
    }
    if (!ranOnce.current) {
      ranOnce.current = true
      doAsyncWork();
    }
  },[])


  // check to see if the fields are not empty
  const getProfile = async () => {
      // call to back end
      const fapiClient = new FapiClient(setSuccess, setError)
      try {
        const response = await fapiClient.get("/users/me")
        //console.log(response.data, "response.data");
        fapiClient.setSuccess("Logged in User Info: " + JSON.stringify(response.data))
      } catch (error) {
        fapiClient.setError(error.toString());
      }
  };

  return (
    <JrForm success={success} error={error} title="Account Profile">
      <JrFormButton onClick={getProfile} label="Get Profile"/>
    </JrForm>
  );

};
 



export default Profile;

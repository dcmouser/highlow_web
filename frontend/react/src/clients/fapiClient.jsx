import axios from "axios";

import { fetchJwtToken } from "./clientHelper";

import { setApiResultMessage, clearApiResultMessage } from "./clientHelper";


export class FapiClient {
    constructor(setSuccess, setError) {

        // success and error clear
        this._setSuccess = setSuccess
        this._setError = setError
        if (setSuccess) {
            setSuccess("")
        }
        if (setError) {
            setError("")
        }
        //
        clearApiResultMessage()
        //
        this.setSuccess = (msg, flagNavigatingAway = false) => {
            this._setSuccess(msg)
            if (flagNavigatingAway) {
                // set message that will be shown on the new page we are jumping to
                setApiResultMessage(msg)
            }
        }
        this.setError = (msg, flagNavigatingAway = false) => {
            this._setError(msg)
            if (flagNavigatingAway) {
                // set message that will be shown on the new page we are jumping to
                setApiResultMessage("ERROR: " + msg)
            }
            console.log("Error: "+msg)
        }
        
        //
        this.axiosConfigPostFields = {
            headers: {
                "accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
        }
        this.axiosConfigPostPayload = {
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
        }
        this.axiosConfigGet = {
            headers: {
                "accept": "application/json",
                'Content-Type': 'application/json',
            }
        }
        this.baseUrl = "http://localhost:8000"
    }


    buildUrl(relativeUrl) {
        return this.baseUrl + relativeUrl
    }


    buildGetConfig(getParamsDict) {
        let axiosConfig = this.axiosConfigGet
        const jwtToken = fetchJwtToken()
        if (jwtToken) {
            // add authorization token
            axiosConfig.headers["Authorization"] = "Bearer " + jwtToken
        }
        // add get params
        if (getParamsDict) {
            axiosConfig.params = getParamsDict
        }
        return axiosConfig
    }
    buildPostFieldsConfig() {
        let axiosConfig = this.axiosConfigPostFields
        const jwtToken = fetchJwtToken()
        if (jwtToken) {
            // add authorization token
            axiosConfig.headers["Authorization"] = "Bearer " + jwtToken
        }
        return axiosConfig
    }
    buildPostPayloadConfig() {
        let axiosConfig = this.axiosConfigPostPayload
        const jwtToken = fetchJwtToken()
        if (jwtToken) {
            // add authorization token
            axiosConfig.headers["Authorization"] = "Bearer " + jwtToken
        }
        return axiosConfig
    }


    async postFields(relativeUrl, valuesDict={}) {
        // throws exception on error
        // clear any persistent message first
        clearApiResultMessage()
        //
        const urlFull = this.buildUrl(relativeUrl)
        const response = await axios.post(urlFull, valuesDict, this.buildPostFieldsConfig())
        // test delay:
        if (false) {
            await new Promise(r => setTimeout(r, 5000));
        }
        return response
    }

    async postPayload(relativeUrl, valuesDict={}) {
        // throws exception on error
        // clear any persistent message first
        clearApiResultMessage()
        //
        const urlFull = this.buildUrl(relativeUrl)
        const response = await axios.post(urlFull, valuesDict, this.buildPostPayloadConfig())
        // test delay:
        if (false) {
            await new Promise(r => setTimeout(r, 5000));
        }
        return response
    }

    async postJson(relativeUrl, valuesDict={}) {
        // throws exception on error
        // clear any persistent message first
        clearApiResultMessage()
        //
        const urlFull = this.buildUrl(relativeUrl)
        const response = await axios.post(urlFull, valuesDict, this.buildPostConfig())
        // test delay:
        if (false) {
            await new Promise(r => setTimeout(r, 5000));
        }
        return response
    }

    async get(relativeUrl, valuesDict={}) {
        // throws exception on error
        // clear any persistent message first
        clearApiResultMessage()
        //
        const urlFull = this.buildUrl(relativeUrl)
        const response = await axios.get(urlFull, this.buildGetConfig(valuesDict))
        return response
    }


};



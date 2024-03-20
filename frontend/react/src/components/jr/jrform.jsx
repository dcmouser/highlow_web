// my custom form elements for simple consistent form loook
// uses material tailwind

// react
import React from "react";

// material tailwind lib
import { Typography, Card, Alert, Button, Input,  } from "@material-tailwind/react";

// user imports
import { getApiResultMessage, onSubmitBlockDefaultReload } from "../../clients/clientHelper";
 


export const JrForm = (props) => {   
    const apiResultMessage = getApiResultMessage()
    return (
        <>
        <Card className="flex justify-center items-center" color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    {props.title}
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={onSubmitBlockDefaultReload}>
                    <div className="mb-1 flex flex-col gap-6">
                        {props.children}
                    </div>
                </form>
          <div className="max-w-lg">
            {props.error && (<Alert color="red"  className="break-all">{props.error}</Alert>)}
            {props.success && (<Alert color="green" className="break-all">{props.success}</Alert>)}
            {apiResultMessage && (<Alert color="amber" className="break-all">{apiResultMessage}</Alert>)}
          </div>
        </Card>
        </>
    );
};
 




export const JrFormInput = (props) => {   
    return (
        <>
        {props.label && (
            <Typography variant="h6" color="blue-gray" className="-mb-3">
            {props.label}
            </Typography>
        )}
        <Input
            size="lg"
            placeholder={props.placeholder}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e) => props.setFunc(e.target.value)}
        />
        </>
    );
};



export const JrFormButton = (props) => {   
    return (
        <Button className="mt-6" fullWidth onClick={props.onClick}>
            {props.label ? props.label : "Submit"}
        </Button>
    );
};



export const JrNavLink = (props) => {   
    return (
        <Typography color="gray" className="mt-4 text-center font-normal">
          {props.children} {" "}
          <a href="/auth/register" className="font-medium text-gray-900">
          {props.label}
          </a>
        </Typography>
    );
};

// reace
import React from "react";
 
// material tailwind lib
import { Typography, Card } from "@material-tailwind/react";



const About = () => {
    return (
        <>
        <Card className="flex justify-center items-center" color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
            High & Low Web Services - March 2024
          </Typography>
        </Card>
        </>
    );
};
 
export default About;
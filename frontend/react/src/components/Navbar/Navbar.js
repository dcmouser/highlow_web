import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/" activestyle="true"> Home </NavLink>
                    <NavLink to="/about" activestyle="true"> About </NavLink>
                    <NavLink to="/auth/login" activestyle="true"> Login </NavLink>
                    <NavLink to="/auth/register" activestyle="true"> Register </NavLink>
                    <NavLink to="/auth/profile" activestyle="true"> Profile </NavLink>
                    <NavLink to="/auth/passwordForgot" activestyle="true"> PasswordForgot </NavLink>
                    <NavLink to="/auth/passwordReset" activestyle="true"> PasswordReset </NavLink>
                </NavMenu>
            </Nav>
            <br/>
        </>
    );
};
 
export default Navbar;
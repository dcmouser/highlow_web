// css for app
import './App.css';

// react
import {React,useContext} from "react";

// routers
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

// routes
import Home from "./pages/home/index";
import About from "./pages/about/index";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Profile from "./pages/auth/profile";
import PasswordForgot from "./pages/auth/passwordForgot";
import PasswordReset from "./pages/auth/passwordReset";

// new navbar
import {NavbarSimple, JrNavLink} from "./components/jr/jrnavbar"

// logged in support
import {isLoggedIn} from "./clients/clientHelper"

// auth provider context
import {AuthProvider, AuthContext} from "./clients/authhelper"



function InnerApp() {
    // make innerApp re-render when authContext changes
    useContext(AuthContext)

    // we can load these directly
    const isloggedin = isLoggedIn();
    const notloggedin = !isloggedin;
    // OR we could get them from AuthContext

    return (
        <Router>
        <NavbarSimple label="HIGH & LOW">
            <JrNavLink to="/" activestyle="true"> Home </JrNavLink>
            <JrNavLink to="/about" activestyle="true"> About </JrNavLink>
            <JrNavLink to="/auth/login" activestyle="true" hidden={isloggedin}> Login </JrNavLink>
            <JrNavLink to="/auth/login" activestyle="true" hidden={notloggedin}> Logout </JrNavLink>
            <JrNavLink to="/auth/register" activestyle="true" hidden={isloggedin}> Register </JrNavLink>
            <JrNavLink to="/auth/profile" activestyle="true" hidden={notloggedin}> Profile </JrNavLink>
            <JrNavLink to="/auth/passwordForgot" activestyle="true" hidden={isloggedin}> PasswordForgot </JrNavLink>
            <JrNavLink to="/auth/passwordReset" activestyle="true" hidden="notactive"> PasswordReset </JrNavLink>
        </NavbarSimple>
        <br/>

          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/profile" element={<Profile />} />
              <Route path="/auth/passwordForgot" element={<PasswordForgot />} />
              <Route path="/auth/passwordReset" element={<PasswordReset />} />
          </Routes>

      </Router>
  );
}




// we need to test in order for the auth context to work
function App() {
    return (
      <AuthProvider>
        <InnerApp/>
    </AuthProvider>
  );
}






export default App;

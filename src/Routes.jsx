import SignInForm from "./Authentication/signInForm";
import SignUpForm from "./Authentication/signUpForm";
import Homepage from "./Homepage/Homepage";
import { NavigationBar } from "./Navigation/Navigation";
import { Route, Routes } from "react-router-dom";

import Welcome from "./welcome";
function Routing(){
    return(
    <div className="">
      <Routes>
        <Route path="/" element={<NavigationBar/>}>
          <Route index element={
                <Welcome/>
            }/>
          <Route path="/signup" element={<SignUpForm/>}/>
          <Route path="/homepage/*" element={<Homepage/>} />
          <Route path="/signin" element={<SignInForm/>}/>
        </Route>
    </Routes>
    </div>
    )
}
export default Routing;
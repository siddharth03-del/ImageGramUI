import SignInForm from "./Authentication/signInForm";
import SignUpForm from "./Authentication/signUpForm";
import Homepage from "./Homepage/Homepage";
import { NavigationBar } from "./Navigation/Navigation";
import { Route, Routes } from "react-router-dom";
import Welcome from "./welcome";
import ForgotPassword from "./Authentication/fogotpassword";
function Routing(){
    return(
    <div className="w-full h-full">
      <Routes>
          <Route path="/" element={
                <Welcome/>
            }/>
          <Route path="/signup" element={<SignUpForm/>}/>
          <Route path="/homepage" element={<NavigationBar/>}>
            <Route path="/homepage/*" element={<Homepage/>}/>
          </Route>
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/signin" element={<SignInForm/>}/>
     </Routes>
    </div>
    )
}
export default Routing;
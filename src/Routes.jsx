import Homepage from "./Homepage/Homepage";
import { NavigationBar } from "./Navigation/Navigation";
import { Route, Routes } from "react-router-dom";
import Welcome from "./welcome";
import ForgotPassword from "./Authentication/fogotpassword";
import LoginPage from "./Authentication/login";
import SignupPage from "./Authentication/signup";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute";
function Routing(){
    return(
    <div className="w-full h-full">
      <Routes>
          <Route path="/" element={
                <Welcome/>
            }/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/homepage" element={<NavigationBar/>}>
            <Route path="/homepage/*" element={<Homepage/>}/>
          </Route>
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/signin" element={<LoginPage/>}/>
     </Routes>
    </div>
    )
}
export default Routing;
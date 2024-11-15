import { Route, Routes } from "react-router-dom";
import SignInForm from "./Authentication/signInForm";
import SignUpForm from "./Authentication/signUpForm";
import { createContext } from "react";
import { useState } from "react";
import Homepage from "./Homepage/Homepage";
import { NavigationBar } from "./Navigation/Navigation";
export const MyContext = createContext(null);
function App(){
  return (
    <MyContext.Provider>
      <Routes>
        <Route path="/" element={<NavigationBar/>}>
          <Route index element={<SignInForm/>}/>
          <Route path="/signup" element={<SignUpForm/>}/>
          <Route path="/homepage/*" element={<Homepage/>} />
        </Route>
    </Routes>
    </MyContext.Provider>
  )
}
export default App;
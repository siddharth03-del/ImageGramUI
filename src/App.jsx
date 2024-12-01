import { useState } from "react";
import { MyContext } from "./context";
import Routing from "./Routes.jsx";
function App(){
  return (
          <MyContext.Provider>

          <Routing/>

          </MyContext.Provider>
  )
}
export default App;
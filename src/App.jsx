import { useState } from "react";
import { MyContext } from "./context";
import Routing from "./Routes.jsx";
import { SpeedInsights } from "@vercel/speed-insights/react";
function App(){
  return (
          <MyContext.Provider>
          <SpeedInsights/>
          <Routing/>

          </MyContext.Provider>
  )
}
export default App;
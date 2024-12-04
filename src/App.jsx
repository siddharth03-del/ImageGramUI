import { useState } from "react";
import { MyContext } from "./context";
import Routing from "./Routes.jsx";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorShow  from "./ErrorBoundary/ErrorBoundary.jsx";
function App(){
  return (
    <ErrorBoundary FallbackComponent={ErrorShow}>
      <MyContext.Provider>
        <SpeedInsights/>
        <Routing/>
      </MyContext.Provider>
    </ErrorBoundary>
  )
}
export default App;
import combineContext from "../utils/combinContext";
import { ForgotPasswordContextProvider } from "./fogotPasswordcontext";
import { LoginContextProvider } from "./LoginContext";
import { SignupContextProvider } from "./SignupContext";
export const AppContextProvider = combineContext(ForgotPasswordContextProvider, LoginContextProvider, SignupContextProvider);
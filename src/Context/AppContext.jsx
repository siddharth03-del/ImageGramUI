import combineContext from "../utils/combinContext";
import { ForgotPasswordContextProvider } from "./fogotPasswordcontext";
import { LoginContextProvider } from "./LoginContext";
import { SignupContextProvider } from "./SignupContext";
import { MessageContextProvider } from "./messageContext";
import { MyContext } from "../context";
export const AppContextProvider = combineContext(ForgotPasswordContextProvider, LoginContextProvider, SignupContextProvider, MessageContextProvider);
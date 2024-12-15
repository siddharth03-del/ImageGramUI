import axios from "axios";
import { localUrl, renderUrl } from "./storeUrl";
import { red } from "@mui/material/colors";
const axios_instance = axios.create({
    baseURL : renderUrl,
})
export default axios_instance;
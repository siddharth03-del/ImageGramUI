import axios from "axios";
import { localUrl, renderUrl } from "./storeUrl";
const axios_instance = axios.create({
    baseURL : renderUrl
})
export default axios_instance;
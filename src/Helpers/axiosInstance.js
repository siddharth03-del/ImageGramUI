import axios from "axios";
import { localUrl, renderUrl } from "./storeUrl";
const axios_instance = axios.create({
    baseURL : localUrl,
})
export default axios_instance;
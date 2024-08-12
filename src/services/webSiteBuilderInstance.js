import axios from "axios";


const webSiteBuilderInstance = axios.create({
  baseURL: process.env.REACT_APP_WEBSITE_BUILDER,
});


export default webSiteBuilderInstance;


const axios =require("axios")


axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

const api =axios

module.exports =api


const axios =require("axios")


axios.defaults.baseURL = "https://tembezi.co.ke";
axios.defaults.withCredentials = true;

const api =axios

module.exports =api


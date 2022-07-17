import axios from "axios";

export const urlBase = 'https://us-central1-labenu-apis.cloudfunctions.net/labeX/daniel-nascimento-hooks'

const instance = axios.create({
    urlBase:
      "https://us-central1-labenu-apis.cloudfunctions.net/labeX/daniel-nascimento-hooks",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  instance.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
  
    if (token) {
      req.headers["auth"] = token;
    }
  
    return req;
  });
  
  export default instance;


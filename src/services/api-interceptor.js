import axios from 'axios';
import AuthenticationService from './authentication';

const axiosApiInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    config.headers = { 
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    config.withCredentials = true;
    return config;
  },
  error => {
    Promise.reject(error)
});

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  if (error.response) {
    // Request made and server responded
    if (error.response.status === 401 && error.response.data.message == "Token has expired") {
      localStorage.removeItem('user');
      window.location.reload(false);
    }
    else{
      return {"data":error.response.data,"status":error.response.status};
    }
  } else if (error.request) {
    // The request was made but no response was received
    return {"data":{"message":"Internal Error"},"status":404}
  } else {
    console.log('Error', error.message);
  }
});

export default axiosApiInstance;
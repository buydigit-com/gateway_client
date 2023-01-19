import axios from 'axios';
import axiosApiInstance from './api-interceptor';

class AuthenticationService {

  signIn = async formData => {
    localStorage.removeItem('user');
    let response = await axiosApiInstance
      .post('account/signin',
        formData
      )
      .then(async function (response) {
        localStorage.setItem('user', JSON.stringify(response.data));
        const user = JSON.parse(localStorage.getItem('user'));
        return {"data":response.data,"status":response.status};
      })
      .catch(function (error) {
        return {"data":error.response.data,"status":error.response.status};
      });
    return response;
  };

  signUp = async formData => {
    localStorage.removeItem('user');
    let response = await axiosApiInstance
      .post('account/signup',
        formData
      )
      .then(async function (response) {
        localStorage.setItem('user', JSON.stringify(response.data));
        const user = JSON.parse(localStorage.getItem('user'));
        return {"data":response.data,"status":response.status};
      })
      .catch(function (error) {
        return {"data":error.response.data,"status":error.response.status};
      });
    return response;
  };

  refreshToken = async () => {
    let response = await axiosApiInstance
      .get('account/refresh-token'
      )
      .then(async function (response) {
        return {"data":response.data,"status":response.status};
      })
      .catch(function (error) {
        return {"data":error.response.data,"status":error.response.status};
      });
    return response;
  };

  logOut = async () => {
    let response = await axiosApiInstance
      .get('account/logout'
      )
      .then(async function (response) {
        return {"data":response.data,"status":response.status};
      })
      .catch(function (error) {
        return {"data":error.response.data,"status":error.response.status};
      });
    return response;
  };
}

export default new AuthenticationService();

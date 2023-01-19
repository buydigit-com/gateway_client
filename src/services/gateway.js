import axios from 'axios';
import axiosApiInstance from './api-interceptor';

class GatewayService {


  createShop = async formData => {
    let response = await axiosApiInstance
      .put('merchant/shop',
        formData
      )
      .then(async function (response) {
        return {"data":response.data,"status":response.status};
      })
      .catch(function (error) {
        return {"data":response.data,"status":response.status};
      });
    return response;
  };

  getNetworks = async coin_id => {
    let response = await axiosApiInstance
      .get('gateway/coins/' + coin_id + '/networks'
      )
      .then(async function (response) {
        return {"data":response.data,"status":response.status};
      })
      .catch(function (error) {
        return {"data":response.data,"status":response.status};
      });
    return response;
  };

  getCoins = async txn_hash => {
    let response = await axiosApiInstance
      .get('gateway/coins/' + txn_hash 
      )
      .then(async function (response) {
        return {"data":response.data,"status":response.status};
      })
      .catch(function (error) {
        return {"data":response.data,"status":response.status};
      });
    return response;
  };
}

export default new GatewayService();

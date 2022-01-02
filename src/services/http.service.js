import axios from 'axios';

import configFile from '../config.json';

const http = axios.create({
  baseURL: configFile.apiEndPoint,
});

const httpService = {
  get: http.get,
  post: http.post,
};

export default httpService;

import axios from "axios";
// import  NProgress from "nprogress";
import * as NProgress from "nprogress"
import 'nprogress/nprogress.css';
NProgress.configure({ easing: "ease", speed: 500, showSpinner: false });

const instance = axios.create({
  timeout: 10000
});

instance.interceptors.request.use(config => {
  NProgress.start();
  return config;
});

instance.interceptors.response.use(
  response => {
    NProgress.done();
    return response.data;
  },
  error => {
    NProgress.done();
    return Promise.reject(error);
  }
);

export default instance;

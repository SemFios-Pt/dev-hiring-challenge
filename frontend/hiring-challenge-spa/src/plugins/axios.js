"use strict";

import Vue from 'vue';
import axios from "axios";
import store from '../store/index'

// Full config:  https://github.com/axios/axios#request-config

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL || process.env.apiUrl || '';
axios.defaults.headers.common['Authorization'] = "Bearer " + process.env.VUE_APP_GITHUB_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || "",
    // githubApiUrl: process.env.githubApiUrl || ""
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function (config) {
        store.commit("start_loading", true);
        return config;
    },
    function (error) {
        store.commit("stop_loading", false);
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        store.commit("stop_loading", false);
        return response;
    },
    function (error) {
        store.commit("stop_loading", false);
        return Promise.reject(error);
    }
);

Plugin.install = function (Vue, options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        },
    });
};

Vue.use(Plugin)

export default Plugin;

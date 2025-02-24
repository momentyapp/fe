import axios from "axios";

import getMoments from "./moment/getMoments";
import getTrendingMoments from "./moment/getTrendingMoments";
import postMoment from "./moment/postMoment";
import reactMoment from "./moment/reactMoment";

import createTopic from "./topic/createTopic";
import getTrendingTopics from "./topic/getTrendingTopics";
import searchTopic from "./topic/searchTopic";
import generateTopics from "./topic/generateTopics";

import signup from "./user/signup";

export const axiosInstance = axios.create({
  baseURL:
    "https://solid-computing-machine-45v95qwrpqx3qx99-8081.app.github.dev/api/",
});

axiosInstance.defaults.validateStatus = () => true;

export default class API {
  private constructor() {}

  static moment = {
    getMoments,
    getTrendingMoments,
    postMoment,
    reactMoment,
  };

  static topic = {
    createTopic,
    getTrendingTopics,
    searchTopic,
    generateTopics,
  };

  static user = {
    signup,
  };
}

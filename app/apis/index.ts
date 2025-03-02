import axios from "axios";

import getMoments from "./moment/getMoments";
import getTrendingMoments from "./moment/getTrendingMoments";
import postMoment from "./moment/postMoment";
import reactMoment from "./moment/reactMoment";
import getMomentById from "./moment/getMomentById";
import getMomentByIds from "./moment/getMomentByIds";

import createTopic from "./topic/createTopic";
import getTrendingTopics from "./topic/getTrendingTopics";
import searchTopic from "./topic/searchTopic";
import generateTopics from "./topic/generateTopics";

import signup from "./user/signup";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_HOST}/api`,
});

axiosInstance.defaults.validateStatus = () => true;

export default class API {
  private constructor() {}

  static moment = {
    getMoments,
    getTrendingMoments,
    postMoment,
    reactMoment,
    getMomentById,
    getMomentByIds,
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

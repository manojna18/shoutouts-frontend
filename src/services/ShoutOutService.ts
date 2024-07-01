import axios from "axios";
import ShoutOut from "../models/ShoutOut";
import TopFive from "../models/TopFive";

const baseUrl: string =
  import.meta.env.VITE_API_BASE_URL || "BASE URL NOT FOUND";

export const getAllShoutOuts = (toNameParam?: string): Promise<ShoutOut[]> => {
  return axios
    .get(baseUrl, {
      params: {
        "to-name": toNameParam,
      },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export const deleteShoutOut = (id: string): Promise<void> => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export const getTopFive = (): Promise<TopFive[]> => {
  return axios
    .get(`${baseUrl}/top-five`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getMyShoutouts = (myName: string): Promise<ShoutOut[]> => {
  return axios
    .get(`${baseUrl}`, {
      params: {
        me: myName,
      },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

// export const getShoutOutsByName = (name: string): Promise<ShoutOut[]> => {
//   return axios
//     .get(`${baseUrl}/${name}`)
//     .then((res) => {
//       return res.data;
//     })
//     .catch((err) => console.log(err));
// };

export const addShoutOut = (shoutout: ShoutOut): Promise<ShoutOut> => {
  return axios
    .post(baseUrl, shoutout)
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

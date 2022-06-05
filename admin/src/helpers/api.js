import AsyncStorage from "@react-native-async-storage/async-storage";

// const url = "https://ice-testing.herokuapp.com";
const url = "http://localhost:5000";

const getApi = async (api) => {
  const res = await fetch(url + api, {
    headers: {
      Authorization: await AsyncStorage.getItem("token"),
    },
  });
  return await res.json();
};

const postApi = async (api, body) => {
  const res = await fetch(url + api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: await AsyncStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};

const putApi = async (api, body) => {
  const res = await fetch(url + api, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: await AsyncStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};

const deleteApi = async (api) => {
  const res = await fetch(url + api, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: await AsyncStorage.getItem("token"),
    },
  });
  return await res.json();
};

export { getApi, postApi, putApi, deleteApi };

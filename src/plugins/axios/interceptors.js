function setParams(config) {
    return config;
}

function returnData(response) {
    return response.data;
}

export default function (axios) {
    axios.interceptors.request.use(setParams);
    axios.interceptors.response.use(returnData);
}
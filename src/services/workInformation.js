import axios from "axios";

const baseUrl = "/api/data";

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const getDataOfTheMonth = async (month) => {
    const response = await axios.get(`${baseUrl}/${month}`);
    return response.data;
}

const add = async (newObject) => {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
};

const workInformationService = { getAll, add, getDataOfTheMonth };

export default workInformationService;
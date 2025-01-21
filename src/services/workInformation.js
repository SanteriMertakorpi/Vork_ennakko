import axios from "axios";

const baseUrl = "http://localhost:5000/api/data";

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const add = async (newObject) => {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
};

const workInformationService = { getAll, add };

export default workInformationService;
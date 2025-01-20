import axios from "axios";

const baseUrl = "http://localhost:5000/api/data";

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const workInformationService = { getAll };

export default workInformationService;
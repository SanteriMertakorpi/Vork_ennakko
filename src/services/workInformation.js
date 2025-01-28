import axios from "axios";

const baseUrl = "/api/data";

/**
 * 
 * @returns Kaikki työaikamerkinnät
 */
const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

/**
 * 
 * @param {String} month  Kuukausi, jonka työaikamerkinnät halutaan hakea
 * @returns Annetun kuukauden työaikamerkinnät
 */
const getDataOfTheMonth = async (month) => {
    const response = await axios.get(`${baseUrl}/${month}`);
    return response.data;
}

/**
 * 
 * @param {*} newObject Työpäivän tiedot
 * @returns 201 OK jos työpäivä lisättiin onnistuneesti
 */
const add = async (newObject) => {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
};

const workInformationService = { getAll, add, getDataOfTheMonth };

export default workInformationService;
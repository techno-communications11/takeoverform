import axios from "axios";

export const addTakeoverEntryServices = async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/addtakeoverentry`, { data });
        return response;
    } catch (error) {
        throw error;
    }
}


export const getAllTakeoverEntryServices = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios(`${import.meta.env.VITE_REACT_API_URL}/getAlltakeoverentry`);
        return response;
    } catch (error) {
        throw error;
    }
}
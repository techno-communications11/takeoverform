import axios from "axios";

export const addTakeoverEntryServices = async (data) => {
    try {
        const response = await axios.post('https://takeover-form-backend.vercel.app/takeover/addtakeoverentry', { data });
        return response;
    } catch (error) {
        throw error;
    }
}


export const getAllTakeoverEntryServices = async () => {
    try {
        const response = await axios('https://takeover-form-backend.vercel.app/takeover/getAlltakeoverentry');
        return response;
    } catch (error) {
        throw error;
    }
}
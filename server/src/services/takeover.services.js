import db from '../module/index.js';

const {takeover:Takeover}=db;


export const addTakeOverEntrySerives=async(paylaod)=>{
    try {
        const response = await Takeover({...paylaod});
        return response.save();
    } catch (error) {
        throw error;
    }
}

export const getAllTakeOverEntrySerives=async()=>{
    try {
        const response = await Takeover.find({}).exec();
        return response;
    } catch (error) {
        throw error;
    }
}
import { addTakeOverEntrySerives, getAllTakeOverEntrySerives } from "../services/takeover.services.js";

export const addtakeoverentryController = async (req, res) => {
    try {
        const { data } = req.body;
        const response = await addTakeOverEntrySerives(data)
        return res.status(200).json({ status: 200, sucess: true, message: "sucess", data: response });
    } catch (error) {
        console.log("ERROR", error.message)
        return res.status(500).json({ status: 500, sucess: false, message: "internal server error", error: error.message });
    }
}

export const getAlltakeoverentryController = async (req, res) => {
    try {
        const response = await getAllTakeOverEntrySerives()
        return res.status(200).json({ status: 200, sucess: true, message: "sucess", data: response });
    } catch (error) {
        console.log("ERROR", error.message)
        return res.status(500).json({ status: 500, sucess: false, message: "internal server error", error: error.message });
    }
}
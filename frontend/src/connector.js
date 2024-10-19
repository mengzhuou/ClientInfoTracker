import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const getRecords = async () => {
    try {
        const res = await axios.get(`${BACKEND_URL}/records`);
        return res.data;
    } catch (error) {
        console.error("Error fetching records:", error);
        throw error;
    }
};

const createRecord = async (data) => {


    try {
        const res = await axios.post(`${BACKEND_URL}/records`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    } catch (error) {
        console.error("Error creating record:", error);
        throw error;
    }
};


export {
    getRecords,
    createRecord,
};

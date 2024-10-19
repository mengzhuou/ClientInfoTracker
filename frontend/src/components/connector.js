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
    const { company, name, hobby, importantDate, note, additionalNote, family, birthday, reasonOfKnowing, email, position, phoneNumber} = data;

    // Frontend Validation
    if (!company || typeof company !== 'string') {
        throw new Error('Company is required and must be a string');
    }

    if (!name || typeof name !== 'string') {
        throw new Error('Name is required and must be a string');
    }

    if (!hobby || typeof hobby !== 'string') {
        throw new Error('Hobby is required and must be a string');
    }
    // No need to have other validation or testing for other variables since it is not mandatory

    // if (!birthday || isNaN(Date.parse(birthday))) {
    //     throw new Error('Valid date is required');
    // }

    // if (!importantDate || isNaN(Date.parse(importantDate))) {
    //     throw new Error('Valid important event date is required');
    // }

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

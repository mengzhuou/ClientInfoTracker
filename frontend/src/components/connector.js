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
    const { company, type, jobTitle, date, receivedInterview, websiteLink, comment, click } = data;

    // Frontend Validation
    if (!company || typeof company !== 'string') {
        throw new Error('Company is required and must be a string');
    }

    if (!type || typeof type !== 'string') {
        throw new Error('Type is required and must be a string');
    }

    if (!jobTitle || typeof jobTitle !== 'string') {
        throw new Error('Job title is required and must be a string');
    }

    if (!date || isNaN(Date.parse(date))) {
        throw new Error('Valid date is required');
    }

    if (receivedInterview == null || typeof receivedInterview !== 'boolean') {
        throw new Error('Received interview status is required and must be a boolean');
    }

    if (!websiteLink || typeof websiteLink !== 'string') {
        throw new Error('Website link is required and must be a string');
    }

    if (!comment || typeof comment !== 'string') {
        throw new Error('Comment is required and must be a string');
    }

    if (click == null || typeof click !== 'number') {
        throw new Error('Click count is required and must be a number');
    }

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

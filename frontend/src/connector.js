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

const updateRecord = async (recordId, data) => {
    console.log("Updating Record:", recordId, data);
    const { name, company, hobby } = data;

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

    try {
        // Sending a PUT request to the backend to update the record
        const res = await axios.put(`${BACKEND_URL}/records/${recordId}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return res.data; // Return the updated record data
    } catch (error) {
        console.error("Error updating record:", error);
        throw error;
    }
};

const updateDraft = async (draftId, data) => {
    console.log("Updating Draft:", draftId, data);
    const { name, company, hobby } = data;

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

    try {
        // Sending a PUT request to the backend to update the draft
        const res = await axios.put(`${BACKEND_URL}/records/${draftId}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return res.data; // Return the updated record data
    } catch (error) {
        console.error("Error updating draft:", error);
        throw error;
    }
};

const createRecord = async (data) => {
    const { name, company, hobby } = data;

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

const getDrafts = async () => {
    try {
        const res = await axios.get(`${BACKEND_URL}/records/drafts`);
        return res.data;
    } catch (error) {
        console.error('Error fetching drafts:', error);
        throw error;
    }
};

const deleteDraft = async (draftId) => {
    try {
        await axios.delete(`${BACKEND_URL}/records/${draftId}`);
    } catch (error) {
        console.error('Error deleting draft:', error);
        throw error;
    }
};

const deleteRecord = async (recordId) => {
    try {
        await axios.delete(`${BACKEND_URL}/records/${recordId}`);
    } catch (error) {
        console.error('Error deleting record:', error);
        throw error;
    }
};

const getAccessCodes = async () => {
    try {
        const res = await axios.get(`${BACKEND_URL}/accesscodes`);
        return res.data;
    } catch (error) {
        console.error("Error fetching records:", error);
        throw error; 
    }
};

export {
    getRecords,
    createRecord,
    getAccessCodes,
    getDrafts,
    deleteDraft,
    updateRecord,
    deleteRecord,
    updateDraft,
};

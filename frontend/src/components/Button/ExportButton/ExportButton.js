import '../NavButton/NavButton.css';
import React from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function ExportButton({ BACKEND_URL }) {
    async function exportToSpreadsheet() {
        try {
            // Fetch records from MongoDB
            const response = await axios.get(`${BACKEND_URL}/records`);
            const records = response.data;

            //Filter for desired data
            console.log("Fetched records:", records);
            const filteredRecords = records.map(record => ({
                Name: record.name,
                Company: record.company || "N/A",
                Hobby: record.hobby || "N/A",
                Family: record.family || "N/A",
                //"Important Event Date": record.importantDate && record.importantDate.$date ?
        //new Date(record.importantDate.$date).toLocaleDateString() : "N/A"

            }));
            

            // Create a new workbook and worksheet
            const worksheet = XLSX.utils.json_to_sheet(filteredRecords); 
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Records');

            // Generate the Excel file and trigger the download
            XLSX.writeFile(workbook, 'Filtered_Records.xlsx');
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    }

    return (
        <button onClick={exportToSpreadsheet} className="nav-button">
            Export
        </button>
    );
}

export default ExportButton;

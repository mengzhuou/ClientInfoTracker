import '../NavButton/NavButton.css';
import React from 'react';
import * as XLSX from 'xlsx';
import { getRecords } from '../../../connector.js';

function ExportButton() {
    async function exportToSpreadsheet() {
        try {
            const records = await getRecords();

            const filteredRecords = records.map(record => 
                Object.keys(record).reduce((acc, key) => {
                    if (key !== '__v' && key !== '_id') { 
                        acc[key] = record[key] || "N/A"; 
                    }
                    return acc;
                }, {})
            );

            const worksheet = XLSX.utils.json_to_sheet(filteredRecords); 
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Records');
            
            //Format the sheet to the length of the longest term in each column
            const allKeys = [...new Set(records.flatMap(record => Object.keys(record)))];
      
            const colWidths = Object.keys(filteredRecords[0] || {}).map(key => {
                const maxLength = Math.max(
                    key.length, // Header length
                    ...filteredRecords.map(record => record[key]?.toString().length || 0) // Data lengths
                );
                return { wch: maxLength + 2 }; // Add padding
            });
            worksheet['!cols'] = colWidths;
            

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

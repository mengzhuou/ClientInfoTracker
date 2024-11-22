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
                        if (key === 'importantDate' || key === 'birthday') {
                            const date = new Date(record[key]);
                            acc[key] = !isNaN(date) ? date.toISOString().split('T')[0] : "N/A"; // Format as yyyy-MM-DD
                        } else if (key === 'createdAt' || key === 'updatedAt') {
                            const date = new Date(record[key]);
                            acc[key] = !isNaN(date) 
                                ? date.toLocaleString('en-GB', { hour12: false }).replace(',', '') // Format as yyyy-MM-DD HH:MM:SS
                                : "N/A";
                        } else if (key === 'phoneNumber') {
                            const phone = record[key]?.toString(); // Convert to string
                            acc[key] = phone && /^\d{10}$/.test(phone)
                                ? `(${phone.slice(0, 3)})-${phone.slice(3, 6)}-${phone.slice(6)}`
                                : "N/A"; // Format as (xxx)-xxx-xxxx or "N/A" if invalid
                        } else {
                            acc[key] = record[key] || "N/A";
                        }
                    }
                    return acc;
                }, {})
            );

            const worksheet = XLSX.utils.json_to_sheet(filteredRecords); 
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Records');

            const headers = Object.keys(filteredRecords[0] || {});
            headers.forEach((header, index) => {
                const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index }); // Header cell address
                if (worksheet[cellAddress]) {
                    worksheet[cellAddress].v = header.charAt(0).toUpperCase() + header.slice(1); // Capitalize first letter of header
                }
            });

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

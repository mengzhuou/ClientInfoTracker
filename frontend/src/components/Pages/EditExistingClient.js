import './EditExistingClient.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { updateRecord, deleteRecord, deleteDraft, createRecord, updateDraft } from '../../connector';
import DeletePopup from '../Functions/PopupModals/DeletePopup/DeletePopup';

const EditExistingClient = () => {
    // allows me to push users back to the home page after submission
    const navigate = useNavigate();
    const location = useLocation(); // Retrieve passed state
    const [selectedRow, setSelectedRow] = useState({});

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);
    
    // All state variables in form
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [hobby, setHobby] = useState('');
    const [importantDate, setImportantDate] = useState('');
    const [note, setNote] = useState('');
    const [familySituation, setFamilySituation] = useState('');
    const [birthday, setBirthday] = useState('');
    const [reasonOfKnowing, setReasonOfKnowing] = useState('');
    const [position, setPosition] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [additionalNote, setAdditionalNote] = useState('');



    useEffect(() => {
        if (location.state?.selectedRow) {
            const normalizedRow = Array.isArray(location.state.selectedRow) ? location.state.selectedRow : [location.state.selectedRow];
    
            const row = normalizedRow[0]; // Access the first item in the array
    
            // Update the state variables with the row data
            setSelectedRow(row);
            setName(row.name || '');
            setCompany(row.company || '');
            setHobby(row.hobby || '');
            setImportantDate(row.importantDate ? new Date(row.importantDate) : '');
            setNote(row.note || '');
            setFamilySituation(row.familySituation || '');
            setBirthday(row.birthday ? new Date(row.birthday) : '');
            setReasonOfKnowing(row.reasonOfKnowing || '');
            setPosition(row.position || '');
            setPhoneNumber(row.phoneNumber || '');
            setEmail(row.email || '');
            setAdditionalNote(row.additionalNote || '');
        } else {
            console.error("No data found");
            navigate('/'); // Redirect to main page if no data is found
        }
    }, [location.state, navigate]);
    
    
    

    // Function to handle saving as a draft
    const handleSaveDraft = async (e) => {
        const normalizedRow = Array.isArray(location.state.selectedRow)
            ? location.state.selectedRow
            : [location.state.selectedRow];
    
        const row = normalizedRow[0]; // Access the first item in the array


        if (!(name === "" || hobby === "" || company === "")) {
            try {
                e.preventDefault();
                const draftDetails = {
                    name,
                    company,
                    hobby,
                    importantDate: importantDate ? importantDate.toISOString() : null,
                    note,
                    familySituation,
                    birthday: birthday ? birthday.toISOString() : null,
                    reasonOfKnowing,
                    position,
                    phoneNumber,
                    email,
                    additionalNote,
                    draftStatus: true // Setting draft status to true
                };
                if(row._id!=undefined){
                    await updateRecord(row._id,draftDetails);
                } else
                await createRecord(draftDetails);
                resetFields();
                navigate('/draft'); // Navigate to drafts page after saving
            } catch (error) {
                console.error('Error saving draft:', error);
            }
        }
    };

       // removes all fields
       const resetFields = () => {
        setName(''); setCompany(''); setHobby(''); setImportantDate('');
        setNote(''); setFamilySituation(''); setBirthday('');
        setReasonOfKnowing(''); setPosition(''); setPhoneNumber('');
        setEmail(''); setAdditionalNote('');
    };

       // upon submission, post data to backend, clear fields, send to home page
       const handleSubmit = async (e) => {
         const normalizedRow = Array.isArray(location.state.selectedRow) ? location.state.selectedRow : [location.state.selectedRow];
         const row = normalizedRow[0];

         const prevDraftStatus = row.draftStatus;

        if (!(name === "" || hobby === "" || company === "")) {
            try {
                e.preventDefault(); // prevents refreshing and losing data

                
                    const clientDetails = { name, company, hobby, importantDate: importantDate ? importantDate.toISOString(): null, note, familySituation, birthday: birthday ? birthday.toISOString(): null,
                        reasonOfKnowing, position, phoneNumber, email, additionalNote, draftStatus: false
                    }
                    if(!prevDraftStatus){
                        await updateRecord(row._id,clientDetails);
                    }
                    else if(prevDraftStatus === true){
                        await createRecord(clientDetails);
                        await deleteDraft(row._id);
                    }
                resetFields();
                navigate('/'); // redirects to home page
            } catch (error) {
                console.error('Error editing client: ', error);
            }
        }
    }

    const handleDelete = (state) => {
        // Set the record to delete and show the popup
        const normalizedRow = Array.isArray(state.selectedRow)
         ? state.selectedRow
         : [state.selectedRow];
         const row = normalizedRow[0];
        setRecordToDelete(row._id);
        setIsPopupOpen(true);
    }

    const confirmDelete = async () => {
        if (recordToDelete) {
            try {
                console.log(`Deleting record with ID: ${recordToDelete}`); // Debug log
                await deleteRecord(recordToDelete); // Call the delete API
                console.log("Record deleted successfully!");
                console.log("Navigating to '/'...");
                navigate('/'); // Navigate to the main page
            } catch (error) {
                console.error("Error deleting record:", error);
            }
        } else {
            console.warn("No record to delete.");
        }
        // Close the popup after deletion
        setIsPopupOpen(false);
        setRecordToDelete(null);
    };
    

    const cancelDelete = () => {
        // Close the popup without deleting
        setIsPopupOpen(false);
        setRecordToDelete(null);
    };

    const getUpdatedAt = () => {
        if (!location.state?.selectedRow) {
            return "No data available"; // Default text if no data
        }
    
        const normalizedRow = Array.isArray(location.state.selectedRow) ? location.state.selectedRow : [location.state.selectedRow];
        const row = normalizedRow[0];
        if(row.draftStatus){
            return row.createdAt ? new Date(row.createdAt).toLocaleString() : "No update time available";
        } else {
            return row.updatedAt ? new Date(row.updatedAt).toLocaleString() : "No update time available";
        }
    };
    
    return (
        <div className='edit-client-page-body'>
            <div className='edit-client-container'>
                <p className='title'>Edit Existing Client</p>
                <div className = 'last-update-time-container'>
                    <label className='updateLabel'>Last Updated Time:</label>
                    <label className='updatedAt'>
                        {getUpdatedAt()}
                    </label>
                </div>
                <form className='form-scrollable'>
                    <div className='form-row1'>
                        <div className='label-input-group'>
                            <label>Name</label>
                            <input
                                className='name'
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='label-input-group'>
                            <label>Company</label>
                            <input
                                className='company'
                                type="text"
                                required
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>
                        <div className='label-input-group'>
                            <label>Hobby</label>
                            <input
                                className='hobby'
                                type="text"
                                required
                                value={hobby}
                                onChange={(e) => setHobby(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='form-row2'>
                        <div className='label-input-group'>
                            <label>Important Date</label>
                            <DatePicker
                                className="date-important"
                                dateFormat="yyyy/MM/dd"
                                selected={importantDate}
                                type="text"
                                onChange={(date) => setImportantDate(date)}
                                placeholderText='YYYY/MM/DD'
                                portalId="root-portal" // keeps the calendar fixed
                            />

                        </div>
                        <div className='label-input-group'>
                            <label>Note</label>
                            <input
                                className='note'
                                type="text"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='form-row3'>
                        <div className='label-input-group'>
                            <label>Family Situation</label>
                            <input
                                className='family-situation'
                                type="text"
                                value={familySituation}
                                onChange={(e) => setFamilySituation(e.target.value)}
                            />
                        </div>
                        <div className='label-input-group'>
                            <label>Birthday</label>
                            <DatePicker
                                className='birthday'
                                selected={birthday}
                                dateFormat="yyyy/MM/dd"
                                onChange={(date) => setBirthday(date)}
                                placeholderText='YYYY/MM/DD'
                                portalId="root-portal"
                            />
                        </div>
                        <div className='label-input-group'>
                            <label>Reason of Knowing</label>
                            <input
                                className='reason-of-knowing'
                                type="text"
                                value={reasonOfKnowing}
                                onChange={(e) => setReasonOfKnowing(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='form-row4'>
                        <div className='label-input-group'>
                            <label>Position</label>
                            <input
                                className='position'
                                type="text"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                            />
                        </div>
                        <div className='label-input-group'>
                            <label>Phone Number</label>
                            <input
                                className='phone-number'
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className='label-input-group'>
                            <label>Email</label>
                            <input
                                className='email'
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='form-row5'>
                        <div className='label-input-group'>
                            <label>Additional Note</label>
                            <textarea
                                className='additional-note'
                                value={additionalNote}
                                onChange={(e) => setAdditionalNote(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='bottom-buttons'>
                        <button type="submit" onClick={handleSaveDraft} className='save-draft'>Save Draft</button>
                        <button type="submit" onClick={handleSubmit} className='edit-submit'>Submit</button>
                        <button type="button" onClick={()=>handleDelete(location.state)} className='delete'>Delete</button>
                    </div>

                    {isPopupOpen && (
                            <DeletePopup
                                onClose={cancelDelete} // Handle cancel
                                onConfirm={confirmDelete} // Handle confirm
                                message="Delete this record permanently?"
                            />
                        )}
                    
                </form>
            </div>
        </div>
    );
}
export default EditExistingClient;


import React, { useState } from 'react';
import './CreateClient.css';
import { withFuncProps } from "../withFuncProps";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { createRecord } from '../../connector';

const CreateClient = (props) => {
    // Initialize formData state from localStorage
    const savedData = JSON.parse(localStorage.getItem('createClientFormData')) || {};
    const [formData, setFormData] = useState({
        name: savedData.name || '',
        company: savedData.company || '',
        hobby: savedData.hobby || '',
        importantDate: savedData.importantDate || '',
        note: savedData.note || '',
        familySituation: savedData.familySituation || '',
        birthday: savedData.birthday || '',
        reasonOfKnowing: savedData.reasonOfKnowing || '',
        position: savedData.position || '',
        phoneNumber: savedData.phoneNumber || '',
        email: savedData.email || '',
        additionalNote: savedData.additionalNote || ''
    });

    // Handle input changes and update formData
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };
        setFormData(updatedData);
        // Save updated data to localStorage
        localStorage.setItem('createClientFormData', JSON.stringify(updatedData));
    };

    // Handle date picker changes
    const handleDateChange = (name, date) => {
        const updatedData = { ...formData, [name]: date };
        setFormData(updatedData);
        // Save updated data to localStorage
        localStorage.setItem('createClientFormData', JSON.stringify(updatedData));
    };

    const validateForm = () => {
        const requiredFields = ['name', 'company', 'hobby'];
        for (const field of requiredFields) {
            if (!formData[field].trim()) {
                alert(`Please fill out the <${field}> field.`);
                return false;
            }
        }

        const { phoneNumber } = formData; 
        if (phoneNumber.length !== 0) {
            const cleanedPhoneNumber = phoneNumber.replace(/[^0-9]/g, ''); 
            if (cleanedPhoneNumber.length !== 10) {
                alert('Phone number must be either empty or exactly in the format "999-999-9999".');
                return;
            }
        }
        return true;
    };

    const formatPhoneNumber = (number) => {
        if (!number) return ''; 
        const cleaned = number.replace(/\D/g, ''); 
        const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/); 
        if (!match) return number;
        return [match[1], match[2], match[3]]
            .filter(Boolean)
            .join('-');
    };

        // Function to handle saving as a draft
        const handleSaveDraft = async (e) => {
            e.preventDefault();
    
            if (!validateForm()) {
                return;
            }
    
            const cleanedPhoneNumber = formData.phoneNumber.replace(/[^0-9]/g, ''); 
    
            const draftDetails = {
                ...formData,
                importantDate: formData.importantDate ? formData.importantDate.toISOString() : null,
                birthday: formData.birthday ? formData.birthday.toISOString() : null,
                phoneNumber: cleanedPhoneNumber, 
                draftStatus: true
            };
            try {
                await createRecord(draftDetails);
                console.log('New draft created');
                resetFields();
                props.navigate('/draft');
            } catch (error) {
                console.error('Error saving draft:', error);
                alert('Failed to save draft. Data is saved locally.');
            }
        };
    
    // Submit client details
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const cleanedPhoneNumber = formData.phoneNumber.replace(/[^0-9]/g, ''); 

        const clientDetails = {
            ...formData,
            importantDate: formData.importantDate ? formData.importantDate.toISOString() : null,
            birthday: formData.birthday ? formData.birthday.toISOString() : null,
            phoneNumber: cleanedPhoneNumber, 
            draftStatus: false  
        };
        
        try {
            await createRecord(clientDetails);
            console.log('New client added');
            resetFields();
            props.navigate('/MainPage');
        } catch (error) {
            console.error('Error adding client:', error);
            alert('Failed to add client. Data is saved locally.');
        }
    };
    
    // Reset form fields
    const resetFields = () => {
        setFormData({
            name: '',
            company: '',
            hobby: '',
            importantDate: '',
            note: '',
            familySituation: '',
            birthday: '',
            reasonOfKnowing: '',
            position: '',
            phoneNumber: '',
            email: '',
            additionalNote: ''
        }); 
        localStorage.removeItem('createClientFormData');
    };
    

    return (
        <div className='create-client-page-body'>
            <div className='create-client-container'>
                <p className='title'>Create a New Client</p>
                <form className='form-scrollable'>
                    <div className='form-row1'>
                        <div className='label-input-group'>
                            <label>Name <span className='must-fill'>*</span></label>
                            <input
                                className='name'
                                type="text"
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='label-input-group'>
                            <label>Company <span className='must-fill'>*</span></label>
                            <input
                                className='company'
                                type="text"
                                required
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='label-input-group'>
                            <label>Hobby <span className='must-fill'>*</span></label>
                            <input
                                className='hobby'
                                type="text"
                                required
                                name="hobby"
                                value={formData.hobby}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='form-row2'>
                        <div className='label-input-group'>
                            <label>Important Date</label>
                            <DatePicker
                                className="date-important"
                                dateFormat="yyyy/MM/dd"
                                selected={formData.importantDate}
                                onChange={(date) => handleDateChange('importantDate', date)}
                                placeholderText='YYYY/MM/DD'
                                portalId="root-portal"
                            />

                        </div>
                        <div className='label-input-group'>
                            <label>Note</label>
                            <textarea
                                className='note'
                                type="text"
                                name="note"
                                value={formData.note}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='form-row3'>
                        <div className='label-input-group'>
                            <label>Family Situation</label>
                            <input
                                className='family-situation'
                                type="text"
                                name="familySituation"
                                value={formData.familySituation}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='label-input-group'>
                            <label>Birthday</label>
                            <DatePicker
                                className='birthday'
                                selected={formData.birthday}
                                dateFormat="yyyy/MM/dd"
                                onChange={(date) => handleDateChange('birthday', date)}
                                placeholderText='YYYY/MM/DD'
                                portalId="root-portal"
                                maxDate={new Date()}
                            />
                        </div>
                        <div className='label-input-group'>
                            <label>Reason of Knowing</label>
                            <input
                                className='reason-of-knowing'
                                type="text"
                                name="reasonOfKnowing"
                                value={formData.reasonOfKnowing}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className='form-row4'>
                        <div className='label-input-group'>
                            <label>Position</label>
                            <input
                                className='position'
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='label-input-group'>
                            <label>Phone Number</label>
                            <input
                                className='phone-number'
                                name="phoneNumber"
                                placeholder="(999)-999-9999"
                                value={formatPhoneNumber(formData.phoneNumber)}
                                onChange={(e) => {
                                    const formattedValue = e.target.value.replace(/[^0-9()-]/g, '');
                                    // Limit to 12 characters
                                    if (formattedValue.length <= 12) {
                                        setFormData({ ...formData, phoneNumber: formattedValue });
                                        localStorage.setItem(
                                            'createClientFormData',
                                            JSON.stringify({ ...formData, phoneNumber: formattedValue })
                                        );
                                    }
                                }}
                            />
                        </div>

                        <div className='label-input-group'>
                            <label>Email</label>
                            <input
                                className='email'
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className='form-row5'>
                        <div className='label-input-group'>
                            <label>Additional Note</label>
                            <textarea
                                className='additional-note'
                                type="text"
                                name="additionalNote"
                                value={formData.additionalNote}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='bottom-buttons'>
                        <button type="submit" onClick={handleSaveDraft} className='save-draft'>Save Draft</button>
                        <button type="submit" onClick={handleSubmit} className='submit'>Submit</button>
                        {/* <button type="button" onClick={resetFields} className='clear'>Clear</button> */}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default withFuncProps(CreateClient);

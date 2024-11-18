import React, { useState } from 'react';
import './CreateClient.css';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { createRecord } from '../../connector';

const CreateClient = () => {
    // allows me to push users back to the home page after submission
    const navigate = useNavigate();

    // all state variables in form
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
    const [additionalNote, setAdditionalNode] = useState('');

    // Function to handle saving as a draft
    const handleSaveDraft = async (e) => {
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
                await createRecord(draftDetails);
                resetFields();
                navigate('/draft'); // Navigate to drafts page after saving
            } catch (error) {
                console.error('Error saving draft:', error);
            }
        }
    };

    // upon submission, post data to backend, clear fields, send to home page
    const handleSubmit = async (e) => {
        if (!(name === "" || hobby === "" || company === "")) {
            try {
                e.preventDefault(); // prevents refreshing and losing data

                const clientDetails = { name, company, hobby, importantDate: importantDate ? importantDate.toISOString(): null, note, familySituation, birthday: birthday ? birthday.toISOString(): null,
                    reasonOfKnowing, position, phoneNumber, email, additionalNote, draftStatus: false
                }
                await createRecord(clientDetails);
                resetFields();
                navigate('/MainPage'); // redirects to home page
            } catch (error) {
                console.error('Error adding client: ', error);
            }
        }
    }

    // removes all fields
    const resetFields = () => {
        setName(''); setCompany(''); setHobby(''); setImportantDate('');
        setNote(''); setFamilySituation(''); setBirthday('');
        setReasonOfKnowing(''); setPosition(''); setPhoneNumber('');
        setEmail(''); setAdditionalNode('');
    };

    return (
        <div className='create-client-page-body'>
            <div className='create-client-container'>
                <p className='title'>Create a New Client</p>
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
                                onChange={(e) => setAdditionalNode(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='bottom-buttons'>
                        <button type="submit" onClick={handleSaveDraft} className='save-draft'>Save Draft</button>
                        <button type="submit" onClick={handleSubmit} className='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateClient;

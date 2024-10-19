import React, { useState, useEffect } from 'react';
import './CreateClient.css';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

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

    // upon submission, post data to backend, clear fields, send to home page
    const handleSubmit = async (e) => {
        if (!(name === "" || hobby === "" || company === "")) {
            try {
                e.preventDefault(); // prevents refreshing and losing data

                const clientDetails = { name, company, hobby, importantDate: importantDate ? importantDate.toISOString(): null, note, familySituation, birthday: birthday ? birthday.toISOString(): null,
                    reasonOfKnowing, position, phoneNumber, email, additionalNote
                }
                console.log(clientDetails);

                const response = await fetch('http://localhost:3500/records', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(clientDetails)
                })

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Something went wrong');
                }

                console.log('new client added');
                navigate('/'); // redirects to home page

                // removes all fields
                setName('');
                setCompany('');
                setHobby('');
                setImportantDate('');
                setNote('');
                setFamilySituation('');
                setBirthday('');
                setReasonOfKnowing('');
                setPosition('');
                setPhoneNumber('');
                setEmail('');
                setAdditionalNode('');

            } catch (error) {
                console.error('Error adding client: ', error);
            }
        }
    }

    // HTML
    return (
        <div className='create-client-container'>
            <div className='title'>
                <h1>Create a New Client</h1>
            </div>
            <form>
                <div className='form-row1'>
                    <input
                    className='name'
                    type="text"
                    required
                    placeholder='Name'
                    value = {name}
                    onChange={(e) => setName(e.target.value)}
                    />
                    <input
                    className='company'
                    type="text"
                    required
                    placeholder='Company'
                    value = {company}
                    onChange={(e) => setCompany(e.target.value)}
                    />
                    <input
                    className='hobby'
                    type="text"
                    required
                    placeholder='Hobby'
                    value= {hobby}
                    onChange={(e) => setHobby(e.target.value)}
                    />
                </div>
                <div className='form-row2'>
                    <DatePicker
                    className="date-important"
                    dateFormat="yyyy/MM/dd"
                    selected={importantDate}
                    type="text"
                    placeholderText="Important Date: YYYY/MM/DD"
                    onChange={(date) => setImportantDate(date)}
                    portalId="root-portal" // keeps the calendar fixed
                    />
                    <input
                    className='note'
                    type="text"
                    placeholder='Note'
                    value = {note}
                    onChange={(e) => setNote(e.target.value)}
                    />
                </div>
                <div className='form-row3'>
                    <input
                    className='family-situation'
                    type="text"
                    placeholder='Family Situation'
                    value = {familySituation}
                    onChange = {(e) => setFamilySituation(e.target.value)}
                    />
                    <DatePicker
                    className='birthday'
                    selected = {birthday}
                    dateFormat="yyyy/MM/dd"
                    type="text"
                    placeholderText='Birthday: YYYY/MM/DD'
                    onChange={(date) => setBirthday(date)}
                    portalId="root-portal"
                    />
                    <input
                    className="reason-of-knowing"
                    type="text"
                    placeholder='Reason of Knowing'
                    value = {reasonOfKnowing}
                    onChange={(e) => setReasonOfKnowing(e.target.value)}
                    />
                </div>
                <div className='form-row4'>
                    <input
                    className='position'
                    type="text"
                    placeholder='Position'
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    />
                    <input
                    className='phone-number'
                    type="text"
                    placeholder='Phone Number'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <input
                    className='email'
                    type="text"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-row5'>
                    <textarea
                        className='additional-note'
                        placeholder='Additional Note'
                        value={additionalNote}
                        onChange={(e) => setAdditionalNode(e.target.value)}
                    />
                </div>
                <div className='bottom-buttons'>
                <button className='save-draft'>Save Draft</button>
                <button type="submit" onClick={handleSubmit} className='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default CreateClient;

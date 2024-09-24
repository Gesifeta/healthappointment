
import React, { useEffect, useState } from 'react'
import './ReviewForm.css'
import { API_URL } from '../../config';
import FeedBack from './FeedBack';

function ReviewForm() {
    const [doctors, setDoctors] = useState([]);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    //fetch doctors
    useEffect(() => {
        const fetchDoctors = async () => {
            const res = await fetch(`${API_URL}/search`);
            const data = await res.json();
            setDoctors(data);
        };
        fetchDoctors();
    }, []);
    return (
        <div className='review-form'>
            <h1>Review Doctors</h1>
            {/* display doctors on table */}
            <table>
                <tr>
                    <th>S.NO</th>
                    <th>Name</th>
                    <th>Specialty</th>
                    <th>Feedback</th>
                    <th>Review given</th>
                </tr>
                {doctors.map((doctor, index) => (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{doctor.name}</td>
                        <td>{doctor.specialty}</td>
                        <td><button className='btn-primary' onClick={()=>setShowFeedbackForm(!showFeedbackForm)}>Review</button></td>
                        <td></td>
                    </tr>))}
            </table>

            {/* feedback form */}
            {showFeedbackForm && (
                <div className="app__overlay">
                <div className="app__modal">
             
               <FeedBack/>
                </div>
                </div>
            )}
        </div>

    )
}

export default ReviewForm

import React, { useEffect, useState } from 'react'
import './ReviewForm.css'
import { API_URL } from '../../config';
import FeedBack from './FeedBack';

function ReviewForm() {
    const [doctors, setDoctors] = useState([]);
    const [doctorId, setDoctorId] = useState('');
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const email = sessionStorage.getItem("email")
    console.log(email);
    useEffect(() => {
        //fetch reviews
        const fetchReviews = async () => {

            const res = await fetch(`${API_URL}/review/${email}`);
            const data = await res.json();

            if (data.length > 0) localStorage.setItem('review', JSON.stringify(...data));

        };
        fetchReviews();
    }, []);

    const review = JSON.parse(localStorage.getItem('review'));

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
                <tbody>
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
                            <td><button className='btn-primary' onClick={() => {
                                setShowFeedbackForm(!showFeedbackForm)
                                setDoctorId(doctor._id)
                            }}
                                style={{ backgroundColor: review?.doctorId === doctor._id ? "gray" : "blue" }}
                                disabled={review?.doctorId === doctor._id}
                            >Review</button></td>
                            <td>{review?.doctorId === doctor._id && review?.feedback}</td>
                        </tr>))}
                </tbody>
            </table>

            {/* feedback form */}
            {showFeedbackForm && (
                <div className="app__overlay">
                    <div className="app__modal">
                        <FeedBack doctorId={doctorId} email={email} />
                    </div>
                </div>
            )}
        </div>

    )
}

export default ReviewForm
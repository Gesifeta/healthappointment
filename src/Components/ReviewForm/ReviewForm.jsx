
import React, { useEffect, useState } from 'react'
import './ReviewForm.css'
import { API_URL } from '../../config';

function ReviewForm() {
    const [doctors, setDoctors] = useState([]);
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
                        <td><button className='btn-primary'>Review</button></td>
                        <td></td>
                    </tr>))}
            </table>
        </div>

    )
}

export default ReviewForm
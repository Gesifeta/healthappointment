import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'


import './ReportsLayout.css'
import { API_URL } from '../../config';
import Report from './Reports.jsx';


function ReportForm() {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [showReport,setShowReport]=useState(false)
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
            const res = await fetch(`${API_URL}/user/search`);
            const data = await res.json();
            setDoctors(data);
        };
        fetchDoctors();
    }, []);
    return !showReport? (
        <div className='report-form'>
            <h1>Reports</h1>
            {/* display doctors on table */}
            <table>
                <tbody>
                    <tr>
                        <th>S.NO</th>
                        <th>Doctor Name</th>
                        <th>Doctor Specialty</th>
                        <th>View Report</th>
                        <th>Download Report</th>
                    </tr>
                    {doctors.map((doctor, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{doctor.name}</td>
                            <td>{doctor.specialty}</td>
                            <td><button className='btn-primary' onClick={() => setShowReport(true)}
                            > View Report</button></td>

                            <td><button className='btn-primary'
                            ><a href="reports.pdf" target="_blank" rel="noopener noreferrer" download> View Report</a></button></td>
                        </tr>))}
                </tbody>
            </table>
        </div>

    ):<Report doctorId={doctorId} showReport={showReport} setShowReport={setShowReport} />
}

export default ReportForm
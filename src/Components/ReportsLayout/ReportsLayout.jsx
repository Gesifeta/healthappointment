import  { useEffect, useState } from 'react'


import './ReportsLayout.css'
import { API_URL } from '../../config';
import Report from './Reports.jsx';
import Loading from '../Loading.jsx';


function ReportForm() {
    const [isLoading, setIsLoading] = useState(true)
    const [doctors, setDoctors] = useState([]);
    const [showReport, setShowReport] = useState(false)
    const [doctorId, setDoctorId] = useState('');
    const email = sessionStorage.getItem("email")
    useEffect(() => {
        //fetch reviews
        const fetchReviews = async () => {

            const res = await fetch(`${API_URL}/review/${email}`);
            const data = await res.json();
            if (data.length > 0) {
                localStorage.setItem('review', JSON.stringify(...data))
                setIsLoading(false)
            }
        };
        fetchReviews();
    }, []);

    //fetch doctors
    useEffect(() => {
        const fetchDoctors = async () => {
            const res = await fetch(`${API_URL}/user/search`);
            const data = await res.json();
            setIsLoading(false)
            setDoctors(data);
        };
        fetchDoctors();
    }, []);
    return isLoading ? <Loading /> : doctors.length > 0 ? (!showReport ? (
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
    ) : <Report doctorId={doctorId} showReport={showReport} setShowReport={setShowReport} />) : null
}
export default ReportForm
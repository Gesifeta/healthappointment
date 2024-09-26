import { useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'


// css
import './BookingConsultation.css'
function BookingConsultation() {
    const navigate = useNavigate()
    const [email, setAuthToken] = useState(sessionStorage.getItem("email"))
    console.log(email)
    return (
        <section className='booking-consultation-container'>
            <h1>Best Services</h1>
            <h4>Love yourself enough to live a health lifestyle</h4>
            <div className="booking-consultation">
                <div className="booking-consultation-card" onClick={() => {
                    if (email) { navigate("/home/search/instant", { replace: true }) } else
                        navigate("/home/login", { replace: true })
                }}>
                    <img src="https://img.freepik.com/free-vector/man-doctor-woman-nurse-stand-with-patient-card-medical-staff-uniform-study-discuss-examination-result-make-note-therapist-giving-treatment-recommendation-prescription-putting-signature_575670-1316.jpg?ga=GA1.1.110653321.1726910164&semt=ais_hybrid" alt="instant consultaion" />
                    <h3>Instant Consultation</h3>
                </div>
                <div className="booking-consultation-card" onClick={() => {
                    if (email) { navigate("/home/search/regular", { replace: true }) } else
                        navigate("/home/login", { replace: true })
                }}>
                    <img src="https://img.freepik.com/free-vector/man-doctor-with-medical-services-icons_24877-51669.jpg?ga=GA1.1.110653321.1726910164&semt=ais_hybrid" alt="instant booking" />
                    <h3>Book an Appointment</h3>
                </div>
                <div className="booking-consultation-card">
                    <img src="https://img.freepik.com/premium-vector/professional-doctors-team-medical-group-portrait-hospital-work_1322553-59681.jpg?ga=GA1.1.110653321.1726910164&semt=ais_hybrid" alt="self check up" />
                    <h3>Self Checkup</h3>
                </div>
                <div className="booking-consultation-card">
                    <img src="https://img.freepik.com/free-vector/cartoon-healthcare-professionals_52683-60383.jpg?ga=GA1.1.110653321.1726910164&semt=ais_hybrid" alt="health tips" />
                    <h3>Health Tips and Guidance</h3>
                </div>
            </div>

        </section>
    )
}

export default BookingConsultation
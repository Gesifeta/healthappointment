import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "./DoctorCard.css"
import AppointmentForm from '../AppointmentForm/AppointmentForm'

const DoctorCard = ({ doctor, booking, bookingType }) => {
    //state to show appointment form
    const [showAppointemntForm, setShowAppointmentForm] = useState(false)
    const [cancelBooking, setCancelBooking] = useState(false)
    return (
        <>
            <div className="doctor-card">
                <img src={doctor.image} alt={doctor.name} />
                <h2>{doctor.name}</h2>
                <h4>{doctor.specialty}</h4>
                <p>{doctor.experience} of experiences.</p>
                <div className="btn-group">
                    <button className=" btn-primary" style={{ backgroundColor: doctor._id === booking?.doctorId ? "red" : "#2190FF" }}
                        onClick={(e) => {
                            if (e.target.style.backgroundColor === "red") {
                                setCancelBooking(true);
                            }
                            window.scrollTo(0, 0)
                            setShowAppointmentForm(!showAppointemntForm)

                        }}
                    >{doctor._id === booking?.doctorId ? "Cancel appointment" : "Book Appointment Free"}</button>
                </div>
            </div>
            {showAppointemntForm ?
                <AppointmentForm doctor={doctor} cancelBooking={cancelBooking} bookingType={bookingType} />
                : null}
        </>
    )
}

export default DoctorCard
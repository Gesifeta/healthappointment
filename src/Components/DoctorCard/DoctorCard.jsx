import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "./DoctorCard.css"
import AppointmentForm from '../AppointmentForm/AppointmentForm'

const DoctorCard = ({ doctor }) => {
    //state to show appointment form
    const [showAppointemntForm, setShowAppointmentForm] = useState(false)
    const [cancelBooking, setCancelBooking] = useState(false)

    const navigate = useNavigate()
    //get isBooked from local session storage
    const localDoctor = localStorage.getItem("doctor") !== "undefined" ? JSON.parse(localStorage.getItem("doctor")) : localStorage.clear();
    //get user authoriziation token from session storage
    const userToken = sessionStorage.getItem("token")
    //get email from local session storage
    const localBooking = localStorage.getItem("booking") !== "undefined" ? JSON.parse(localStorage.getItem("booking")) : localStorage.clear()
    return (
        <>
            <div className="doctor-card">
                <img src={doctor.image} alt={doctor.name} />
                <h2>{doctor.name}</h2>
                <h4>{doctor.specialty}</h4>
                <p>{doctor.experience} of experiences.</p>
                <div className="btn-group">
                    <button className=" btn-primary" style={{ backgroundColor: doctor._id === localBooking?.doctorId ? "red" : "#2190FF" }}
                        onClick={(e) => {
                            if (e.target.style.backgroundColor === "red") {

                                setCancelBooking(true);

                            }
                            setShowAppointmentForm(!showAppointemntForm)
                        }}
                    >{doctor._id == localBooking?.doctorId ? "Cancel appointment" : "Book Appointment Free"}</button>
                </div>
            </div>
            {showAppointemntForm ?
                <AppointmentForm doctor={doctor} cancelBooking={cancelBooking} />
                : null}
        </>
    )
}

export default DoctorCard
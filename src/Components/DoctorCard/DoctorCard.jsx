import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "./DoctorCard.css"
import AppointmentForm from '../AppointmentForm/AppointmentForm'

const DoctorCard = ({ doctor }) => {
    //state to show appointment form
    const [showAppointemntForm, setShowAppointmentForm] = useState(false)
    useEffect(() => {
        const overlay = document.querySelector(".app__overlay")
    }, []);
    const navigate = useNavigate()
    //get isBooked from local session storage
    const localDoctor = localStorage.getItem("doctor") !== null ? JSON.parse(localStorage.getItem("doctor")) : localStorage.clear();
    //get email from local session storage
    const localBooking = localStorage.getItem("booking") !== null ? JSON.parse(localStorage.getItem("booking")) : localStorage.clear()
    //delete booking
    const deleteBooking = () => {
        localStorage.removeItem("booking")
        localStorage.removeItem("doctor")
    }
    return (
        <>
            <div className="doctor-card">
                <img src={doctor.image} alt={doctor.name} />
                <h2>{doctor.name}</h2>
                <h4>{doctor.specialty}</h4>
                <p>{doctor.experience} of experiences.</p>
                <div className="btn-group">
                    <button className=" btn-primary" style={{ backgroundColor: doctor._id === localBooking?.doctorId ? "red" : "#2190FF" }}
                        onClick={() => {
                            deleteBooking(localBooking?.doctorId)
                            setShowAppointmentForm(!showAppointemntForm)
                            window.location.reload()
                        }}
                    >{doctor._id == localBooking?.doctorId ? "Cancel appointment" : "Book Appointment Free"}</button>
                </div>
            </div>
            {showAppointemntForm ? (<div className="app__overlay" onClick={(event) => {
                event.stopPropagation()
                if (event.target.className === "app__overlay")
                    event.target.style.display = "none"
            }}>
                <div className="app__modal">
                    <AppointmentForm email={doctor.email} />
                </div>

            </div>) : null}
        </>
    )
}

export default DoctorCard
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import "./DoctorCard.css"

const DoctorCard = ({ doctor }) => {
    const navigate = useNavigate()
    const [isBooked, setIsBooked] = useState(false)
    return (
        <div className="doctor-card">
            <img src={doctor.image} alt={doctor.name} />
            <h2>{doctor.name}</h2>
            <h4>{doctor.specialty}</h4>
            <p>{doctor.experience} of experiences.</p>
            <div className="btn-group">
                <button className=" btn-primary"
                    onClick={() => {
                        navigate(`/appointment/${doctor.email}`, { replace: true })
                        setIsBooked(!isBooked)
                    }}
                >{isBooked ? "Booked" : "Book Appointment Free"}</button>
            </div>
        </div>
    )
}

export default DoctorCard
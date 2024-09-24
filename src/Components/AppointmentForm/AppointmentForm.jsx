import { useState } from 'react'
import { useEffect } from "react"
import { useParams } from "react-router-dom"


import "./AppointmentForm.css"
import { API_URL } from "../../config"

function AppointmentForm({ email }) {
    const { bookingType } = useParams()
    const [result, setResult] = useState(null)
    const [doctor, setDoctor] = useState(null)
    const userEmail = sessionStorage.getItem("email")
    console.log(userEmail)

    const [booking, setBooking] = useState({
        firstName: "",
        phone: "",
        appointmentDate: "",
        timeSlot: "",
        email: userEmail,
        bookingType: bookingType,
        doctorId: doctor?._id,
    })

    // state to store the doctor details
    useEffect(() => {
        // http fetch doctor details from the name
        fetch(`${API_URL}/appointment/${email}`, {
            method: "GET"
        })
            .then(res => res.json()).then(([data]) => {
                setDoctor(data)

            }).catch(err => (err))
    }, [email])
    //post new booking
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBooking((prev) => ({
            ...prev,
            bookingType: bookingType,
            doctorId: doctor?._id,
            email: userEmail,
            // update the state with the new value
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${API_URL}/booking/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(booking)
        }).then(res => res.json()).then(([data]) => setResult(data)).then(() => {
            localStorage.setItem("booking", JSON.stringify(result))
            sessionStorage.setItem("isBooked", "true")
            sessionStorage.setItem("bookingId", JSON.stringify(result.doctorId))
        }).catch(err => (err))
    }
    return (

        <div className="appointment-grid">
            <img src={doctor?.image} alt="" />
            <div className="appointment-text">
                <h2>{doctor?.name}</h2>
                <h3>{doctor?.specialty}</h3>
                <h3>{doctor?.experience} years of experence</h3>
                <p>Rating: ⭐⭐⭐⭐⭐</p>
            </div>
            <div >
                <form method="POST" className="appointment-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">Name</label>
                        <input type="text" name="firstName" id="firstName" className="form-control"
                            placeholder="Enter your name" aria-describedby="helpId"
                            onChange={handleChange}
                        />
                    </div>
                    {/* phone */}
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" maxLength={13} name="phone" id="phone" required className="form-control" onChange={handleChange} />
                    </div>
                    {/* date of appointment */}
                    <div className="form-group">
                        <label htmlFor="appointmentDate">Date of Appointment</label>
                        <input type="date" name="appointmentDate" id="appointmentDate" required className="form-control"
                            onChange={handleChange} />
                    </div>
                    {/* time of appointment */}
                    <div className="form-group">
                        <label htmlFor="timeSlot">Book Time Slot</label>
                        {/* create a time slot for the day
                           using select */}
                        <select name="timeSlot" id="timeSlot" required className="form-control"
                            onChange={handleChange}>
                            <option value="select">Select time slot</option>
                            <option value="10:00 AM">10:00 AM</option>
                            <option value="11:00 AM">11:00 AM</option>
                            <option value="12:00 PM">12:00 PM</option>
                            <option value="1:00 PM">1:00 PM</option>
                            <option value="2:00 PM">2:00 PM</option>
                            <option value="3:00 PM">3:00 PM</option>
                            <option value="4:00 PM">4:00 PM</option>
                            <option value="5:00 PM">5:00 PM</option>
                        </select>
                    </div>
                    {/* time of appointment */}
                    <div className="btn-group">
                        <button type="submit"
                            className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                        >Book Now</button>
                        {/* <button type="reset" className="btn btn-danger ">Cancel</button> */}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AppointmentForm
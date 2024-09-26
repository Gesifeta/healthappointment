import { useState } from 'react'
import { useEffect } from "react"
import { json, useParams } from "react-router-dom"


import "./AppointmentForm.css"
import { API_URL } from "../../config"

function AppointmentForm({ doctor, cancelBooking }) {

    const [showBookingForm, setShowBookingForm] = useState(true)
    const [appointment, setAppointment] = useState({})
    const { bookingType } = useParams()
    const rate = [];
    const [result, setResult] = useState(null)
    const userEmail = sessionStorage.getItem("email")
    const doctorId = localStorage.getItem("booking") !== null ? JSON.parse(localStorage.getItem("booking")).doctorId : ""
    for (let i = 0; i < 5; i++) {
        rate.push(<span className='rating' key={i}>⭐</span>)
    }
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
        fetch(`${API_URL}/appointment/${userEmail}`, {
            method: "GET"
        })
            .then(res => res.json()).then(([data]) => {
                setAppointment(data)

            }).catch(err => (err))
    }, [userEmail])
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
    //cancel booking from the http server
    const handleCancel = () => {

        fetch(`${API_URL}/booking/delete/${doctorId}`, {
            method: "DELETE"
        }).then(res => res.json()).then(([data]) => {
            setResult(data)
        }).catch(err => (err))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`${API_URL}/booking/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(booking)
        })
        if (response.ok) {
            alert("Booking confirmed")
            const json = await response.json()
            setResult(json)
            setShowBookingForm(false)
        }

    }
    return showBookingForm ?
        (<div className="app__overlay" onClick={(event) => {
            event.stopPropagation()
            if (event.target.className === "app__overlay")
                event.target.style.display = "none"
        }}>
            <div className="app__modal">
                <div className="appointment-grid">
                    <img src={doctor?.image} alt="" />
                    <div className="appointment-text">
                        <h2>{doctor?.name}</h2>
                        <h3>{doctor?.specialty}</h3>
                        <h3>{doctor?.experience} years of experence</h3>
                        <p>Rating:{rate}</p>
                    </div>
                    <div >
                        <form method="POST" className="appointment-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName">Name</label>
                                <input type="text" name="firstName" id="firstName"
                                    value={cancelBooking ? appointment?.name : booking.firstName}
                                    className="form-control"
                                    placeholder="Enter your name" aria-describedby="helpId"
                                    disabled={cancelBooking ? true : false}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* phone */}
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="tel" maxLength={13} name="phone" id="phone" required className="form-control"
                                    value={cancelBooking ? appointment?.phone : booking.phone}
                                    disabled={cancelBooking ? true : false} onChange={handleChange} />
                            </div>
                            {/* date of appointment */}
                            <div className="form-group">
                                <label htmlFor="appointmentDate">Date of Appointment</label>
                                <input type="date" name="appointmentDate"
                                    value={cancelBooking ? appointment?.appointmentDate : booking.appointmentDate}
                                    id="appointmentDate" required className="form-control"
                                    disabled={cancelBooking ? true : false}
                                    onChange={handleChange} />
                            </div>
                            {/* time of appointment */}
                            <div className="form-group">
                                <label htmlFor="timeSlot">Book Time Slot</label>
                                {/* create a time slot for the day
                           using select */}
                                <select name="timeSlot" id="timeSlot" required className="form-control"
                                    value={cancelBooking ? appointment?.timeSlot : booking.timeSlot}
                                    disabled={cancelBooking ? true : false}
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
                                {!cancelBooking ? <button type="submit"
                                    className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                                    onSubmit={() => setShowBookingForm(false)}
                                >Book Now</button> :
                                    <button type="button" onClick={() => {
                                        handleCancel()
                                        setShowBookingForm(false)
                                    }}
                                        className="btn btn-danger mb-2 mr-1 waves-effect waves-light"
                                    >Cancel</button>
                                }
                                {/* <button type="reset" className="btn btn-danger ">Cancel</button> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        ) : null
}

export default AppointmentForm
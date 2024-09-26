import { useState } from 'react'
import { useEffect } from "react"
import { useParams } from "react-router-dom"


import "./AppointmentForm.css"
import { API_URL } from "../../config"

function AppointmentForm({ doctor, cancelBooking, bookingType }) {

    const [showBookingForm, setShowBookingForm] = useState(true)
    const [showCancel, setShowCancel] = useState(false);
    const [error, setError] = useState(null)
    const [showConfirm, setShowConfirm] = useState(false)
    const [appointment, setAppointment] = useState({})
    const rate = [];
    const [result, setResult] = useState(null)
    const userEmail = sessionStorage.getItem("email")

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
        fetch(`${API_URL}/booking/${userEmail}`, {
            method: "GET"
        })
            .then(res => res.json()).then((data) => {
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

        fetch(`${API_URL}/booking/delete/${doctor._id}`, {
            method: "DELETE"
        }).then(res => res.json()).then((data) => {
            setResult(data)
            setShowBookingForm(false)

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

            const json = await response.json()
            setResult(json)
            setShowBookingForm(false)
            showConfirm ? setShowConfirm(false) : setShowConfirm(true)
        }
        else {
            setError(response.statusText)
        }

    }
    return (<> {showBookingForm && !cancelBooking ?
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
                                    disabled={cancelBooking ? true : false} onChange={handleChange} />
                            </div>
                            {bookingType !== "instant" ? (<>
                                {/* date of appointment */}
                                <div className="form-group">
                                    <label htmlFor="appointmentDate">Date of Appointment</label>
                                    <input type={cancelBooking ? "text" : "date"} name="appointmentDate"
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
                                </div></>) : null}
                            {/* time of appointment */}
                            <div className="btn-group">
                                {!cancelBooking ? <button type="submit"
                                    className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                                    onSubmit={() => setShowBookingForm(false)}
                                >Book Now</button> :
                                    <button type="button" onClick={() => {
                                        setShowBookingForm(false)
                                        setShowCancel(true)
                                        window.scrollTo(0, 0)

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
        ) : null}
        {/* show booking details for cancelation*/}
        {cancelBooking ? (<div className="app__overlay" onClick={(event) => {
            event.stopPropagation()
            if (event.target.className === "app__overlay")
                event.target.style.display = "none"
        }}>
            <div className="app__modal">
                <div className="appointment-grid">
                    <h2>Cancel Booking</h2>
                    <p>Are you sure you want to cancel your booking?<h3>{appointment.firstName}.</h3> </p>
                    <br />
                    <img src={doctor?.image} alt="" />
                    <div className="appointment-text">
                        <h2>{doctor?.name}</h2>
                        <h3>{doctor?.specialty}</h3>
                        <h3>{doctor?.experience} years of experence</h3>
                        <p>Rating:{rate}</p>
                        <br />
                        <h3>Booking date: {new Date(appointment.appointmentDate).toLocaleDateString()}</h3>
                        <h3>Time Slot: {appointment.timeSlot}</h3>
                    </div>
                    <div >
                    </div>
                    <div className="btn-group">
                        <button onClick={() => {
                            setShowCancel(false)
                            handleCancel()
                            window.location.reload()

                        }} className="btn btn-danger mb-2 mr-1 waves-effect waves-light">Yes</button>
                        <button onClick={() => {
                            setShowCancel(false)
                            window.location.reload()
                        }} className="btn btn-primary mb-2 mr-1 waves-effect waves-light">No</button>
                    </div>
                </div>
            </div>
        </div>) : null}

        {showConfirm ? (<div className="app__overlay" onClick={(event) => {
            event.stopPropagation()
            if (event.target.className === "app__overlay")
                event.target.style.display = "none"
        }}>
            <div className="app__modal">
                <div className="appointment-text">
                    <h2>Booking confirmed</h2>
                    <p>Thank you for your booking, <span>{booking?.firstName}</span> . We look forward to seeing you on <span>{booking?.appointmentDate}</span> @ <span></span> {booking?.timeSlot}</p>
                    <br />
                    {/* confirmation detail */}
                    <div className="appointment-grid">
                        <img src={doctor?.image} alt="" />
                        <div className="appointment-text">
                            <h2>{doctor?.name}</h2>
                            <h3>{doctor?.specialty}</h3>
                            <h3>{doctor?.experience} years of experence</h3>

                        </div>

                    </div>
                    {/* close button */}
                    <button className="btn btn-primary mb-2 mr-1 waves-effect waves-light" onClick={() => {
                        setShowConfirm(false)
                        window.location.reload()
                    }
                    }>Close</button>
                </div>
            </div>
        </div>) : null}
        {/* display error message */}
        {error ? (<div className="app__overlay" onClick={(event) => {
            event.stopPropagation()
            if (event.target.className === "app__overlay")
                event.target.style.display = "none"
        }}>
            <div className="app__modal">
                <div className="appointment-text">
                    <h2>Error</h2>
                    <p style={{ color: "red" }}>{error}</p>
                    <br />
                    {/* close button */}
                    <button className="btn btn-primary mb-2 mr-1 waves-effect waves-light" onClick={() => {
                        setError(null)
                        window.location.reload()
                    }
                    }>Close</button>
                </div>
            </div>
        </div>) : null}

    </>)

}

export default AppointmentForm
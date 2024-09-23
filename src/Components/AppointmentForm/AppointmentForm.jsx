import { useState } from 'react'
import { useEffect } from "react"
import { useParams } from "react-router-dom"


import "./AppointmentForm.css"
import { API_URL } from "../../config"

function AppointmentForm() {
    const { email } = useParams()

    // state to store the doctor details
    const [doctor, setDoctor] = useState([])

    useEffect(() => {
        // http fetch doctor details from the name
        fetch(`${API_URL}/appointment/${email}`, {
            method: "GET"
        })
            .then(res => res.json()).then(([data]) => setDoctor(data)).catch(err => (err))
    }, [email])
    return (

        <div className="appointment-grid">
            <div className="appointment-text">
                <h2>{doctor?.name}</h2>
                <h3>{doctor?.specialty}</h3>
                <h3>{doctor?.experience} years of experence</h3>
                <p>Rating: ⭐⭐⭐⭐⭐</p>
            </div>
            <div >
                <form method="POST" className="appointment-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" required className="form-control"
                            placeholder="Enter your name" aria-describedby="helpId"
                        />
                    </div>
                    {/* phone */}
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" maxLength={13} name="phone" id="phone" required className="form-control" />
                    </div>
                    {/* date of appointment */}
                    <div className="form-group">
                        <label htmlFor="date">Date of Appointment</label>
                        <input type="date" name="date" id="date" required className="form-control" />
                    </div>
                    {/* time of appointment */}
                    <div className="form-group">
                        <label htmlFor="time">Book Time Slot</label>
                        {/* create a time slot for the day
                           using select */}
                        <select name="time" id="time" required className="form-control">
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
                            className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Book Now</button>
                        {/* <button type="reset" className="btn btn-danger ">Cancel</button> */}
                    </div>
                </form>
            </div>
        </div>

    )
}

export default AppointmentForm
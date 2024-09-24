import React, { useEffect, useState } from 'react'
import './PopUp.css'
import { API_URL } from '../../config'

const PopUp = () => {
    //set doctor id
const [doctorId,setDoctor]=useState(null)
    //set booking id
    //get doctor from local storage
    const email = sessionStorage.getItem('email')
    //http get search from appointment by name
    useEffect(() => {
        fetch(`${API_URL}/booking/${email}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(([data]) => {
                localStorage.setItem('booking', JSON.stringify(data))

                return data.doctorId
            }).then((id) => {
                fetch(`${API_URL}/doctor/${id}`, {
                    method: 'GET',
                })
                    .then(response => response.json())
                    .then((data) => {
                        localStorage.setItem('doctor', JSON.stringify(data))
                        
                    })
            }).catch(err => (err))
    }, [])

    const doctor = localStorage.getItem('doctor') !== "undefined" && JSON.parse(localStorage.getItem('doctor'))
    //get booking from local storage
    const booking = localStorage.getItem('booking') !== "undefined" && JSON.parse(localStorage.getItem('booking'))
    return ( booking &&
        doctor &&
        <section className='app__pop-up'>
            <h3>Appointment Details</h3>
            <div className="app__pop-up--item">
                <p style={{ textWrap: "nowrap" }}><strong>Doctor: </strong>{doctor?.name}</p>
                <p style={{ textWrap: "nowrap" }}><strong>Specialty: </strong>{doctor?.specialty}</p>
                <p style={{ textWrap: "nowrap" }}><strong>Your Name: </strong>{booking?.firstName}</p>
                <p style={{ textWrap: "nowrap" }}><strong>Phone Number: </strong>{booking?.phone}</p>
                <p style={{ textWrap: "nowrap" }}><strong>Date of Appointment: </strong>{booking?.appointmentDate}</p>
                <p style={{ textWrap: "nowrap" }}><strong>Time Slot:</strong>{booking?.timeSlot}</p>
            </div>
        </section>
    )
}

export default PopUp
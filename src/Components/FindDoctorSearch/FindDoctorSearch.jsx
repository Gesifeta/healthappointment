import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { images } from "../../assets"
import "./FindDoctorSearch.css"
import { API_URL } from "../../config"
import DoctorCard from "../DoctorCard/DoctorCard"
import AppointmentForm from "../AppointmentForm/AppointmentForm"

const FindDoctorSearch = () => {

    const [isSearch, setIsSearch] = useState(false)
    const [specialties, setSpecialties] = useState([])
    const [doctors, setDoctors] = useState([])
    const [filteredDoctors, setFilteredDoctors] = useState([])
    const [filteredSpecialties, setFilteredSpecialties] = useState([])
    const [searchText, setSearchText] = useState("")
    useEffect(() => {
        fetch(`${API_URL}/search`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                setDoctors(data)
                setSpecialties([...new Set(data.map(doctor => doctor.specialty))])
            })
    }, [])
    useEffect(() => {
        const filtered = specialties.filter(specialty => specialty.toLowerCase().includes(searchText.toLowerCase()))
        setFilteredSpecialties(filtered)
    }, [searchText, doctors])
    useEffect(() => {
        const filtered = doctors.filter(doctor => doctor.specialty.toLowerCase().includes(searchText.toLowerCase()))
        setFilteredDoctors(filtered)
    }, [searchText, doctors])
    const handleSpecialtySearch = (e) => {
        setSearchText(e.target.value)
    }
    const handleDoctorSearch = (event) => {
        event.preventDefault()
        let search = event.target.textContent?.toLowerCase()
        // Handle doctor search logic here
        setSearchText(search);

    }
    return (
        <div className='app__doctor-search'>
            <h1>Find Available Doctors</h1>
            <div className="form-group search">
                <input type="search" className="form-control" placeholder="Search for doctor, clinics, hospitals, etc."
                    aria-label="Search" aria-describedby="basic-addon2"
                    onChange={(event) => {
                        handleSpecialtySearch(event)
                        setSearchText(event.target.value)

                    }
                    }
                    onClick={() => setIsSearch(!isSearch)}

                />
                <img src={images.search} alt="" />
            </div>
            {isSearch ?
                <div className="app__doctor-search--list" onMouseLeave={() => setIsSearch(false)}>
                    <div className="list-item" >
                        {filteredSpecialties.map((specialty, index) => (
                            <div className="specialty-list" key={index} >
                                <div> <img src={images.search} alt={specialty.name} />
                                    <h3 onClick={handleDoctorSearch} >{specialty}</h3></div>
                                <p  >Speciality</p>
                            </div>
                        ))}
                    </div>
                </div> : null}
            {/* doctors card */}
            <h2>More than {filteredDoctors.length} Available doctors</h2>
            <h3>Book a doctor with minimum waiting time and verified badge.</h3>
            <div className="app__doctor-search--card">
                {/* doctors card */}

                {isSearch ? doctors.map((doctor, index) => (
                    <div className="doctor-card" key={index}>
                        <img src={doctor.image} alt={doctor.name} />
                        <h2>{doctor.name}</h2>
                        <h4>{doctor.specialty}</h4>
                        <p>{doctor.experience} of experiences.</p>
                        {/* rating */}
                        <p>Rating: ⭐⭐⭐⭐⭐</p>
                        <div className="btn-group">
                            <button className=" btn-primary">Book Appointment free</button>
                        </div>
                    </div>
                )) : filteredDoctors.map((doctor, index) => (
                    <DoctorCard doctor={doctor} key={index} />
                ))}
            </div>

        </div>
    )
}

export default FindDoctorSearch
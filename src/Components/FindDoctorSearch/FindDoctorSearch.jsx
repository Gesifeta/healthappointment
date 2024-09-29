import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { images } from "../../assets"
import "./FindDoctorSearch.css"
import { API_URL } from "../../config"
import DoctorCard from "../DoctorCard/DoctorCard"
import Loading from "../Loading"

const FindDoctorSearch = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { bookingType } = useParams()
    const [isSearch, setIsSearch] = useState(false)
    const [specialties, setSpecialties] = useState([])
    const [doctors, setDoctors] = useState([])
    const [booking, setBooking] = useState(null)
    const [filteredDoctors, setFilteredDoctors] = useState([])
    const [filteredSpecialties, setFilteredSpecialties] = useState([])
    const [searchText, setSearchText] = useState("")

    //get email from session storage
    const email = sessionStorage.getItem("email")
    useEffect(() => {
        fetch(`${API_URL}/user/search`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                setDoctors(data)
                setSpecialties([...new Set(data.map(doctor => doctor.specialty))]);
                setIsLoading(false)
            })
    }, [searchText])
    //fetch booking
    useEffect(() => {
        fetch(`${API_URL}/booking/${email}`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                setBooking(data)
                setIsLoading(false)
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
    return isLoading ? <Loading /> : (
        <div className='app__doctor-search'>
            <h1>Find Your Doctor at Your Own Ease</h1>
            <img src="https://cdn.pixabay.com/photo/2021/11/20/03/16/doctor-6810750_1280.png" alt="search picture" />
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
                <div className="app__doctor-search--list" >
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
            <>
                <h2> {filteredDoctors.length ? `More than ${filteredDoctors.length}` : "Type to see"} available doctors</h2>
                <h3>Book a doctor with minimum waiting time and verified badge.</h3>
                <div className="app__doctor-search--card">
                    {/* doctors card */}
                    {filteredDoctors.map((doctor, index) => (
                        <DoctorCard doctor={doctor} key={index} booking={booking} bookingType={bookingType} />
                    ))}
                </div>
            </>
        </div>
    )
}

export default FindDoctorSearch
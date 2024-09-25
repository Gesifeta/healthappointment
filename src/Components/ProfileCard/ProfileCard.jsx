import { useEffect, useState } from 'react'
import { API_URL } from '../../config.js'
import React from 'react'

const ProfileCard = () => {
    const email = sessionStorage.getItem("email") !== null ?
        sessionStorage.getItem("email") : "";
    const authToken = sessionStorage.getItem("auth-token") !== null ?
        sessionStorage.getItem("auth-token") : "";
    //if user is not logged in, redirect to login page
    const name = sessionStorage.getItem("name") !== null ? sessionStorage.getItem("name") : "";

    const [showModal, setShowModal] = useState(true);
    const [userUpdateDetails, setUserUpdateDetails] = useState({
        name: "",
        phone: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [user, setUser] = useState({
        email: "",
        name: "",
        phone: ""
    })

    //get user data from http server   
    useEffect(() => {
        //if user is logged in, fetch user data from server
        if (authToken) {

            fetch(`${API_URL}/user/profile/${email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    setUser({ ...data })
                })
                .catch((err) => err);

        }
        else {
            window.location.href = "/login"
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = {
            name: userUpdateDetails.name,
            phone: userUpdateDetails.phone,
            email
            // email: user.email, // email cannot be updated
        }

        fetch(`${API_URL}/user/update`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
                "Email": email,
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                setUserUpdateDetails({ ...data })
                sessionStorage.setItem("name", userUpdateDetails.name)
                window.location.reload();
                setShowModal(false);
                setEditMode(false)
            })
            .catch((err) => err);
    }
    return showModal && (
        <div className='app__profile-form'>
            <div className="app__overlay">
                <div className="app__modal">
                    {!editMode ? (
                        // show user profile with email and name
                        <form className="app__form" onSubmit={handleSubmit}>
                            <h2>Welcome, {name}!</h2>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" value={user?.email} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" value={user?.name} disabled />
                            </div>
                            <button type="submit" className="btn-primary"
                                onClick={() => setEditMode(true)}
                            >Edit</button>
                            <button type="button" className="btn-secondary" onClick={() =>{ setShowModal(false)
                                window.location.href="/home"
                            }}>Cancel</button>
                        </form>
                    ) : (

                        <form method='PATCH' className="app__form" onSubmit={handleSubmit}>
                            <h2>Edit your profile</h2>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" value={email} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" value={userUpdateDetails.name} onChange={(e) => setUserUpdateDetails({ ...user, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="tel" id="phone" minLength={10} maxLength={10} value={userUpdateDetails.phone} onChange={(e) => setUserUpdateDetails({ ...user, phone: e.target.value })} />
                            </div>
                            <button type="submit" className="btn-primary">Save</button>
                            <button type="button" className="btn-secondary" onClick={() => {
                                setShowModal(false)
                                window.location.reload();
                            }}>Cancel</button>
                        </form>
                    )}
                    {/* user update form end */}
                </div>
            </div>

        </div>
    )
}

export default ProfileCard

import React, { useState } from 'react'
import { API_URL } from '../../config';

const FeedBack = ({ doctorId, email }) => {
    const [review, setReview] = useState({
        name: "",
        feedback: "",
        rating: 0,
        email,
        doctorId

    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview({
            ...review,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        const overlay = document.querySelector(".app__overlay")
        e.preventDefault();
        

        //post request to server with review data
        fetch(`${API_URL}/review/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(([data]) => {
                localStorage.setItem("review", JSON.stringify(data));
                overlay.style.display = "none"
                window.location.reload();
                //clear form
                setReview({
                    name: "",
                    feedback: "",
                    rating: 0,
                    doctorId,
                    email: ""
                });
            })
            .catch(err => (err));
    }
    // c
    return (
        <div className="app__overlay" onClick={(e) => {
            e.stopPropagation()
            if (e.target.className === "app__overlay") {
                window.location.reload();
                e.target.style.display = "none"
            }
        }}>
            <div className="app__modal">
                <div className='app__feedback'>
                    {/* create review Form  */}
                    <h2 style={{ alignSelf: "center" }}>Give your review here</h2>

                    <form method='POST' onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required
                            onChange={input => handleInputChange(input)}
                        />
                        <label htmlFor="feedback">Feedback:</label>
                        <textarea id="feedback" name="feedback" rows={7} required

                            onChange={input => handleInputChange(input)}
                        ></textarea>
                        <label htmlFor="rating" style={{ fontWeight: "bold" }}>Rating:</label>
                        <p style={{ display: "flex" }}>
                            {[1, 2, 3, 4, 5].map((value, index) => (
                                <span className='rating' key={index} style={{ cursor: "pointer" }} onClick={() => setReview((r) => ({
                                    ...r,
                                    rating: value
                                }))}>
                                    ⭐
                                </span>
                            ))}</p>
                        <button type="submit" className='btn-primary'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FeedBack
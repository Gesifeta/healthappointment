
import React, { useState } from 'react'
import { API_URL } from '../../config';

const FeedBack = ({ doctorId }) => {
    const [review, setReview] = useState({
        name: "",
        feedback: "",
        rating: 0,
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
            .then(data => {
                console.log(data);
                //clear form
                setReview({
                    name: "",
                    feedback: "",
                    rating: 0,
                    doctorId
                });
            })
            .catch(err => console.log(err));
    }
    // c
    return (
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
                <label htmlFor="rating" style={{fontWeight:"bold"}}>Rating:</label>
                <p style={{ display: "flex" }}>
                    {[1, 2, 3, 4, 5].map((value, index) => (
                        <span className='rating' key={index} style={{ cursor: "pointer" }} >
                            ⭐
                        </span>
                    ))}</p>
                <button type="submit" className='btn-primary'>Submit</button>
            </form>

        </div>
    )
}

export default FeedBack
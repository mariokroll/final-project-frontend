import React from 'react'
import { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'


export default function MakeReview() {
    let film = useLoaderData();
    const [loggeado, setLoggeado] = useState(false);
    const [commented, setCommented] = useState(false);

    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/users/me/', {
            mode: 'cors',
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            },
        }).then((response) => {
            if (response.status === 401) {
                setLoggeado(false);
            } else if (response.ok){
                setLoggeado(true);
            } else {
                throw new Error('Algo ha ido mal');
            }
        })
    }, [])
    const postReview = async (e) => {
        e.preventDefault();
        await fetch('http://127.0.0.1:8000/reviews/', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({movie: film.id, rating: rating, review: review}),
            credentials: 'include',
        }).then((response) => {
            if (response.status === 409) {
                setCommented(true);
            } else {
                setCommented(false);
            }
        })
    }
    return (
        <div className="container" id="containerFilm">
            <div className="film-details" id="filmDetails">
            <h1>{film.title}</h1>
            <p>Director: {film.director}</p>
            <p>Año: {film.year}</p>
            <p>Valoración media: {film.rating}</p>
            <form id="review-form" onSubmit={postReview}>
            <div id="reviewContainer">
                <p>
                    <strong>Valoración:</strong>
                    <input type="number" id="review-grade" min="1" max="10" defaultValue="1" style={{marginLeft: "10px"}} onChange={(e) => setRating(e.target.value)}/>
                </p>
                <p className="review-comment-container">
                    <strong>Comentario:</strong>
                    <textarea id="review-comment" style={{marginLeft: "10px", resize:"none", fontFamily:"Arial, sans-serif", width: "80%"}} placeholder="Introduce tu comentario..." onChange={(e) => setReview(e.target.value)}/>
                </p>
            </div>
            {/* <button className="post-button" id="submit-review" onClick={(event) => postReview(event)} disabled={!loggeado}>Enviar</button> */}
            <button type="submit" disabled={!loggeado}>Enviar</button>
            {!loggeado ? <p id="review-message">Inicia sesión para poder publicar tu review</p> : null}
            {commented ? <p id="review-message">Ya has comentado esta película</p> : null}
            </form>
            </div>
        </div>
    )
}

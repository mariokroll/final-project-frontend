import React from 'react'
import { useState, useEffect } from 'react'
import { useLoaderData, NavLink } from 'react-router-dom'

export default function Film() {
    let film = useLoaderData();
    const [reviews, setReviews] = useState([]);
    useEffect(() => {fetch('http://127.0.0.1:8000/reviews/?movie='+film.id, {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        }).then((response) => {
            if (!response.ok) {
                console.log(response);
                throw Error("Failed to get reviews from the server");
            }
            return response.json()}
        ).then(data => setReviews(data.results))}, [film.id]);
    return (
        <div className="container" id="containerFilm">
            <div className="film-details" id="filmDetails">
            <h1>{film.title}</h1>
            <p>Sinopsis: {film.description}</p>
            <p>Director: {film.director}</p>
            <p>Año: {film.year}</p>
            <p>Valoración media: {film.rating}</p>
            <p>Genero: {film.genre}</p>
            <NavLink to={`/addreview/${film.id}`}>Añadir valoración</NavLink>
            <div className="movie-reviews">
                <p>Valoraciones:</p>
                <ul>
                    {reviews.map(review => {
                        return <li key={review.id}>{review.rating} - {review.review}</li>
                    })}
                </ul>
            </div>
            </div>
        </div>
    )
}
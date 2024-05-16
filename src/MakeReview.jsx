import React from 'react'
import { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'



export default function MakeReview() {
    let film = useLoaderData();
    const [loggeado, setLoggeado] = useState(false);
    const [commented, setCommented] = useState(false);

    let filmId = film.id;

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
    function postReview({ e }) {
        e.preventDefault();
        let reviewGrade = document.getElementById('review-grade').value;
        let reviewComment = document.getElementById('review-comment').value;
        fetch('http://127.0.0.1:8000/reviews/?movie='+filmId, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({rating: reviewGrade, review: reviewComment}),
            credentials: 'include',
        }).then((response) => {
            if (response.status === 409) {
                setCommented(true);
            } else {
                setCommented(false);
            }
        })
    }

    function putReview({ e }) {
        e.preventDefault();
        let reviewGrade = document.getElementById('review-grade').value;
        let reviewComment = document.getElementById('review-comment').value;
        fetch('http://127.0.0.1:8000/reviews/?movie='+filmId, {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({rating: reviewGrade, review: reviewComment}),
            credentials: 'include',
        })
    }

    function deleteReview({ e }) {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/reviews/?movie='+filmId, {
            mode: 'cors',
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
            credentials: 'include',
        })
    }
    return (
        <div className="container" id="containerFilm">
            <div className="film-details" id="filmDetails">
            <h1>{film.title}</h1>
            <p>Director: {film.director}</p>
            <p>Año: {film.year}</p>
            <p>Valoración media: {film.rating}</p>
            <form id="review-form">
            <div id="reviewContainer">
                <p>
                    <strong>Valoración:</strong>
                    <input type="number" id="review-grade" min="1" max="10" defaultValue="1" style={{marginLeft: "10px"}}/>
                </p>
                <p className="review-comment-container">
                    <strong>Comentario:</strong>
                    <textarea id="review-comment" style={{marginLeft: "10px", resize:"none", fontFamily:"Arial, sans-serif", width: "80%"}} placeholder="Introduce tu comentario..."/>
                </p>
            </div>
            <button className="post-button" type="submit" id="submit-review" onClick={postReview} disabled={!loggeado}>Enviar</button>
            {!loggeado ? <p id="review-message">Inicia sesión para poder publicar tu review</p> : null}
            {commented ? <p id="review-message">Ya has comentado esta película</p> : null}
            {commented ? 
            <div>
                <button className="delete-button" id="delete-review" onClick={deleteReview}>Eliminar review</button>
                <button className="put-button" id="put-review" onClick={putReview}>Modificar review</button>
            </div> : null}
            </form>
            </div>
        </div>
    )
}
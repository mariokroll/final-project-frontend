import React from 'react';
import { useState, useEffect } from 'react';


export default function AdminPanel() {
    const [correctAdmin, setCorrectAdmin] = useState(true);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/genres/', {
            mode: 'cors',
            method: 'get',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error("Failed to get genres from the server");
            }
        
        }).then(data => {
            setGenres(data);
        })
    }, [])

    const addFilm = (e) => {
        e.preventDefault();
        const title = e.target[0].value;
        const director = e.target[1].value;
        const description = e.target[2].value;
        let year = e.target[3].value;
        // year must be integer
        year = parseInt(year);
        let rating = e.target[4].value;
        // rating must be float
        rating = parseFloat(rating);
        let genreValue = e.target[5].value;
        let genre = genres.filter(genre => genre.name === genreValue)[0].id;
        let image = e.target[6].value;
        let body = JSON.stringify({
            title: title,
            director: director,
            description: description,
            year: year,
            rating: rating,
            genre: genre,
            images: image
        })
        console.log(body)

        fetch('http://127.0.0.1:8000/movies/', {
            mode: 'cors',
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                director: director,
                description: description,
                year: year,
                rating: rating,
                genre: genre,
                image: image,
            }),
        }).then((response) => {
            if (response.status === 401) {
                setCorrectAdmin(false);
            } else if (response.ok) {
                setCorrectAdmin(true);
            } else {
                setCorrectAdmin(false);
            }
        })
    }
    const updateFilm = (e) => {
        e.preventDefault();
        const id = e.target[0].value;
        const title = e.target[1].value;
        const director = e.target[2].value;
        const description = e.target[3].value;
        let year = e.target[3].value;
        // year must be integer
        year = parseInt(year);
        let rating = e.target[4].value;
        // rating must be float
        rating = parseFloat(rating);
        let genreValue = e.target[5].value;
        let genre = genres.filter(genre => genre.name === genreValue)[0].id;
        const image = e.target[7].value;
        fetch('http://127.0.0.1:8000/movies/'+id+'/', {
            mode: 'cors',
            method: 'put',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                director: director,
                description: description,
                year: year,
                rating: rating,
                genre: genre,
                image: image
            })
        }).then((response) => {
            if (response.status === 401) {
                setCorrectAdmin(false);
            } else if (response.ok) {
                setCorrectAdmin(true);
            } else {
                setCorrectAdmin(false);
            }
        })
    }
    const deleteFilm = (e) => {
        e.preventDefault();
        const id = e.target[0].value;
        fetch('http://127.0.0.1:8000/movies/'+id+'/', {
            mode: 'cors',
            method: 'delete',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.status === 401) {
                setCorrectAdmin(false);
            } else if (response.ok) {
                setCorrectAdmin(true);
            } else {
                setCorrectAdmin(false);
            }
        })}
    return (<div className="main-page">
            <h1>Panel de administración</h1>
            <div className="container" id="forms-panel" style={{width: "20%"}}>
                <h2>Actualizar película</h2>
                <form onSubmit={updateFilm}>
                    <input type="number" placeholder="Id película" />
                    <input type="text" placeholder="Título" />
                    <input type="text" placeholder="Director" />
                    <textarea placeholder="Descripción" />
                    <input type="text" placeholder="Año" />
                    <input type="number" placeholder="Rating" min={0} max={10}/>
                    <select>
                        {genres.map(genre => genre.name).map(genre => <option key={genre} value={genre}>{genre}</option>)}
                    </select>
                    <input type="text" placeholder="URL de la imagen" />
                    <button type="submit">Actualizar película</button>
                </form>
            </div>
            <div className="container" id="forms-panel" style={{width: "20%"}}>
                <h2>Eliminar película</h2>
                <form onSubmit={deleteFilm}>
                    <input type="number" placeholder="Id película" />
                    <button type="submit">Eliminar película</button>
                </form>
            </div>
            <div className="container" id="forms-panel" style={{width: "20%"}}>
                <h2>Añadir película</h2>
                <form onSubmit={addFilm}>
                    <input type="text" placeholder="Título" required/>
                    <input type="text" placeholder="Director" />
                    <textarea placeholder="Descripción" />
                    <input type="text" placeholder="Año" />
                    <input type="number" placeholder="Rating" min={0} max={10}/>
                    <select>
                        {genres.map(genre => genre.name).map(genre => <option key={genre} value={genre}>{genre}</option>)}
                    </select>
                    <input type="text" placeholder="URL de la imagen" />
                    <button type="submit">Añadir película</button>
                </form>
        </div>
        </div>
    );
}

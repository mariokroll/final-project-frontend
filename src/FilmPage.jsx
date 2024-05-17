import { useEffect, useState } from 'react';
import { NavLink as Navlink } from 'react-router-dom';

// import Header from './Header.jsx'
// import Footer from './Footer.jsx'
const PATH = 'http://127.0.0.1:8000/';

const INITIAL_PAGE = 1;

function SearchBar({ search, setSearch }) {
    return (
        <div className="search-bar-container">
            <input className="search-bar-input" placeholder="Título" value={search.title} onChange={(e) => setSearch({...search, title: e.target.value})} />
        </div>
    )
}

function GenreDropdown({ search, setSearch }) {
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        fetch(PATH+'genres/', {
            mode: 'cors',
            method: 'get',
            headers: {
                'Content-type': 'application/json',
            },
        }).then((response) => {
            if (!response.ok) {
                throw Error("Failed to get genres from the server");
            }
            return response.json();
        }).then(data => {
            let dataGenres = data.map(genre => genre.name);
            dataGenres = ['--Género--', ...dataGenres];
            setGenres(dataGenres);
        });
    }, [])
    return (
        <div className="search-bar-container" style={{marginTop:"5%"}}>
            <select className="search-bar-input" onChange={(e) => setSearch({...search, genre: e.target.value})}>
                {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
            </select>
        </div>
    
    )
}

function RatingSelector({ search, setSearch }) {
    return (
        <div className="search-bar-container" style={{marginTop:"5%"}}>
            <input className="search-bar-input" type="number" placeholder="Rating" onChange={(e) => setSearch({...search, rating: e.target.value})} min={1} max={10}/>
        </div>
    )
}

function DescriptionInput({ search, setSearch }) {
    return (
        <div className="search-bar-container" style={{marginTop:"5%", height: "auto"}}>
            <textarea className="search-bar-input" placeholder="Descripción" value={search.description} onChange={(e) => setSearch({...search, description: e.target.value})} style={{fontFamily: 'sans-serif', resize: 'vertical'}}/>
        </div>
    )

}

function OrderByRating({ search, setSearch }) {
    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            setSearch({...search, order: '1'});
        } else {
            setSearch({...search, order: ''});
        }
    };
    return (
        <div className="search-bar-container" style={{marginTop:"5%"}}>
            <label>
            <input type="checkbox" onChange={handleCheckboxChange}/>
            Ordenar por rating
            </label>
        </div>
    )
}

function SearchFilm({ search, setSearch }) {
    return (<div className='container' id="search-container">
        <div className="search-bar">
            <h2>Buscar película</h2>
            <SearchBar search={search} setSearch={setSearch}/>
            <GenreDropdown search={search} setSearch={setSearch}/>
            <RatingSelector search={search} setSearch={setSearch}/>
            <DescriptionInput search={search} setSearch={setSearch}/>
            <OrderByRating search={search} setSearch={setSearch}/>
        </div>
    </div>)
}

function PageFilter({ currentPage, setCurrentPage, maxPage }) {

    function changePage(page) {
      page = Math.max(1, page);
        page = Math.min(maxPage, page);
      setCurrentPage(page);
    }
    return (
      <div className="buttons" id="page-changer">
        <button onClick={() => changePage(currentPage - 1)} disabled={currentPage == INITIAL_PAGE}>&lt;</button>
        <p style={{marginLeft: "15px", marginRight: "15px"}}>{currentPage}</p>
        <button onClick={() => changePage(currentPage + 1)} disabled={currentPage == maxPage}>&gt;</button>
      </div>)
  }

function ListPage({ films, page, setPage, maxPage}) {
    return (<div className="container" id="films-container">
        <h2>Películas</h2>
        <FilmsList films={films} />
        <PageFilter currentPage={page} setCurrentPage={setPage} maxPage={maxPage}/>
    </div>)
}

function FilmsList({ films }) {
    return (<div id='films-list'>
        {films.map(film => 
        <Navlink to={`/movies/${film.id}`} key={film.id} style={{ textDecoration: "none", color: "black" }}>
        <Film key={film.id} film={film} />
        </Navlink>
        )}</div>)
}

function Film({ film }) {
    return (
        <figure className="film-advance" id="filmAdvance">
            <img src={film.images} alt="Thumbnail" className="thumbnail"/>
            <figcaption>{film.title}</figcaption>
        </figure>
    );
}


function MainPage() {
    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
    const [films, setFilms] = useState([]);
    const [maxPages, setMaxPages] = useState(1);
    const searchInitialState = {title: '', genre: '',  rating: '', description: '', order: ''};
    const [search, setSearch] = useState(searchInitialState);
    const [genreData, setGenreData] = useState([]);
    useEffect(() => {
        fetch(PATH+'genres/', {
            mode: 'cors',
            method: 'get',
            headers: {
                'Content-type': 'application/json',
            },
        }).then((response) => {
            if (!response.ok) {
                throw Error("Failed to get genres from the server");
            }
            return response.json();
        }).then(data => {
            setGenreData(data);
        
        });
        
        let searchParams = new URLSearchParams();
        for (let key in search) {
            if (search[key] !== '') {
                if (search[key] !== '--Género--') {
                    if (key !== 'genre') {searchParams.append(key, search[key]);}
                    else {searchParams.append(key, genreData.filter(
                        genre => genre.name === search[key]
                    )[0].id);}
                } 
            }
        }
        fetch('http://127.0.0.1:8000/movies/?page='+currentPage+'&'+searchParams.toString(), {
            mode: 'cors',
            method: 'get',
            headers: {
                'Content-type': 'application/json',
            },
        }).
        then((response) => {
            if (!response.ok) {
                throw Error("Failed to get films from the server");
            }
            return response.json()}
        ).
        then(data => {setFilms(data.results); setMaxPages(data.count / 5 === Math.floor(data.count/5) ? data.count/5 : Math.floor(data.count/5+1));});
    }, [currentPage, search]);

    useEffect(() => {setCurrentPage(INITIAL_PAGE)}, [search])


    return (<div className="main-page">
        <ListPage films={films} page={currentPage} setPage={setCurrentPage} maxPage={maxPages}/>
        <SearchFilm search={search} setSearch={setSearch}/>
    </div>)
}

export default MainPage;

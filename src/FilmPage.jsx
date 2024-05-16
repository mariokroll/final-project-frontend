import { useEffect, useState } from 'react';
import { NavLink as Navlink } from 'react-router-dom';
// if failed to import navlink

// import Header from './Header.jsx'
// import Footer from './Footer.jsx'
const PATH = 'http://127.0.0.1:8000/';

const INITIAL_PAGE = 1;

function SearchFilter({ search, setSearch }) {
    return (
        <div className="search-bar-container">
            <input className="search-bar-input" placeholder="Buscar..." value={search.title} onChange={(e) => setSearch({...search, title: e.target.value})} />
        </div>
    )
}

function SearchFilm({ search, setSearch }) {
    return (<div className='container' id="search-container">
        <div className="search-bar">
            <h2>Buscar producto</h2>
            <SearchFilter search={search} setSearch={setSearch}/>
        </div>
    </div>)
}

function PageFilter({ currentPage, setCurrentPage, maxPage}) {

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
    return (<div>
        {films.map(film => 
        <Navlink to={`/movies/${film.id}`} key={film.id} style={{ textDecoration: "none", color: "black" }}>
        <Film key={film.id} film={film} />
        </Navlink>
        )}</div>)
}

function Film({ film }) {
    return (
        <div className="film-advance" id="filmAdvance">
            {/* <img src={film.thumbnail} alt="Thumbnail" id="thumbnail"/> */}
            <figcaption>{film.title}</figcaption>
        </div>
    );
}


function MainPage() {
    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
    const [films, setFilms] = useState([]);
    const [maxPages, setMaxPages] = useState(1);
    const searchInitialState = {title: '', genre: '',  rating: ''};
    const [search, setSearch] = useState(searchInitialState);
    useEffect(() => {
        let searchParams = new URLSearchParams();
        for (let key in search) {
            if (search[key] !== '') {
                searchParams.append(key, search[key]);
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
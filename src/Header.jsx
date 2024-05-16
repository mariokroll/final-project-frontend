import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'; // Asegúrate de ajustar la ruta al archivo CSS

const Header = ({ isLoggedIn, currentPage }) => {
    return (
        <header className="header">
            <div className="logo">
                <NavLink to="/">
                    <img src="assets/logo.png" alt="Logo de la página" />
                </NavLink>
            </div>
            <nav className="navigation">
                <ul>
                    {isLoggedIn ? (
                        <>
                            <li><NavLink to="/usuario" >Mi Perfil</NavLink></li>
                        </>
                    ) : currentPage !== '/register' && currentPage !== '/login' ? (
                        <>
                            <li><NavLink to="/login" >Inicio de Sesión</NavLink></li>
                            <li><NavLink to="/register" >Registro</NavLink></li>
                        </>
                    ) : null}
                </ul>
            </nav>
        </header>
    );
};

export default Header;

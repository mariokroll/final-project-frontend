import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import Header from './Header.jsx';
import Pie from './Pie.jsx';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Hacer un fetch al endpoint que devuelve la información del usuario
        fetch('http://127.0.0.1:8000/users/me/', {
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Not authenticated');
                }
            })
            .then(data => {
                setIsLoggedIn(true);
            })
            .catch(error => {
                console.log('Authentication check failed:', error);
                setIsLoggedIn(false);
            });
    }, [location]);

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} currentPage={location.pathname} />
            <main>
                <Outlet />
            </main>
            <Pie />
        </div>
    );
}

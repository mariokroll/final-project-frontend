import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import MainPage from './FilmPage.jsx'
import Film from './Film.jsx'
import Login from './Login.jsx'
import Register from './Registro.jsx'
import Perfil from './Perfil.jsx'
import EditarPerfil from './EditarPerfil.jsx'
import MakeReview from './MakeReview.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'


const router = createBrowserRouter([{
  path: '',
  element: <App />,
  children: [{
    path: '',
    element: <MainPage />,
  }, {
    path: 'movies/:id',
    element: <Film />,
    loader: async ({ params }) => {
      return await fetch('http://127.0.0.1:8000/movies/' + params.id + '/', {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
    }
  },
  {
    path: 'addreview/:id',
    element: <MakeReview />,
    loader: async ({ params }) => {
      return await fetch('http://127.0.0.1:8000/movies/' + params.id + '/', {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
    }
  },
  {
    path: 'login',
    element: <Login />,
    action: entrar

  },
  {
    path: 'register',
    element: <Register />,
    action: registrarUsuario
  },
  {
    path: 'usuario',
    element: <Perfil />,
    loader: cargarUsuario,
    action: darBajaUsuario,
  },
  {
    path: 'usuario/editar',
    element: <EditarPerfil />,
    loader: cargarUsuario,
    action: actualizarUsuario

  },

  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

function registro(data) {
  const body = JSON.stringify(data);
  return fetch('http://127.0.0.1:8000/users/', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body,
    credentials: 'include'
  });
}

function logout() {
  return fetch('http://127.0.0.1:8000/users/logout/', { method: 'delete', mode: 'cors', credentials: 'include' });
}

export function perfil(data) {
  if (!data) return fetch('http://127.0.0.1:8000/users/me/', { method: 'get', headers: { 'Content-type': 'application/json' }, mode: 'cors', credentials: 'include' });
  const body = JSON.stringify(data);
  return fetch('http://127.0.0.1:8000/users/me/', { method: 'put', body, credentials: 'include' });
}

export function perfilact(data) {
  if (!data) return fetch('http://127.0.0.1:8000/users/me/', { method: 'get', headers: { 'Content-type': 'application/json' }, mode: 'cors', credentials: 'include' });
  const body = JSON.stringify(data);
  return fetch('http://127.0.0.1:8000/users/me/', { method: 'PATCH', mode: "cors", headers: { 'Content-type': 'application/json' }, body, credentials: 'include' });
}
export function baja() {
  return fetch('http://127.0.0.1:8000/users/me/', { method: 'delete', mode: "cors", credentials: 'include' });
}

function login(email, password) {
  const body = JSON.stringify({ email, password });
  return fetch('http://127.0.0.1:8000/users/login/', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body,
    credentials: 'include'
  });
}

async function entrar({ request }) {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);
  const loginRes = await login(email, password);
  //Si el login es correcto, redirigimos a la página principal
  if (loginRes.ok) {
    return redirect('/');

  }
  return { status: loginRes.status };
}


async function registrarUsuario({ request }) {
  const formData = await request.formData();
  const usuario = Object.fromEntries(formData);
  const registroRes = await registro(usuario);
  if (registroRes.ok) return redirect('/?registrado');
  return { status: registroRes.status };
}

async function actualizarUsuario({ request }) {
  const formData = await request.formData();
  let datos = Object.fromEntries(formData);

  // Eliminar las entradas vacías del objeto datos
  datos = Object.fromEntries(
    Object.entries(datos).filter(([_, value]) => value !== "")
  );

  console.log(datos);
  const actPerfilRes = await perfilact(datos);
  if (actPerfilRes.ok) return redirect('/usuario');
  return redirect('/');
}

async function cargarUsuario() {
  const perfilRes = await perfil();
  if (perfilRes.ok) return perfilRes;
  return redirect('/');
}

async function darBajaUsuario() {
  await baja();
  await logout();
  return redirect('/');
}
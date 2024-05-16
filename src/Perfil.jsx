import { Form, useNavigate, useLoaderData, NavLink, useActionData } from "react-router-dom";
import { Stack, Card, CardActions, CardContent, Button, Typography, Divider, Table, TableCell, TableRow, TableContainer, Chip, TableBody } from "@mui/material";
import { useState } from 'react';

export default function Perfil() {
    const [movieId, setMovieId] = useState(0);
    const usuario = useLoaderData() || {};
    const navigate = useNavigate();
    const busy = navigate.state === 'submitting' ||
        navigate.state === 'loading';
    const responseError = useActionData();

    const credIncorrectas = !busy && responseError;

    if (!usuario || Object.keys(usuario).length === 0) {
        return <div>Cargando datos del usuario...</div>; // O manejo de errores más sofisticado
    }

    function handleRecommendMovieClick() {
        fetch('http://127.0.0.1:8000/recommend/', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',

        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al recomendar película');
                }
            }
            )
            .then(data => {
                setMovieId(data.id);
            })
    }

    return (
        <Stack direction="row" justifyContent="center" alignItems="center"
            sx={{ width: '100%', p: 4 }}>
            <Card variant="outlined" sx={{ minWidth: 275, border: '1px solid #1976d2', boxShadow: 3 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: '#1976d2' }}>
                        Bienvenido,
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {usuario.nombre}
                    </Typography>
                    <Divider><Chip label="Datos contacto" color="primary" size="medium" sx={{ my: 2, fontWeight: 'bold' }} /></Divider>
                    <TableContainer component={Card}>
                        <Table size="medium">
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold', color: '#1976d2' }}>{usuario.tel}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Correo-e</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold', color: '#1976d2' }}>{usuario.email}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: "center" }}>
                    <NavLink to='editar'>
                        <Button variant="outlined" fullWidth disabled={busy} sx={{ mt: 1 }}>
                            Actualizar perfil
                        </Button>
                    </NavLink>
                    <Form method="delete" onSubmit={(event) => !confirm("Esto borrará tu usuario, ¿estás seguro?") && event.preventDefault()}>
                        <Button type="submit" variant="contained" color="error" size="medium" sx={{ fontWeight: 'bold' }}>
                            Darse de baja
                        </Button>
                    </Form>
                    <Button onClick={handleRecommendMovieClick} variant="contained" color="secondary" size="medium" sx={{ fontWeight: 'bold' }}>
                        <NavLink to={`/movies/${movieId}`} style={{ textDecoration: "none", color: "black", width: '100%', height: '100%' }}>
                            Recomendar Película
                        </NavLink>
                    </Button>
                </CardActions>
            </Card>
        </Stack>
    );
}

import { useState } from 'react';
import { Form, NavLink, useNavigation, useActionData } from "react-router-dom";
import { Button, Stack, Paper, Alert, TextField, Typography } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoadingButton from '@mui/lab/LoadingButton';


export default function Registro() {
    // Errores del intento de registro previo
    const responseError = useActionData();
    const navigation = useNavigation();
    const busy = navigation.state === 'submitting' ||
        navigation.state === 'loading';
    // Muestra el error a menos que estemos enviando algo
    const errorRegistro = !busy && responseError;
    // Validación contraseña
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const passDiferentes = password !== password2;

    return (
        <Stack direction="row" justifyContent="center" alignItems="center"
            sx={{ width: 1, height: "100vh" }}>
            {/* Tarjeta centrada vertical y horizontalmente */}
            <Paper elevation={4} sx={{ p: 1, borderRadius: 2, width: { xs: '90%', sm: '800px' } }}>
                {/* Acción de React Router para enviar el registro */}
                <Form method="post">
                    <Stack spacing={2} alignItems="center">
                        <Typography variant="h5" color="primary">Registro</Typography>
                        {/* Icono de registro */}
                        <AccountBoxIcon color="action" sx={{ fontSize: 40 }} />
                        {/* Campos de registro: nombre, teléfono, email, password, password2 */}
                        <TextField
                            label="Nombre"
                            name="nombre"
                            fullWidth
                            disabled={busy}
                            required
                        />
                        <TextField
                            label="Teléfono"
                            name="tel"
                            fullWidth
                            disabled={busy}
                            required
                            type="tel"
                        />
                        <TextField
                            label="Correo electrónico"
                            name="email"
                            fullWidth
                            disabled={busy}
                            required
                            type="email"
                        />

                        <TextField
                            label="Contraseña"
                            name="password"
                            type="password"
                            fullWidth
                            disabled={busy}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <TextField
                            label="Repetir contraseña"
                            name="password2"
                            type="password"
                            fullWidth
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            error={passDiferentes}
                            helperText={passDiferentes ? "Las contraseñas deben coincidir" : ""}
                            required
                        />
                        {/* Mensaje para errores durante el registro */}
                        <Alert
                            severity="error"
                            sx={{ width: '100%', visibility: responseError ? 'visible' : 'hidden' }}
                        >
                            {responseError ? 'Error en el registro' : ''}
                        </Alert>

                        <LoadingButton
                            type="submit"
                            variant="contained"
                            fullWidth
                            loading={busy}
                            disabled={busy || passDiferentes}>
                            Registrarse
                        </LoadingButton>
                        {/* Botón para navegar al login */}
                        <NavLink to='/login' style={{ width: '100%' }}>
                            <Button fullWidth disabled={busy}>Entrar</Button>
                        </NavLink>
                    </Stack>
                </Form>
            </Paper>
        </Stack>
    )
}



import { Form, NavLink, useNavigation, useActionData, useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import LockIcon from '@mui/icons-material/Lock';
import LoadingButton from '@mui/lab/LoadingButton';

export default function Login() {
    // Errores del intento de login previo
    const responseError = useActionData();
    const navigation = useNavigation();
    const location = useLocation();
    const busy = navigation.state === 'submitting' ||
        navigation.state === 'loading';
    // Muestra el error de login a menos que estemos enviando algo
    const credIncorrectas = !busy && responseError;
    // Si el registro tuvo éxito, nos redirigieron a login con este query param
    const registrado = location.search === '?registrado';

    return (
        <Stack direction="row" justifyContent="center" alignItems="center"
            sx={{ width: '100%', height: "100vh" }}>
            <Paper elevation={6} sx={{ p: 3, borderRadius: 3, maxWidth: 400 }}>
                <Form method="post">
                    <Stack direction="column" justifyContent="center" alignItems="center">
                        <LockIcon color="primary" sx={{ fontSize: 50, mb: 3 }} />
                        <TextField margin="dense" size="medium" required fullWidth disabled={busy}
                            label="Correo electrónico" name="email" type="email"
                            variant="outlined" sx={{ mb: 2 }}
                        />
                        <TextField margin="dense" size="medium" required fullWidth disabled={busy}
                            label="Contraseña" name="password" type="password"
                            variant="outlined" sx={{ mb: 2 }}
                        />
                        {credIncorrectas && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                            ¡Credenciales incorrectas! Prueba otra vez.
                        </Alert>}
                        {registrado && <Alert severity="success" sx={{ mt: 2, width: '100%' }}>
                            ¡Registrado! Prueba a entrar.
                        </Alert>}
                        <LoadingButton type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 2 }}
                            loading={busy} disabled={busy}>
                            Entrar
                        </LoadingButton>
                        <NavLink to='/register'>
                            <Button variant="outlined" fullWidth disabled={busy} sx={{ mt: 1 }}>
                                Registrarse
                            </Button>
                        </NavLink>
                    </Stack>
                </Form>
            </Paper>
        </Stack>
    );
}

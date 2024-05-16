import { useState } from 'react';
import { useLoaderData, useNavigation, Form } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function EditarPerfil() {
    // Datos del usuario
    const usuario = useLoaderData();
    const navigation = useNavigation();
    const busy = navigation.state === 'submitting' ||
        navigation.state === 'loading';

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const passDiferentes = password !== password2;

    return (
        <Stack direction="row" justifyContent="center" alignItems="center"
            sx={{ width: 1, p: 4 }}>
            {/* Tarjeta centrada horizontalmente */}
            <Card variant="outlined" sx={{ minWidth: '15%' }}>
                {/* Acción de React Router para actualizar el perfil */}
                <Form method="patch" >
                    <CardContent>
                        {/* Elementos del formulario apilados verticalmente */}
                        <Stack direction="column" justifyContent="center" alignItems="center">
                            <AccountBoxIcon color="action" sx={{ fontSize: 40, mb: 2 }} />
                            {/* Campos del perfil: nombre, teléfono, password, password2 */}
                            <TextField margin="dense" size="small" fullWidth disabled={busy}
                                label="Nombre"
                                name="nombre"
                                defaultValue={usuario.nombre}
                            />
                            <TextField margin="dense" size="small" fullWidth disabled={busy}
                                label="Teléfono"
                                name="tel"
                                type="tel"
                                defaultValue={usuario.tel}
                            />
                            {/* ToDo#10: añade los campos necesarios para implementar el cambio de contraseña */}
                            <TextField margin="dense" size="small" fullWidth disabled={busy}
                                label="Nueva contraseña"
                                name="password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <TextField margin="dense" size="small" fullWidth disabled={busy}
                                label="Repetir contraseña"
                                name="password2"
                                type="password"
                                value={password2}
                                onChange={e => setPassword2(e.target.value)}
                                error={passDiferentes}
                                helperText={passDiferentes && "Las contraseñas deben coincidir"}  // indica al usuario que deben coincidir
                            />
                        </Stack>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: "center" }}>
                        {/* Botón para enviar los datos del usuario */}
                        <Button type="submit" variant="outlined" color="warning" size="small" disabled={busy}>
                            Actualizar
                        </Button>
                    </CardActions>
                </Form>
            </Card>
        </Stack>
    );
}
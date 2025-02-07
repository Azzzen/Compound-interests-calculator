import { useState, Fragment } from 'react';
import axios from 'axios';
import { Button, Card, TextField, Typography, CardContent, Input, Box, Modal, Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';
export default function Calculator() {
    const [capital, setCapital] = useState('');
    const [rate, setRate] = useState('');
    const [years, setYears] = useState('');
    const [result, setResult] = useState(null);
    const [openResultModal, setOpenResultModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/simulate-interests', { capital, rate, years });
            setResult(response.data.result);
            setOpenResultModal(true);
        } catch (error) {
            console.error("Error calculating:", error);
        }
    };
    const handleReset = () => {
        setCapital('');
        setRate('');
        setYears('');
        setResult(null);
    }

    return (
        <Fragment>
            <Modal open={openResultModal} onClose={() => setOpenResultModal(false)} >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: 2,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Résultats de la simulation :
                    </Typography>
                    <Typography variant="body1"> Capital initial : {capital} €</Typography>
                    <Typography variant="body1"> Capital après {years > 1 ? years + ' ans' : 'une année'} : {result?.toFixed(2)} €</Typography>
                    <Typography variant="body1"> Profit : {(result - capital).toFixed(2)} €</Typography>
                </Box>
            </Modal>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid size={{ xs: 10, sm: 8, md: 4 }}>
                    <Card variant="outlined" style={{ padding: '16px', textAlign: 'center', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <CardContent>
                            <Grid container justifyContent="center" style={{ marginBottom: '16px' }}>
                                <Grid item xs={12} md={6}>
                                    <Button variant="contained" color="secondary" fullWidth href='/'>
                                        Autres simulateurs
                                    </Button>
                                </Grid>
                            </Grid>
                            <Typography variant="h5" gutterBottom>
                                Calculateur d'interets composés
                            </Typography>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        type="number"
                                        id="capital"
                                        label="Capital"
                                        variant="filled"
                                        fullWidth
                                        value={capital}
                                        onChange={(e) => setCapital(e.target.value)}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        type="number"
                                        id="Rate"
                                        label="Rate"
                                        variant="filled"
                                        fullWidth
                                        value={rate}
                                        onChange={(e) => setRate(e.target.value)}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 8 }}>
                                    <TextField
                                        type="number"
                                        id="Years"
                                        label="Years"
                                        variant="filled"
                                        fullWidth
                                        value={years}
                                        onChange={(e) => setYears(e.target.value)}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={handleSubmit}
                                    >
                                        Calculer
                                    </Button>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={handleReset}
                                    >
                                        Réinitialiser
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Fragment >
    );
}

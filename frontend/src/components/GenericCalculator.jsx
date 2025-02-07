import { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, TextField, Typography, CardContent, Box, Modal } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import Grid from '@mui/material/Grid2';
export default function GenericCalculator({ route }) {
    const [sentData, setSentData] = useState({ n1: '', n2: '', n3: '' });
    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [openResultModal, setOpenResultModal] = useState(false);
    const [type, setType] = useState(0);
    const inputs = {
        "simulate-compound-interests": {
            label: "Intérêts Composés",
            fields: {
                n1: { label: "Capital" },
                n2: { label: "Taux" },
                n3: { label: "Durée (années)" }
            },
            type: 1
        },
        "simulate-simple-interests": {
            label: "Intérêts Simples",
            fields: {
                n1: { label: "Capital" },
                n2: { label: "Taux" },
                n3: { label: "Durée (années)" }
            },
            type: 2
        },
        "simulate-linear-depreciation": {
            label: "Depreciation linéaire",
            fields: {
                n1: { label: "Valeur initiale" },
                n2: { label: "Valeur residuelle" },
                n3: { label: "Durée de vie (années)" }
            },
            type: 3
        },
        "simulate-linear-depreciation-time": {
            label: "Depreciation linéaire selon le temps",
            fields: {
                n1: { label: "Valeur initiale" },
                n2: { label: "Taux" },
                n3: { label: "Valeur residuelle" }
            },
            type: 4
        }
    };
    useEffect(() => {
        setType(inputs[route].type)
    }, [route])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/' + route, { n1: sentData.n1, n2: sentData.n2, n3: sentData.n3 });
            setResult(response.data.result);
            setChartData(response.data.chartData)
            setOpenResultModal(true);
        } catch (error) {
            console.error("Error calculating:", error);
        }
    };
    const handleReset = () => {
        setSentData({ n1: 0, n2: 0, n3: 0 });
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
                    <Typography variant="body1"> Capital initial : {sentData.n1} €</Typography>
                    {type === 4 ? <Typography variant="body1">{result?.toFixed(2) > 0 ? result?.toFixed(0) + ' ans ' : 'une année '} avant d'atteindre la valeur:{sentData?.n3} €</Typography> : <Typography variant="body1"> Capital après {sentData.n3 > 1 ? sentData.n3 + ' ans' : 'une année'} : {result?.toFixed(2)} €</Typography>}
                    <LineChart
                        xAxis={[{ data: chartData?.xAxis }]}
                        series={chartData?.series}
                        width={500}
                        height={300}
                    />
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
                                {inputs[route].label}
                            </Typography>
                            <Grid container spacing={2} justifyContent="center">
                                {inputs[route] &&
                                    Object.entries(inputs[route].fields).map(([key, { label }]) => (
                                        <Grid size={{ xs: 12, md: 7 }} key={key}>
                                            <TextField
                                                type="number"
                                                label={label}
                                                variant="filled"
                                                fullWidth
                                                value={sentData[key]}
                                                onChange={(e) => setSentData({ ...sentData, [key]: e.target.value })}
                                            />
                                        </Grid>
                                    ))
                                }
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

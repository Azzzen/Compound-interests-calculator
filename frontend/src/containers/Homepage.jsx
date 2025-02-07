import { Fragment } from 'react';
import { Button, Card, Typography, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
export default function Homepage() {
    const calculators = [
        { label: 'Interets composés', route: 'simulate-compound-interests' },
        { label: 'Interets simples', route: 'simulate-simple-interests' },
        { label: 'Depreciation linéaire', route: 'simulate-linear-depreciation' },
        { label: 'Depreciation linéaire selon le temps', route: 'simulate-linear-depreciation-time' },
    ]
    return (
        <Fragment>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid size={{ xs: 10, sm: 8, md: 5 }}>
                    <Card variant="outlined" style={{ padding: '16px', textAlign: 'center', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <CardContent>
                            <Grid size={{ xs: 12, md: 12 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    href='/compound-interests'
                                >
                                    Interets composés
                                </Button>
                            </Grid>
                            <Typography variant="h5" gutterBottom>
                                Calculateur de trucs en tout genres
                            </Typography>
                            <Grid container spacing={2} justifyContent="center">
                                {calculators.map((calculator, index) => (
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            href={calculator.route}
                                        >
                                            {calculator.label}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Fragment >
    );
}

import type { MerchantColorType } from '@/types/dashboard';
import { Button, Grid, Typography } from '@mui/material';

const Preview = ({ color }: { color: MerchantColorType }) => {
    return (
        <>
            <Grid container direction='column'>
                <Grid item sx={{ pb: 2 }}>
                    <Typography sx={{ color: '#0E2979', fontSize: '24px', fontWeight: 600 }}>Preview</Typography>
                </Grid>
                <Grid item>
                    <Grid container direction='column' alignItems='center' justifyContent='center'>
                        <Grid
                            item
                            sx={{ height: '60px', backgroundColor: color.primaryColor, width: '100%' }}
                            container
                            alignItems='center'
                            justifyContent='center'
                        >
                            <Typography sx={{ fontWeight: 'bold', color: color.thirdColor, fontSize: '24px' }}>
                                LOGO
                            </Typography>
                        </Grid>
                        <Grid item sx={{ mt: 20, width: '80%' }}>
                            <Grid
                                container
                                direction='column'
                                alignItems='center'
                                justifyContent='center'
                                sx={{ backgroundColor: color.primaryColor, borderRadius: '8px', p: 2 }}
                            >
                                <Grid item sx={{ pb: 2 }}>
                                    <Typography sx={{ fontWeight: 500, color: color.secondaryColor, fontSize: '20px' }}>
                                        Text
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button sx={{ backgroundColor: color.thirdColor, color: 'white' }}>Button</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ mt: 30, width: '100%' }}>
                            <Grid
                                container
                                direction='column'
                                sx={{ backgroundColor: color.secondaryColor, borderRadius: '8px', p: 2 }}
                            >
                                <Grid item sx={{ pb: 2 }}>
                                    <Typography sx={{ fontWeight: 500, color: 'white', fontSize: '20px' }}>
                                        Footer
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Preview;

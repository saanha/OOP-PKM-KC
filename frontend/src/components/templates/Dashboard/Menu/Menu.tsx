import { Button, Grid, Typography } from '@mui/material';
import { IoFastFoodOutline } from 'react-icons/io5';
import { BiFoodMenu } from 'react-icons/bi';
import { useRouter } from 'next/router';

const Menu = () => {
    const router = useRouter();

    return (
        <>
            <Grid
                container
                direction='row'
                sx={{ minHeight: '82vh' }}
                alignItems='center'
                justifyContent='center'
                spacing={2}
            >
                <Grid item xs={6}>
                    <Grid container item alignItems='center' justifyContent='center'>
                        <Button
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '24px',
                                '&:hover': {
                                    backgroundColor: 'white',
                                    opacity: 0.8
                                },
                                p: 4,
                                py: 3
                            }}
                            onClick={() => router.push('/dashboard/menu/food')}
                        >
                            <Grid container direction='column'>
                                <Grid item>
                                    <IoFastFoodOutline
                                        style={{ color: '#D9D9D9', fontWeight: 'bold' }}
                                        size={'200px'}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography sx={{ color: '#0e2979', fontWeight: 600, fontSize: '24px' }}>
                                        Food
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container item alignItems='center' justifyContent='center'>
                        <Button
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '24px',
                                '&:hover': {
                                    backgroundColor: 'white',
                                    opacity: 0.8
                                },
                                p: 4,
                                py: 3
                            }}
                            onClick={() => router.push('/dashboard/menu/category')}
                        >
                            <Grid container direction='column'>
                                <Grid item>
                                    <BiFoodMenu style={{ color: '#D9D9D9', fontWeight: 'bold' }} size={'200px'} />
                                </Grid>
                                <Typography sx={{ color: '#0e2979', fontWeight: 600, fontSize: '24px' }}>
                                    Food Category
                                </Typography>
                            </Grid>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Menu;

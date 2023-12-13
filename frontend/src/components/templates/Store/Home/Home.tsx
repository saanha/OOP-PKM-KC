import { StoreContext } from '@/contexts/StoreContext/StoreContext';
import PathRouteList from '@/helper/pathRouteList';
import { Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';

const StoreHome = () => {
    const {
        storeInfo: { config }
    } = useContext(StoreContext)!;

    const router = useRouter();
    const pathList = PathRouteList();

    return (
        <>
            <Grid container direction="column">
                <Grid
                    item
                    container
                    direction="column-reverse"
                    alignItems="center"
                    sx={{
                        backgroundImage: `url("${process.env.NEXT_PUBLIC_API_URL}/public/images/${config.homePhotoPath}?cacheblock=true")`,
                        width: '100%',
                        height: '250px',
                        backgroundSize: 'cover',
                        zIndex: 0,
                        position: 'relative'
                    }}
                >
                    <Grid
                        item
                        sx={{
                            backgroundColor: config.primaryColor,
                            top: 130,
                            position: 'absolute',
                            py: 2,
                            px: 3,
                            borderRadius: '20px',
                            width: { md: '65%', xs: '80%' }
                        }}
                    >
                        <Grid container direction="column" spacing={2} alignItems="center">
                            <Grid item>
                                <Typography
                                    sx={{
                                        color: config.secondaryColor,
                                        fontWeight: 'bold',
                                        fontSize: '20px',
                                        textAlign: 'center'
                                    }}
                                >
                                    RESERVE A TABLE
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    sx={{
                                        color: config.secondaryColor,
                                        textAlign: 'center',
                                        fontSize: '14px',
                                        fontWeight: 500
                                    }}
                                >
                                    To help us find the best table for you, please select the preferred party size and
                                    time of your reservation.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button
                                    sx={{
                                        backgroundColor: config.thirdColor,
                                        color: 'white',
                                        px: 4,
                                        '&:hover': {
                                            backgroundColor: config.thirdColor,
                                            opacity: 0.8
                                        },
                                        fontSize: '14px'
                                    }}
                                    onClick={() => router.push(`/restaurant/${pathList[1]}/rsvp`)}
                                >
                                    Find a Table
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={{ mt: 15 }}>
                    <Grid container direction="column" alignItems="center" spacing={0}>
                        <Grid item>
                            <Typography sx={{ color: config.secondaryColor, fontWeight: 'bold', fontSize: '20px' }}>
                                ABOUT US
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}/public/images/${config.aboutPhotoPath}`}
                                alt="about"
                                width="0"
                                height="0"
                                sizes="100%"
                                style={{ width: '350px', height: '100%' }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography sx={{ color: config.secondaryColor, textAlign: 'center' }}>
                                {config.aboutDescription}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default StoreHome;

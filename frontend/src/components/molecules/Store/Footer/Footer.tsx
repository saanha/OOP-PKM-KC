import { StoreContext } from '@/contexts/StoreContext/StoreContext';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useContext } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BsInstagram, BsWhatsapp } from 'react-icons/bs';

const style = {
    title: { fontWeight: 'bold', fontSize: '15px', color: 'white' },
    content: { fontWeight: 'medium', fontSize: '13px', color: 'white' }
};

const Footer = () => {
    const {
        storeInfo: { config }
    } = useContext(StoreContext)!;

    return (
        <>
            <Box component="div" sx={{ minHeight: '250px', backgroundColor: config.secondaryColor }}>
                <Grid container direction="column" justifyContent="space-between">
                    <Grid
                        item
                        container
                        direction="row"
                        sx={{ minHeight: '250px', p: 4, px: 2 }}
                        spacing={3}
                        alignItems="stretch"
                    >
                        <Grid item container direction="column" spacing={1} xs={3} alignItems="center">
                            {config.logoPhotoPath !== '' ? (
                                <Grid item>
                                    <Image
                                        width={0}
                                        height={0}
                                        sizes="100%"
                                        style={{ maxWidth: '100px', width: '100%', height: 'auto' }}
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/public/images/${config.logoPhotoPath}`}
                                        alt="logo-restoran"
                                        crossOrigin="anonymous"
                                    />
                                </Grid>
                            ) : null}
                        </Grid>
                        <Grid item container direction="column" spacing={1} xs={4}>
                            <Grid item>
                                <Typography sx={style.title}>ADDRESS</Typography>
                            </Grid>
                            <Grid item>
                                <Typography sx={style.content}>JL. Palmerah No. 103</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container direction="column" spacing={1} xs={5}>
                            <Grid item>
                                <Typography sx={style.title}>CONTACT US</Typography>
                            </Grid>
                            <Grid item container direction="column" spacing={1}>
                                <Grid item>
                                    <Typography sx={style.content}>Monday - Sunday (10.00 - 21.00)</Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="row" spacing={1}>
                                        <Grid item>
                                            <BsWhatsapp color="white" />
                                        </Grid>
                                        <Grid item>
                                            <Typography sx={style.content}>0812 3456 7890</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="row" spacing={1}>
                                        <Grid item>
                                            <BsInstagram color="white" />
                                        </Grid>
                                        <Grid item>
                                            <Typography sx={style.content}>@foodtura.id</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="row" spacing={1}>
                                        <Grid item>
                                            <AiOutlineMail color="white" />
                                        </Grid>
                                        <Grid item>
                                            <Typography sx={style.content}>foodtura@gmail.com</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sx={{ borderTop: '1px solid white', p: 1.5 }}>
                        <Typography sx={{ textAlign: 'center', color: 'white', fontSize: '10px' }}>
                            Copyright 2023 © by FOODTURA
                        </Typography>
                    </Grid>
                </Grid>
                {/* <Grid
                    container
                    direction='column'
                    sx={{ minHeight: '250px', p: 3, px: 4 }}
                    justifyContent='space-between'
                    spacing={4}
                >
                    <Grid item container direction='column' spacing={1}>
                        <Grid item>
                            <Typography sx={style.title}>ADDRESS</Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={style.content}>JL. Palmerah No. 103</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container direction='column' spacing={1}>
                        <Grid item>
                            <Typography sx={style.title}>CONTACT US</Typography>
                        </Grid>
                        <Grid item container direction='column'>
                            <Grid item>
                                <Typography sx={style.content}>Monday - Sunday (10.00 - 21.00)</Typography>
                            </Grid>
                            <Grid item>
                                <Typography sx={style.content}>0812 3456 7890 (WA)</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container direction='column' spacing={1}>
                        <Grid item>
                            <Divider sx={{ backgroundColor: 'white' }} />
                        </Grid>
                        <Grid item>
                            <Typography
                                sx={{
                                    fontSize: '12px',
                                    color: 'white'
                                }}
                            >
                                Copyright 2023 © by FOODTURA
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>*/}
            </Box>
        </>
    );
};

export default Footer;

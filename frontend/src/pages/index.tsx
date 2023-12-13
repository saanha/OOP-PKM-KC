import { Grid } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
    return (
        <>
            <Head>
                <title>Foodtura</title>
            </Head>
            <Grid container direction="column" sx={{ minHeight: '100vh' }} alignItems="center" justifyContent="center">
                <Grid item>
                    <Image
                        alt="logo"
                        src="/icon/foodtura-2.png"
                        width="0"
                        height="0"
                        sizes="100%"
                        style={{ width: 'auto', height: '100%', maxHeight: '300px' }}
                    />
                </Grid>
                <Grid item>
                    <Link href="/restaurant">Restaurant Page</Link>
                </Grid>
                <Grid item>
                    <Link href="/dashboard">Dashboard Page</Link>
                </Grid>
            </Grid>
        </>
    );
};

export default Home;

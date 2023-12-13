import Login from '@/components/templates/Dashboard/Login/Login';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>Login - Foodtura</title>
            </Head>
            <Login />
        </>
    );
};

export default Home;

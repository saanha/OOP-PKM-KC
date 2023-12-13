import StoreHome from '@/components/templates/Store/Home/Home';
import StoreLayout from '@/components/templates/Store/StoreLayout/StoreLayout';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>Home - Foodtura</title>
            </Head>
            <StoreHome />
        </>
    );
};

Home.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <>
            <StoreLayout>{page}</StoreLayout>
        </>
    );
};

export default Home;

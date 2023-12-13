import Menu from '@/components/templates/Store/Menu/Menu';
import StoreLayout from '@/components/templates/Store/StoreLayout/StoreLayout';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>Menu - Foodtura</title>
            </Head>
            <Menu />
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

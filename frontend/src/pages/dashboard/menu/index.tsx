import DashboardLayout from '@/components/templates/Dashboard/DashboardLayout/DashboardLayout';
import Menu from '@/components/templates/Dashboard/Menu/Menu';
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
            <DashboardLayout>{page}</DashboardLayout>
        </>
    );
};

export default Home;

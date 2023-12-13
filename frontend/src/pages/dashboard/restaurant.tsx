import DashboardLayout from '@/components/templates/Dashboard/DashboardLayout/DashboardLayout';
import Restaurant from '@/components/templates/Dashboard/Restaurant/Restaurant';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>Restaurant - Dashboard</title>
            </Head>
            <Restaurant />
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

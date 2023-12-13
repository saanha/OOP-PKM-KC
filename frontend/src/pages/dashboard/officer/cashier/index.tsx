import DashboardLayout from '@/components/templates/Dashboard/DashboardLayout/DashboardLayout';
import Cashier from '@/components/templates/Dashboard/Officer/Cashier';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>Cashier - Officer</title>
            </Head>
            <Cashier />
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

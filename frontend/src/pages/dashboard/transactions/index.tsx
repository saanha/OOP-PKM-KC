import DashboardLayout from '@/components/templates/Dashboard/DashboardLayout/DashboardLayout';
import Transactions from '@/components/templates/Dashboard/Transactions/Transactions';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>Transaction - Foodtura</title>
            </Head>
            <Transactions />
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

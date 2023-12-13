import DashboardLayout from '@/components/templates/Dashboard/DashboardLayout/DashboardLayout';
import ViewTransactions from '@/components/templates/Dashboard/ViewTransactions/ViewTransactions';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>View Transactions - Foodtura</title>
            </Head>
            <ViewTransactions />
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

import DashboardLayout from '@/components/templates/Dashboard/DashboardLayout/DashboardLayout';
import Table from '@/components/templates/Dashboard/Officer/Table';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>Table - Officer</title>
            </Head>
            <Table />
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

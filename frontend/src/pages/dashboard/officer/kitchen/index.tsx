import DashboardLayout from '@/components/templates/Dashboard/DashboardLayout/DashboardLayout';
import Kitchen from '@/components/templates/Dashboard/Officer/Kitchen/Kitchen';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>Kitchen - Dashboard</title>
            </Head>
            <Kitchen />
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

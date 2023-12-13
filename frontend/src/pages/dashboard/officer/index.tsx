import DashboardLayout from '@/components/templates/Dashboard/DashboardLayout/DashboardLayout';
import Officer from '@/components/templates/Dashboard/Officer/Officer';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>Officer - Dashboard</title>
            </Head>
            <Officer />
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

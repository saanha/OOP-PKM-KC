import DashboardLayout from '@/components/templates/Dashboard/DashboardLayout/DashboardLayout';
import EditFood from '@/components/templates/Dashboard/Food/EditFood/EditFood';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>Edit Food - Foodtura</title>
            </Head>
            <EditFood />
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

import AddFood from '@/components/templates/Dashboard/Food/AddFood/AddFood';
import DashboardLayout from '@/components/templates/Dashboard/DashboardLayout/DashboardLayout';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>Add Food - Foodtura</title>
            </Head>
            <AddFood />
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

import DashboardLayout from '@/components/templates/Dashboard/DashboardLayout/DashboardLayout';
import FoodMenu from '@/components/templates/Dashboard/Food/FoodMenu/FoodMenu';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>Food - Foodtura</title>
            </Head>
            <FoodMenu />
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

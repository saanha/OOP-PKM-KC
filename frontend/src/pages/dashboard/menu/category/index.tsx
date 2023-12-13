import DashboardLayout from '@/components/templates/Dashboard/DashboardLayout/DashboardLayout';
import FoodCategoryMenu from '@/components/templates/Dashboard/FoodCategory/FoodCategoryMenu/FoodCategoryMenu';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>Category - Foodtura</title>
            </Head>
            <FoodCategoryMenu />
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

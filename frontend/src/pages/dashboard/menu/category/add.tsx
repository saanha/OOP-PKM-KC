import DashboardLayout from '@/components/templates/Dashboard/DashboardLayout/DashboardLayout';
import AddFoodCategory from '@/components/templates/Dashboard/FoodCategory/AddFoodCategory/AddFoodCategory';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>Add Category - Foodtura</title>
            </Head>
            <AddFoodCategory />
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

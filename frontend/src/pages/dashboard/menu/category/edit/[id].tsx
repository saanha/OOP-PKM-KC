import DashboardLayout from '@/components/templates/Dashboard/DashboardLayout/DashboardLayout';
import EditFoodCategory from '@/components/templates/Dashboard/FoodCategory/EditFoodCategory/EditFoodCategory';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>Edit Category - Foodtura</title>
            </Head>
            <EditFoodCategory />
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

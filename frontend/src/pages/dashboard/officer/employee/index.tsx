import DashboardLayout from '@/components/templates/Dashboard/DashboardLayout/DashboardLayout';
import Employee from '@/components/templates/Dashboard/Officer/Employee';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <title>Employee - Officer</title>
            </Head>

            <Employee />
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

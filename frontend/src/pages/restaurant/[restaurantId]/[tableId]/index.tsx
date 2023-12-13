import LoadingIcon from '@/components/atoms/LoadingIcon/LoadingIcon';
import StoreLayout from '@/components/templates/Store/StoreLayout/StoreLayout';
import PathRouteList from '@/helper/pathRouteList';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
    const router = useRouter();
    const pathRouteList = PathRouteList();

    useEffect(() => {
        let mounted = true;

        if (mounted && pathRouteList[1] !== '[restaurantId]') {
            router.push({
                pathname: `/restaurant/${pathRouteList[1]}/${pathRouteList[2]}/menu`
            });
        }

        return () => {
            mounted = false;
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    return (
        <>
            <Head>
                <title>Table - Foodtura</title>
            </Head>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LoadingIcon />
            </div>
        </>
    );
};

Home.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <>
            <StoreLayout>{page}</StoreLayout>
        </>
    );
};

export default Home;

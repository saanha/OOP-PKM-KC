import { useRouter } from 'next/router';

const PathRouteList = () => {
    // Example
    // /restaurant/restaurantId/tableId/{menu or favorites or rsvp}

    const router = useRouter();
    const pathList = router.asPath.slice(1).split('/');
    return pathList;
};

export default PathRouteList;

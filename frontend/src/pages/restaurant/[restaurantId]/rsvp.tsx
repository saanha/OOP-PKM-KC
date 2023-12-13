import Rsvp from '@/components/templates/Store/Rsvp/Rsvp';
import StoreLayout from '@/components/templates/Store/StoreLayout/StoreLayout';

const Home = () => {
    return (
        <>
            <Rsvp />
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

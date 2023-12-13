import { Grid, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

import type { IOfficerFeaturedList } from '@/types/dashboard';
import { BsPeopleFill } from 'react-icons/bs';
import { TbBrandAirtable, TbToolsKitchen2 } from 'react-icons/tb';
import { FaCashRegister } from 'react-icons/fa';

function OfficerFeatureList({ props }: { props: IOfficerFeaturedList[] }) {
    const router = useRouter();
    const parrentPath = 'officer';

    function handleOnClick(path: string) {
        router.push({ pathname: parrentPath + path });
    }

    return (
        <>
            {props.map(({ name, redirectPath, icon }) => (
                <Button
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '24px',
                        '&:hover': {
                            backgroundColor: 'white',
                            opacity: 0.8
                        },
                        p: 4,
                        py: 3
                    }}
                    onClick={() => handleOnClick(redirectPath)}
                    key={name}
                >
                    <Grid container direction="column">
                        <Grid item>{icon}</Grid>
                        <Grid item>
                            <Typography sx={{ color: '#0e2979', fontWeight: 600, fontSize: '24px' }}>{name}</Typography>
                        </Grid>
                    </Grid>
                </Button>
            ))}
        </>
    );
}

const Officer = () => {
    return (
        <>
            <Grid
                container
                sx={{ minHeight: '80vh', margin: '0 auto' }}
                justifyContent="center"
                alignContent="center"
                rowGap={4}
                columnGap={4}
            >
                <OfficerFeatureList props={officerFeaturedList} />
            </Grid>
        </>
    );
};

const officerFeaturedList = [
    {
        name: 'Employees',
        redirectPath: '/employee',
        icon: <BsPeopleFill style={{ color: '#D9D9D9', fontWeight: 'bold' }} size={'200px'} />
    },
    {
        name: 'Table',
        redirectPath: '/table',
        icon: <TbBrandAirtable style={{ color: '#D9D9D9', fontWeight: 'bold' }} size={'200px'} />
    },
    {
        name: 'Cashier',
        redirectPath: '/cashier',
        icon: <FaCashRegister style={{ color: '#D9D9D9', fontWeight: 'bold' }} size={'200px'} />
    },
    {
        name: 'Kitchen',
        redirectPath: '/kitchen',
        icon: <TbToolsKitchen2 style={{ color: '#D9D9D9', fontWeight: 'bold' }} size={'200px'} />
    }
];

export default Officer;

import { StoreContext } from '@/contexts/StoreContext/StoreContext';
import { AppBar, Container, Grid, IconButton, Slide, Toolbar, useScrollTrigger } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

function HideOnScroll(props: Props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined
    });

    return (
        <Slide appear={false} direction='down' in={!trigger}>
            {children}
        </Slide>
    );
}

const NavbarRsvp = (props: any) => {
    const {
        storeInfo: { config }
    } = useContext(StoreContext)!;
    const router = useRouter();
    const { restaurantId } = router.query;
    return (
        <>
            <HideOnScroll {...props}>
                <AppBar
                    position='sticky'
                    sx={{
                        backgroundColor: config.primaryColor,
                        py: 0.5,
                        pb: 0,
                        color: 'black'
                    }}
                    elevation={0}
                >
                    <Toolbar disableGutters>
                        <Container maxWidth='xl'>
                            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                                <Grid item>
                                    <IconButton
                                        sx={{
                                            verticalAlign: 'middle',
                                            p: 0,
                                            m: 0
                                        }}
                                        onClick={() => router.push(`/restaurant/${restaurantId}`)}
                                    >
                                        <IoIosArrowBack style={{ color: config.thirdColor }} size={'28px'} />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Image
                                        alt='logo'
                                        src='/icon/foodtura.png'
                                        width='0'
                                        height='0'
                                        sizes='100%'
                                        style={{ width: 'auto', height: '100%', maxHeight: '80px' }}
                                    />
                                </Grid>
                                <Grid item />
                            </Grid>
                        </Container>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </>
    );
};

export default NavbarRsvp;

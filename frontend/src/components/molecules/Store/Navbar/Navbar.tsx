import { AppBar, Container, Grid, IconButton, Slide, Toolbar, useScrollTrigger } from '@mui/material';
import { FiMenu } from 'react-icons/fi';
import { BsCart } from 'react-icons/bs';
import { useContext } from 'react';
import { StoreContext } from '@/contexts/StoreContext/StoreContext';
import PathRouteList from '@/helper/pathRouteList';
import Image from 'next/image';

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
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const Navbar = (props: any) => {
    const { setOpenSidebar } = props;
    const {
        storeInfo: { config },
        setOpenCart
    } = useContext(StoreContext)!;
    const pathRouteList = PathRouteList();

    return (
        <>
            <div id="top" />
            <HideOnScroll {...props}>
                <AppBar
                    position="sticky"
                    sx={{
                        backgroundColor: config.primaryColor,
                        py: 0.5,
                        pb: 0,
                        color: 'black'
                    }}
                    elevation={0}
                >
                    <Toolbar disableGutters>
                        <Container maxWidth="xl">
                            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                <Grid item>
                                    <IconButton
                                        sx={{
                                            verticalAlign: 'middle',
                                            p: 0,
                                            m: 0
                                        }}
                                        onClick={() => setOpenSidebar((state: any) => !state)}
                                    >
                                        <FiMenu style={{ color: config.thirdColor }} size={'28px'} />
                                    </IconButton>
                                </Grid>
                                {pathRouteList.length !== 1 && config.logoPhotoPath !== '' ? (
                                    <Grid item>
                                        <Image
                                            alt="logo"
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/public/images/${config.logoPhotoPath}`}
                                            width="0"
                                            height="0"
                                            sizes="100%"
                                            style={{ width: 'auto', height: '100%', maxHeight: '80px' }}
                                        />
                                    </Grid>
                                ) : null}
                                {pathRouteList.length > 2 ? (
                                    <Grid item>
                                        <IconButton
                                            sx={{
                                                verticalAlign: 'middle',
                                                p: 0,
                                                m: 0
                                            }}
                                            onClick={() => setOpenCart(() => true)}
                                        >
                                            <BsCart style={{ color: config.thirdColor }} size={'28px'} />
                                        </IconButton>
                                    </Grid>
                                ) : (
                                    <Grid item />
                                )}
                            </Grid>
                        </Container>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </>
    );
};

export default Navbar;

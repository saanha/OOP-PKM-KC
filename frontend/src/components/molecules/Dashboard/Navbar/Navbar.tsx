import { DashboardContext } from '@/contexts/DashboardContext/DashboardContext';
import PathRouteList from '@/helper/pathRouteList';
import { Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { GoChevronDown } from 'react-icons/go';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { logout, userData } = useContext(DashboardContext)!;
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const pathList = PathRouteList();

    return (
        <>
            <Grid
                container
                direction='row'
                sx={{ height: '90px', borderBottom: '1px solid black', p: 2, px: 4 }}
                alignItems='center'
                justifyContent='space-between'
            >
                <Grid item>
                    <Typography
                        sx={{
                            color: '#0E2979',
                            fontWeight: 600,
                            fontSize: { md: '28px', xs: '24px' },
                            textTransform: 'capitalize'
                        }}
                    >
                        {pathList[1]}
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container direction='row' spacing={0} alignItems={'center'}>
                        <Grid item>
                            <Typography sx={{ fontWeight: 'bold' }}>Hi, {userData?.name}</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={(e) => handleClick(e)}>
                                <GoChevronDown />
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{ outline: 0 }}>
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Navbar;

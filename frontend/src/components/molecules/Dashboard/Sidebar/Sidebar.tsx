import { Drawer, Grid } from '@mui/material';
import Image from 'next/image';
import { IoRestaurantOutline } from 'react-icons/io5';
import { MdFastfood } from 'react-icons/md';
import { HiOfficeBuilding } from 'react-icons/hi';
import { TbReportMoney } from 'react-icons/tb';
import SidebarButton from '@/components/atoms/Dashboard/SidebarButton/SidebarButton';
import { type ReactNode } from 'react';

const drawerWidth = 240;

const SidebarList: { name: string; url: string; icon: ReactNode }[] = [
    {
        name: 'Restaurant',
        url: '/dashboard/restaurant',
        icon: (
            <IoRestaurantOutline
                style={{
                    fontSize: '64px',
                    color: 'white',
                    backgroundColor: '#6D88DB',
                    borderRadius: '50%',
                    padding: 12
                }}
            />
        )
    },
    {
        name: 'Menu',
        url: '/dashboard/menu',
        icon: (
            <MdFastfood
                style={{
                    fontSize: '64px',
                    color: 'white',
                    backgroundColor: '#6D88DB',
                    borderRadius: '50%',
                    padding: 12
                }}
            />
        )
    },
    {
        name: 'Officer',
        url: '/dashboard/officer',
        icon: (
            <HiOfficeBuilding
                style={{
                    fontSize: '64px',
                    color: 'white',
                    backgroundColor: '#6D88DB',
                    borderRadius: '50%',
                    padding: 12
                }}
            />
        )
    },
    {
        name: 'Transaction',
        url: '/dashboard/transactions',
        icon: (
            <TbReportMoney
                style={{
                    fontSize: '64px',
                    color: 'white',
                    backgroundColor: '#6D88DB',
                    borderRadius: '50%',
                    padding: 12
                }}
            />
        )
    }
];

const Sidebar = () => {
    return (
        <>
            <Drawer
                variant='permanent'
                anchor='left'
                sx={{
                    width: `${drawerWidth}px`,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        backgroundColor: 'white',
                        width: `${drawerWidth}px`,
                        boxSizing: 'border-box',
                        border: 0,
                        borderRadius: '0px 48px 48px 0px'
                    }
                }}
                elevation={0}
            >
                <Grid
                    container
                    direction='column'
                    sx={{ py: 0.5, minHeight: '100vh' }}
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Grid item>
                        <Grid container justifyContent='center'>
                            <Image
                                src='/icon/foodtura.png'
                                alt='logo'
                                width={0}
                                height={0}
                                sizes='100%'
                                style={{ height: '100%', maxHeight: '100px', width: 'auto' }}
                            />
                        </Grid>
                    </Grid>
                    {SidebarList.map((data, index) => {
                        return (
                            <Grid item key={index}>
                                <SidebarButton data={data} />
                            </Grid>
                        );
                    })}
                    <Grid item></Grid>
                </Grid>
            </Drawer>
        </>
    );
};

export default Sidebar;

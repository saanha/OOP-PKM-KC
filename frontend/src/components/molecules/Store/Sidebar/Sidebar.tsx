// import SidebarButton from '@/components/atoms/Sidebar/Button/SidebarButton';
import type { SidebarButtonType } from '@/components/atoms/Store/Sidebar/Button/SidebarButton';
import SidebarButton from '@/components/atoms/Store/Sidebar/Button/SidebarButton';
import SidebarButtonList from '@/components/constants/Sidebar/SidebarButtonList';
import { StoreContext } from '@/contexts/StoreContext/StoreContext';
import PathRouteList from '@/helper/pathRouteList';
import { Drawer, Grid, IconButton, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

interface SidebarType {
    open: boolean;
    setOpen: (param: any) => void;
}

const Sidebar: React.FC<SidebarType> = ({ open, setOpen }) => {
    const {
        storeInfo: { config }
    } = useContext(StoreContext)!;
    const sidebarButtonList = SidebarButtonList() as SidebarButtonType[];
    const pathList = PathRouteList();

    return (
        <>
            <Drawer
                open={open}
                onClose={() => setOpen((state: any) => !state)}
                anchor='left'
                sx={{
                    width: '240px',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        backgroundColor: config.primaryColor,
                        width: '240px',
                        boxSizing: 'border-box',
                        border: 0,
                        p: 2
                    }
                }}
                elevation={0}
            >
                <Grid container direction='column' spacing={2}>
                    <Grid item>
                        <IconButton
                            sx={{ m: 0, p: 0, verticalAlign: 'middle' }}
                            onClick={() => setOpen((state: boolean) => !state)}
                        >
                            <IoIosArrowBack style={{ color: config.thirdColor }} size={'28px'} />
                        </IconButton>
                    </Grid>
                    {pathList.length <= 1 ? (
                        <Grid item>
                            <Typography
                                sx={{
                                    color: config.secondaryColor,
                                    fontSize: '16px',
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}
                            >
                                Please scan QR Code in table
                            </Typography>
                        </Grid>
                    ) : (
                        <Grid item container direction='column' spacing={1}>
                            {sidebarButtonList.map((data, index) => {
                                if (data.render === false) return;
                                return (
                                    <Grid item key={index}>
                                        <SidebarButton data={data} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                </Grid>
            </Drawer>
        </>
    );
};

export default Sidebar;

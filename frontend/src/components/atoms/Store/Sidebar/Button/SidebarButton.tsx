import { StoreContext } from '@/contexts/StoreContext/StoreContext';
import { Button, Grid, Typography } from '@mui/material';
import { useContext } from 'react';

interface SidebarButtonType {
    title: string;
    icon: React.ReactNode;
    active: boolean;
    onClick: () => void;
    render?: boolean;
}

const SidebarButton = ({ data }: { data: SidebarButtonType }) => {
    const {
        storeInfo: { config }
    } = useContext(StoreContext)!;

    return (
        <>
            <Button
                sx={{
                    width: '100%',
                    px: 0,
                    m: 0,
                    py: 1,
                    backgroundColor: data.active ? 'white' : 'transparent',
                    borderRadius: '16px'
                }}
                onClick={data.onClick}
            >
                <Grid container alignItems='center'>
                    <Grid item sx={{ ml: 0.4, mr: 1 }}>
                        {data.icon}
                    </Grid>
                    <Grid item>
                        <Typography
                            sx={{
                                verticalAlign: 'middle',
                                color: config.thirdColor,
                                fontWeight: 600,
                                fontSize: '16px'
                            }}
                        >
                            {data.title}
                        </Typography>
                    </Grid>
                </Grid>
            </Button>
        </>
    );
};

export type { SidebarButtonType };
export default SidebarButton;

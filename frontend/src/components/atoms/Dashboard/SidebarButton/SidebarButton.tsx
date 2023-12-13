import PathRouteList from '@/helper/pathRouteList';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

const SidebarButton = ({ data }: { data: { name: string; url: string; icon: ReactNode } }) => {
    const pathList = PathRouteList();
    const active = pathList[1] === data.url.split('/')[2];
    const router = useRouter();

    return (
        <>
            <Button
                sx={{
                    border: '1px solid #E1DEE5',
                    borderRadius: '20px',
                    width: '130px',
                    height: '130px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    backgroundColor: active ? '#0E2979' : '',
                    color: active ? 'white' : '#6A6262',
                    '&:hover': {
                        backgroundColor: active ? '#0E2979' : '',
                        color: active ? 'white' : '#6A6262',
                        opacity: 0.8
                    },
                    transition: '0.3s all',
                    textTransform: 'none'
                }}
                onClick={() => router.push(data.url)}
            >
                {data.icon}
                <Typography>{data.name}</Typography>
            </Button>
        </>
    );
};

export default SidebarButton;

import Uploader from '@/components/atoms/Dashboard/Uploader/Uploader';
import type { MerchantType } from '@/types/dashboard';
import { Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';

const HomeRestaurant = ({
    src,
    blobHome,
    setBlobHome,
    setMerchant
}: {
    src: string | null;
    blobHome: any;
    setBlobHome: Dispatch<SetStateAction<any>>;
    setMerchant: Dispatch<SetStateAction<MerchantType>>;
}) => {
    return (
        <>
            <Grid container direction="column" justifyContent="space-between" sx={{ p: 2 }}>
                <Grid item sx={{ pb: 2 }}>
                    <Typography sx={{ color: '#0E2979', fontSize: '24px', fontWeight: 600 }}>Home</Typography>
                </Grid>
                <Grid item>
                    {src === null && blobHome === null ? (
                        <Uploader
                            title="Drag your home photo here"
                            functionUpload={(base64: any, blob: any) => {
                                setBlobHome(() => blob);
                                console.log('test');
                            }}
                            id="homeUploader"
                            height="150px"
                        />
                    ) : (
                        <Grid container alignItems="center" justifyContent="center" direction="column">
                            <Grid item>
                                <Image
                                    src={
                                        src === null
                                            ? URL.createObjectURL(blobHome)
                                            : `${process.env.NEXT_PUBLIC_API_URL}/public/images/${src}`
                                    }
                                    crossOrigin="anonymous"
                                    alt="logo"
                                    sizes="100%"
                                    width={0}
                                    height={0}
                                    style={{
                                        maxHeight: '120px',
                                        height: '100%',
                                        width: '100%'
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    onClick={() => {
                                        if (blobHome !== null) {
                                            setBlobHome(() => null);
                                        }
                                        if (src !== null) {
                                            setMerchant((state) => ({
                                                ...state,
                                                config: { ...state.config, homePhotoPath: null }
                                            }));
                                        }
                                    }}
                                    sx={{ height: '20px', m: 0, p: 0 }}
                                >
                                    Remove Image
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default HomeRestaurant;

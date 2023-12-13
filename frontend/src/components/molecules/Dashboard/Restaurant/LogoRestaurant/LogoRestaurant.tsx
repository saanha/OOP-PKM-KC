import Uploader from '@/components/atoms/Dashboard/Uploader/Uploader';
import type { MerchantType } from '@/types/dashboard';
import { Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';

const LogoRestaurant = ({
    src,
    blobLogo,
    setBlobLogo,
    setMerchant
}: {
    src: string | null;
    blobLogo: any;
    setBlobLogo: Dispatch<SetStateAction<any>>;
    setMerchant: Dispatch<SetStateAction<MerchantType>>;
}) => {
    return (
        <>
            <Grid container direction="column" justifyContent="space-between" sx={{ p: 2 }}>
                <Grid item sx={{ pb: 2 }}>
                    <Typography sx={{ color: '#0E2979', fontSize: '24px', fontWeight: 600 }}>Logo</Typography>
                </Grid>
                <Grid item>
                    {src === null && blobLogo === null ? (
                        <Uploader
                            title="Drag your logo photo here"
                            functionUpload={(base64: any, blob: any) => {
                                setBlobLogo(() => blob);
                                console.log('test');
                            }}
                            id="logoUploader"
                            height="150px"
                        />
                    ) : (
                        <Grid container alignItems="center" justifyContent="center" direction="column">
                            <Grid item>
                                <Image
                                    src={
                                        src === null
                                            ? URL.createObjectURL(blobLogo)
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
                                        if (blobLogo !== null) {
                                            setBlobLogo(() => null);
                                        }
                                        if (src !== null) {
                                            setMerchant((state) => ({
                                                ...state,
                                                config: { ...state.config, logoPhotoPath: null }
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

export default LogoRestaurant;

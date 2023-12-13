import Uploader from '@/components/atoms/Dashboard/Uploader/Uploader';
import type { MerchantType } from '@/types/dashboard';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';

const AboutRestaurant = ({
    description,
    src,
    blobAbout,
    setBlobAbout,
    setMerchant
}: {
    description: string | null;
    src: string | null;
    blobAbout: any;
    setBlobAbout: Dispatch<SetStateAction<any>>;
    setMerchant: Dispatch<SetStateAction<MerchantType>>;
}) => {
    return (
        <>
            <Grid container direction="column" justifyContent="space-between" sx={{ p: 2 }}>
                <Grid item sx={{ pb: 2 }}>
                    <Typography sx={{ color: '#0E2979', fontSize: '24px', fontWeight: 600 }}>About</Typography>
                </Grid>
                <Grid item>
                    <Grid container direction="row" justifyContent="space-around" spacing={2}>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                multiline
                                rows={7}
                                defaultValue={description === null ? '' : description}
                                onChange={(e) => {
                                    setMerchant((state) => ({
                                        ...state,
                                        config: { ...state.config, aboutDescription: e.target.value }
                                    }));
                                }}
                            />
                        </Grid>
                        <Grid item xs>
                            <Grid container justifyContent="center" alignItems="center">
                                <Grid item>
                                    {src === null && blobAbout === null ? (
                                        <Uploader
                                            title="Drag your about photo here"
                                            functionUpload={(base64: any, blob: any) => {
                                                setBlobAbout(() => blob);
                                                console.log('test2');
                                            }}
                                            id="aboutUploader"
                                            height="195px"
                                        />
                                    ) : (
                                        <Grid
                                            container
                                            alignItems="center"
                                            justifyContent="center"
                                            direction="column"
                                            // spacing={2}
                                        >
                                            <Grid item>
                                                <Image
                                                    src={
                                                        src === null
                                                            ? URL.createObjectURL(blobAbout)
                                                            : `${process.env.NEXT_PUBLIC_API_URL}/public/images/${src}`
                                                    }
                                                    crossOrigin="anonymous"
                                                    alt="logo"
                                                    sizes="100%"
                                                    width={0}
                                                    height={0}
                                                    style={{
                                                        height: '100%',
                                                        width: '100%',
                                                        maxHeight: '170px'
                                                    }}
                                                    unoptimized={true}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    onClick={() => {
                                                        if (blobAbout !== null) {
                                                            setBlobAbout(() => null);
                                                        }
                                                        if (src !== null) {
                                                            setMerchant((state) => ({
                                                                ...state,
                                                                config: { ...state.config, aboutPhotoPath: null }
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
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item />
            </Grid>
        </>
    );
};
export default AboutRestaurant;

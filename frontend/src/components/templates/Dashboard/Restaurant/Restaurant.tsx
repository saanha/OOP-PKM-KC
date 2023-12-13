import api from '@/api/axios-instance';
import ToastError from '@/components/atoms/Toast/ToastError';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import AboutRestaurant from '@/components/molecules/Dashboard/Restaurant/AboutRestaurant/AboutRestaurant';
import EditColor from '@/components/molecules/Dashboard/Restaurant/EditColor/EditColor';
import HomeRestaurant from '@/components/molecules/Dashboard/Restaurant/HomeRestaurant/HomeRestaurant';
import LogoRestaurant from '@/components/molecules/Dashboard/Restaurant/LogoRestaurant/LogoRestaurant';
import Preview from '@/components/molecules/Dashboard/Restaurant/Preview/Preview';
import { DashboardContext } from '@/contexts/DashboardContext/DashboardContext';
import type { MerchantType } from '@/types/dashboard';
import { Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const Restaurant = () => {
    const [merchant, setMerchant] = useState<MerchantType>({
        merchantId: '',
        name: '',
        address: '',
        merchantUrl: '',
        config: {
            merchantConfigId: -1,
            primaryColor: null,
            secondaryColor: null,
            thirdColor: null,
            logoPhotoPath: null,
            homePhotoPath: null,
            aboutPhotoPath: '',
            aboutDescription: null
        }
    });
    const [blobLogo, setBlobLogo] = useState<any>(null);
    const [blobHome, setBlobHome] = useState<any>(null);
    const [blobAbout, setBlobAbout] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const { userData } = useContext(DashboardContext)!;

    useEffect(() => {
        if (userData?.merchant?.merchantId !== '') {
            getConfig();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    const getConfig = async () => {
        try {
            const response = await api.get(`/merchant/get/${userData?.merchant?.merchantId}`);
            if (response) {
                console.log(response);
                setMerchant(response.data.data.merchant);
                setLoading(() => false);
            }
        } catch (e) {
            ToastError('Server Error!');
        }
    };

    const updateMerchantConfig = async () => {
        try {
            if (
                (blobLogo === null && merchant.config.logoPhotoPath === null) ||
                (blobHome === null && merchant.config.homePhotoPath === null) ||
                (blobAbout === null && merchant.config.aboutPhotoPath === null)
            ) {
                ToastError('Photo cant be empty!');
                return;
            }

            const formData: any = new FormData();
            formData.append('primaryColor', merchant.config.primaryColor);
            formData.append('secondaryColor', merchant.config.secondaryColor);
            formData.append('thirdColor', merchant.config.thirdColor);
            formData.append('aboutDescription', merchant.config.aboutDescription);

            if (blobLogo !== null) {
                if (merchant.config.logoPhotoPath !== null) {
                    formData.append('logoImage', blobLogo, merchant.config.logoPhotoPath);
                } else {
                    formData.append('logoImage', blobLogo);
                }
            }

            if (blobHome !== null) {
                if (merchant.config.homePhotoPath !== null) {
                    formData.append('homeImage', blobHome, merchant.config.homePhotoPath);
                } else {
                    formData.append('homeImage', blobHome);
                }
            }

            if (blobAbout !== null) {
                if (merchant.config.aboutPhotoPath !== null) {
                    formData.append('aboutImage', blobAbout, merchant.config.aboutPhotoPath);
                } else {
                    formData.append('aboutImage', blobAbout);
                }
            }

            const response = await api.post(`/merchant/config/${userData?.merchant?.merchantId}`, formData);
            if (response) {
                console.log(response);
                ToastSuccess('Merchant Appearances saved!');
                router.reload();
            }
        } catch (e) {
            console.log(e);
            ToastError('Server Error!');
        }
    };

    return (
        <>
            {loading ? null : (
                <Grid container direction="row" sx={{ minHeight: '80vh' }} justifyContent="space-between">
                    <Grid item xs md sm>
                        <Grid
                            container
                            direction="column"
                            justifyContent="space-between"
                            sx={{ minHeight: '80vh' }}
                            spacing={2}
                        >
                            <Grid item>
                                <div style={{ backgroundColor: 'white', borderRadius: '24px' }}>
                                    <EditColor
                                        color={{
                                            primaryColor: merchant.config.primaryColor,
                                            secondaryColor: merchant.config.secondaryColor,
                                            thirdColor: merchant.config.thirdColor
                                        }}
                                        setMerchant={setMerchant}
                                    />
                                </div>
                            </Grid>
                            <Grid item>
                                <div style={{ backgroundColor: 'white', borderRadius: '24px' }}>
                                    <AboutRestaurant
                                        description={merchant.config.aboutDescription}
                                        blobAbout={blobAbout}
                                        setBlobAbout={setBlobAbout}
                                        src={merchant.config.aboutPhotoPath}
                                        setMerchant={setMerchant}
                                    />
                                </div>
                            </Grid>
                            <Grid item container spacing={2} sx={{ height: '100%' }} direction="row">
                                <Grid item md={6} xs={12} sx={{ height: '100%' }}>
                                    <div style={{ backgroundColor: 'white', borderRadius: '24px', height: '100%' }}>
                                        <LogoRestaurant
                                            blobLogo={blobLogo}
                                            setBlobLogo={setBlobLogo}
                                            src={merchant.config.logoPhotoPath}
                                            setMerchant={setMerchant}
                                        />
                                    </div>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <div style={{ backgroundColor: 'white', borderRadius: '24px' }}>
                                        <HomeRestaurant
                                            blobHome={blobHome}
                                            setBlobHome={setBlobHome}
                                            src={merchant.config.homePhotoPath}
                                            setMerchant={setMerchant}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Button
                                    fullWidth
                                    sx={{
                                        width: '100%',
                                        backgroundColor: '#0E2979',
                                        color: 'white',
                                        textTransform: 'none',
                                        borderRadius: '8px',
                                        '&:hover': {
                                            backgroundColor: '#0E2979',
                                            opacity: 0.8
                                        },
                                        transition: '0.3s all'
                                    }}
                                    onClick={updateMerchantConfig}
                                >
                                    Save Appearances
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            display: { xs: 'none', sm: 'none', md: 'flex' },
                            backgroundColor: 'white',
                            borderRadius: '24px',
                            width: '350px',
                            ml: 2,
                            p: 2
                        }}
                    >
                        <Preview
                            color={{
                                primaryColor: merchant.config.primaryColor,
                                secondaryColor: merchant.config.secondaryColor,
                                thirdColor: merchant.config.thirdColor
                            }}
                        />
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default Restaurant;

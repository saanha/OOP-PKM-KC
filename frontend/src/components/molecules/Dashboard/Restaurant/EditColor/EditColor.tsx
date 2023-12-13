import EditColorButton from '@/components/atoms/Dashboard/EditColorButton/EditColorButton';
import type { MerchantColorType, MerchantType } from '@/types/dashboard';
import { Grid, Typography } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';

const EditColor = ({
    color,
    setMerchant
}: {
    color: MerchantColorType;
    setMerchant: Dispatch<SetStateAction<MerchantType>>;
}) => {
    return (
        <>
            <Grid container direction="column" justifyContent="space-between" sx={{ minHeight: '230px', p: 2 }}>
                <Grid item>
                    <Typography sx={{ color: '#0E2979', fontSize: '24px', fontWeight: 600 }}>Color</Typography>
                </Grid>
                <Grid item>
                    <Grid container direction="row" justifyContent="space-around" alignItems="center">
                        <Grid item>
                            <EditColorButton
                                title="Primary Color"
                                colorInit={color.primaryColor}
                                setNewColor={(newColor: string) =>
                                    setMerchant((state) => ({
                                        ...state,
                                        config: { ...state.config, primaryColor: newColor }
                                    }))
                                }
                            />
                        </Grid>
                        <Grid item>
                            <EditColorButton
                                title="Secondary Color"
                                colorInit={color.secondaryColor}
                                setNewColor={(newColor: string) =>
                                    setMerchant((state) => ({
                                        ...state,
                                        config: { ...state.config, secondaryColor: newColor }
                                    }))
                                }
                            />
                        </Grid>
                        <Grid item>
                            <EditColorButton
                                title="Third Color"
                                colorInit={color.thirdColor}
                                setNewColor={(newColor: string) =>
                                    setMerchant((state) => ({
                                        ...state,
                                        config: { ...state.config, thirdColor: newColor }
                                    }))
                                }
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item />
            </Grid>
        </>
    );
};

export default EditColor;

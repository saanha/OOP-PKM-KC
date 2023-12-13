import hexToRgbA from '@/helper/hexToRGBA';
import type { ColorContextType, FoodType } from '@/types/store';
import { Box, Grid, Typography } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';
import { GiChiliPepper } from 'react-icons/gi';
import { CiHeart } from 'react-icons/ci';
import Image from 'next/image';

const FoodMenu = ({
    data,
    setSelectedMenu,
    setOpenModal,
    color
}: {
    data: FoodType;
    setSelectedMenu: Dispatch<SetStateAction<FoodType>>;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    color: ColorContextType;
}) => {
    return (
        <>
            <Box
                component="div"
                onClick={() => {
                    setSelectedMenu(() => data);
                    setOpenModal(() => true);
                }}
                sx={{ display: 'flex', width: '100%' }}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        backgroundColor: hexToRgbA(color.primary, '0.3'),
                        p: 2,
                        '&:hover': {
                            cursor: 'pointer'
                        },
                        border: `2px solid ${color.secondary}`,
                        boxShadow: `2px 2px 2px ${color.secondary}`,
                        borderRadius: '5px'
                    }}
                >
                    <Grid item>
                        <Image
                            priority={true}
                            sizes="100%"
                            alt="logo"
                            width={0}
                            height={0}
                            src={`${process.env.NEXT_PUBLIC_API_URL}/public/images/${data.foodPhotoPath}`}
                            crossOrigin="anonymous"
                            style={{
                                height: '80px',
                                width: '80px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} sm={8}>
                        <Grid container direction="column" sx={{ width: '100%' }}>
                            <Grid item>
                                <Grid container direction="row" spacing={1} alignItems="center">
                                    <Grid item>
                                        <Typography
                                            sx={{
                                                color: color.third,
                                                fontWeight: 600
                                            }}
                                        >
                                            {data.name}
                                        </Typography>
                                    </Grid>
                                    {data.isSpicy === true ? (
                                        <Grid item>
                                            <GiChiliPepper style={{ fontSize: '20px' }} />
                                        </Grid>
                                    ) : null}
                                    {data.isMerchantFavorite === true ? (
                                        <Grid item>
                                            <CiHeart style={{ fontSize: '20px' }} />
                                        </Grid>
                                    ) : null}
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography
                                    sx={{
                                        color: color.third,
                                        fontWeight: 300,
                                        fontSize: '13px',
                                        width: '100%'
                                    }}
                                >
                                    {data.description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2} sm={1}>
                        <Typography
                            sx={{
                                color: color.third,
                                fontWeight: 'bold'
                            }}
                        >
                            {data.price / 1000}K
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default FoodMenu;

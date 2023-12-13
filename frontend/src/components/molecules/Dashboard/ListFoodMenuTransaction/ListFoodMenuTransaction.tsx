import { Grid, Typography } from '@mui/material';
import { CiHeart } from 'react-icons/ci';
import { GiChiliPepper } from 'react-icons/gi';
import Image from 'next/image';
import type { TransactionItem } from '@/types/store';

const ListFoodMenuTransaction = ({ data }: { data: TransactionItem }) => {
    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    p: 2,
                    borderRadius: '5px',
                    backgroundColor: 'white'
                }}
            >
                <Grid item>
                    <Grid container direction="row" alignItems="center" spacing={2}>
                        <Grid item>
                            <Image
                                priority={true}
                                width={0}
                                height={0}
                                sizes="100%"
                                src={`${process.env.NEXT_PUBLIC_API_URL}/public/images/${data.food.foodPhotoPath}`}
                                style={{
                                    height: '100px',
                                    width: '100px',
                                    borderRadius: '50%',
                                    backgroundColor: 'gray',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    aspectRatio: 1
                                }}
                                crossOrigin="anonymous"
                                alt="food-img"
                            />
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" sx={{ width: '100%' }}>
                                <Grid item>
                                    <Grid container direction="row" spacing={1} alignItems="center">
                                        <Grid item>
                                            <Typography
                                                sx={{
                                                    fontWeight: 700,
                                                    color: '#6A6262',
                                                    fontSize: '20px'
                                                }}
                                            >
                                                {data.food.name}
                                            </Typography>
                                        </Grid>
                                        {data.food.isSpicy === true ? (
                                            <Grid item>
                                                <GiChiliPepper style={{ fontSize: '20px' }} />
                                            </Grid>
                                        ) : null}
                                        {data.food.isMerchantFavorite === true ? (
                                            <Grid item>
                                                <CiHeart style={{ fontSize: '20px' }} />
                                            </Grid>
                                        ) : null}
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '16px',
                                            width: '100%',
                                            color: '#6A6262'
                                        }}
                                    >
                                        {data.food.description}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            fontWeight: 300,
                                            fontSize: '13px',
                                            width: '100%'
                                        }}
                                    >
                                        {data.food.foodCategory?.name}
                                    </Typography>
                                </Grid>
                                {data.notes ? (
                                    <Grid item>
                                        <Typography
                                            sx={{
                                                fontWeight: 300,
                                                fontSize: '13px',
                                                width: '100%'
                                            }}
                                        >
                                            Notes: {data.notes}
                                        </Typography>
                                    </Grid>
                                ) : null}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container direction="row" spacing={2} alignItems="center">
                        <Grid item>
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}
                            >
                                2 x Rp{data.food.price} <br />
                                Rp{data.price}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default ListFoodMenuTransaction;

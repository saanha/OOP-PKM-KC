import type { FoodType } from '@/types/dashboard';
import { Grid, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { CiHeart } from 'react-icons/ci';
import { GiChiliPepper } from 'react-icons/gi';
import { MdEdit } from 'react-icons/md';
import DeleteFoodModal from '../DeleteFoodModal/DeleteFoodModal';
import Image from 'next/image';

const ListFoodMenu = ({ data }: { data: FoodType }) => {
    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const router = useRouter();

    return (
        <>
            <DeleteFoodModal open={deleteModal} setOpen={setDeleteModal} data={data} />
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
                                src={`${process.env.NEXT_PUBLIC_API_URL}/public/images/${data.foodPhotoPath}`}
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
                                            fontWeight: 500,
                                            fontSize: '16px',
                                            width: '100%',
                                            color: '#6A6262'
                                        }}
                                    >
                                        {data.description}
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
                                        {data.foodCategory?.name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container direction="row" spacing={2} alignItems="center">
                        <Grid item>
                            <Typography
                                sx={{
                                    fontWeight: 'bold'
                                }}
                            >
                                Rp{data.price}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                <Grid item>
                                    <IconButton onClick={() => router.push(`/dashboard/menu/food/edit/${data.foodId}`)}>
                                        <MdEdit color="#32CD32" />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={() => setDeleteModal(() => true)}>
                                        <AiFillDelete color="#C70000" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default ListFoodMenu;

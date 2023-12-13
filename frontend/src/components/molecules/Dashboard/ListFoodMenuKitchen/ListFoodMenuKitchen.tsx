import { Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import type { TransactionItem } from '@/types/store';
import ToastError from '@/components/atoms/Toast/ToastError';
import api from '@/api/axios-instance';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';

const ListFoodMenuKitchen = ({
    data,
    getTransactionItem
}: {
    data: TransactionItem;
    getTransactionItem: () => void;
}) => {
    const editTransactionItem = async () => {
        try {
            const response = await api.put(`/transaction/transactionitem/edit/${data.transactionItemId}`, {
                isCooked: true
            });
            if (response) {
                console.log(response);
                ToastSuccess('Food status is changed to cooked!');
                await getTransactionItem();
            }
        } catch (e) {
            console.log(e);
            ToastError('Server Error!');
        }
    };

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
                                                {data.quantity} pcs of {data.food.name} -{' '}
                                                {data.transaction?.tableMerchant?.name}
                                            </Typography>
                                        </Grid>
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
                                                fontWeight: 500,
                                                fontSize: '14px',
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
                            <Button
                                sx={{
                                    backgroundColor: '#32cd32',
                                    color: 'white',
                                    px: 2,
                                    '&:hover': {
                                        backgroundColor: '#32cd32',
                                        opacity: 0.8
                                    },
                                    transition: '0.3s all'
                                }}
                                onClick={editTransactionItem}
                            >
                                Food Cooked
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default ListFoodMenuKitchen;

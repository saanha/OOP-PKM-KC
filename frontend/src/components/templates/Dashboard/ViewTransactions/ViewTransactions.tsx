/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import api from '@/api/axios-instance';
import ToastError from '@/components/atoms/Toast/ToastError';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import ListFoodMenuTransaction from '@/components/molecules/Dashboard/ListFoodMenuTransaction/ListFoodMenuTransaction';
import type { FoodCartType, TransactionItem, TransactionType } from '@/types/store';
import { Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ViewTransactions = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [transaction, setTransaction] = useState<TransactionType | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            getTransactions();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const getTransactions = async () => {
        try {
            const response = await api.get(`/transaction/get/${id}`);
            if (response) {
                setTransaction(() => response.data.data.transaction);
                setLoading(() => false);
            }
        } catch (e) {
            console.log(e);
            ToastError('Server Error!');
        }
    };

    const editTransactions = async (status: number) => {
        try {
            const totalPrice = countAllHarga(transaction?.transactionItem!);
            const response = await api.put(`/transaction/edit/${id}`, { status, totalPrice });
            if (response) {
                console.log(response);
                ToastSuccess('Transaction Updated!');
                router.push('/dashboard/officer/cashier');
            }
        } catch (e) {
            console.log(e);
            ToastError('Server Error!');
        }
    };

    const returnStatus = (status: number) => {
        if (status === 0) {
            return 'Not Completed';
        }
        if (status === 1) {
            return 'Completed';
        }
        if (status === 2) {
            return 'Cancelled';
        }
    };

    const countAllHarga = (cart: FoodCartType[] | TransactionItem[]) => {
        let total = 0;
        cart.map((data) => {
            total += data.price;
        });
        return total;
    };

    return (
        <>
            {loading ? null : (
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Grid container direction="row" justifyContent="space-between">
                            <Grid item>
                                <Typography sx={{ fontSize: '24px' }}>
                                    Transaction ID: {transaction?.transactionId}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography sx={{ fontSize: '24px' }}>
                                    {new Date(transaction?.createdAt!).toLocaleString()}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" spacing={2}>
                            {transaction!.transactionItem.map((data, index) => {
                                return (
                                    <Grid item key={index}>
                                        <ListFoodMenuTransaction data={data} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="center" justifyContent="center">
                            <Grid item>
                                <Typography sx={{ fontSize: '24px' }}>
                                    Grand Total Rp{countAllHarga(transaction?.transactionItem!)}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography sx={{ fontSize: '24px' }}>
                                    Transaction Status: {returnStatus(transaction?.status!)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    {transaction?.status === 0 ? (
                        <Grid item>
                            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                                <Grid item>
                                    <Button
                                        sx={{
                                            backgroundColor: '#32cd32',
                                            color: 'white',
                                            px: 4,
                                            '&:hover': {
                                                backgroundColor: '#32cd32',
                                                opacity: 0.8
                                            }
                                        }}
                                        onClick={() => editTransactions(1)}
                                    >
                                        Complete Transaction
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        sx={{
                                            backgroundColor: '#c70000',
                                            color: 'white',
                                            px: 4,
                                            '&:hover': {
                                                backgroundColor: '#c70000',
                                                opacity: 0.8
                                            }
                                        }}
                                        onClick={() => editTransactions(2)}
                                    >
                                        Cancel Transaction
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : null}
                </Grid>
            )}
        </>
    );
};

export default ViewTransactions;

import api from '@/api/axios-instance';
import { DashboardContext } from '@/contexts/DashboardContext/DashboardContext';
import type { TransactionType } from '@/types/store';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const Transactions = () => {
    const { userData } = useContext(DashboardContext)!;
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const getTransactions = async () => {
        try {
            const response = await api.get(`/transaction/${userData?.merchant?.merchantId}`);
            if (response) {
                setTransactions(() => response.data.data.transactions);
                setLoading(() => false);
            }
        } catch (e) {
            console.log(e);
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

    useEffect(() => {
        getTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Grid container direction="column">
                <Grid item>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Transaction ID</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Total Price</TableCell>
                                    <TableCell>Created at</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? null : (
                                    <>
                                        {transactions
                                            ?.filter((row) => row.status !== 0)
                                            .map((row, index) => {
                                                return (
                                                    <TableRow
                                                        key={index}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell>{row.transactionId}</TableCell>
                                                        <TableCell>{returnStatus(row.status)}</TableCell>
                                                        <TableCell>
                                                            {row.totalPrice === null ? (
                                                                returnStatus(row.status)
                                                            ) : (
                                                                <>{row.totalPrice / 1000}K</>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {new Date(row.createdAt).toLocaleString()}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                onClick={() =>
                                                                    router.push(
                                                                        `/dashboard/transactions/${row.transactionId}`
                                                                    )
                                                                }
                                                            >
                                                                View Transactions
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    );
};

export default Transactions;

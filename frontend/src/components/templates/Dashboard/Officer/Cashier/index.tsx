import api from '@/api/axios-instance';
import { DashboardContext } from '@/contexts/DashboardContext/DashboardContext';
import type { TableType } from '@/types/store';
import { Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const Cashier = () => {
    const { userData } = useContext(DashboardContext)!;
    const [table, setTable] = useState<TableType[]>([]);
    const router = useRouter();

    const getAllTable = async () => {
        try {
            const response = await api.get(`/merchant/table/${userData?.merchant?.merchantId}`);
            if (response) {
                setTable(() => response.data.data.tables);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getAllTable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Typography sx={{ fontSize: '28px', color: '#0e2979', fontWeight: 600 }}>Cashier</Typography>
                </Grid>
                <Grid item>
                    <Grid container direction="row" spacing={2}>
                        {table?.map((data, index) => {
                            const transactions = data.transaction;
                            let isTableActive = false;

                            if (transactions?.length !== 0) {
                                isTableActive = data!.transaction![data.transaction!.length - 1]!.status === 0;
                            }

                            return (
                                <Grid item key={index} xs={4}>
                                    <Grid container alignItems="center" justifyContent="center">
                                        <Grid item>
                                            <Button
                                                sx={{
                                                    height: '200px',
                                                    width: '200px',
                                                    borderRadius: '8px',
                                                    backgroundColor: 'white',
                                                    '&:hover': {
                                                        backgroundColor: 'white',
                                                        opacity: 0.8
                                                    },
                                                    color: 'black'
                                                }}
                                                disabled={!isTableActive}
                                                onClick={() =>
                                                    router.push(
                                                        `/dashboard/transactions/${
                                                            transactions![transactions!.length - 1]!.transactionId
                                                        }`
                                                    )
                                                }
                                            >
                                                <Grid container direction="column">
                                                    <Grid item>{data.name}</Grid>
                                                    <Grid item>
                                                        <Typography sx={{ color: isTableActive ? 'green' : 'red' }}>
                                                            {isTableActive ? 'Active' : 'Not Active'}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Cashier;

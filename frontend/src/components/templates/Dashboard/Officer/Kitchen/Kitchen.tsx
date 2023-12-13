import api from '@/api/axios-instance';
import ToastError from '@/components/atoms/Toast/ToastError';
import ToastInfo from '@/components/atoms/Toast/ToastInfo';
import ListFoodMenuKitchen from '@/components/molecules/Dashboard/ListFoodMenuKitchen/ListFoodMenuKitchen';
import { DashboardContext } from '@/contexts/DashboardContext/DashboardContext';
import type { TransactionItem } from '@/types/store';
import { Grid, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

const Kitchen = () => {
    const { userData } = useContext(DashboardContext)!;
    const [item, setItems] = useState<TransactionItem[]>([]);

    const getTransactionItem = async () => {
        try {
            const response = await api.get(`/transaction/transactionitem/get/active/${userData?.merchant?.merchantId}`);
            if (response) {
                const oldLength = item.length;
                const newLength = response.data.data.transactionItem.length;
                if (oldLength < newLength) {
                    ToastInfo('New food request available!');
                }
                setItems(() => response.data.data.transactionItem);
            }
        } catch (e) {
            console.log(e);
            ToastError('Server Error');
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            getTransactionItem();
        }, 3000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item]);

    return (
        <>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Typography sx={{ fontSize: '28px', color: '#0e2979', fontWeight: 600 }}>Kitchen</Typography>
                </Grid>
                {item.length === 0 ? (
                    <>
                        <Grid item>
                            <Typography sx={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
                                There is no food need to be cooked! 😁
                            </Typography>
                        </Grid>
                    </>
                ) : (
                    <>
                        {item.map((data, index) => {
                            return (
                                <Grid item key={index}>
                                    <ListFoodMenuKitchen
                                        key={index}
                                        data={data}
                                        getTransactionItem={getTransactionItem}
                                    />
                                </Grid>
                            );
                        })}
                    </>
                )}
            </Grid>
        </>
    );
};

export default Kitchen;

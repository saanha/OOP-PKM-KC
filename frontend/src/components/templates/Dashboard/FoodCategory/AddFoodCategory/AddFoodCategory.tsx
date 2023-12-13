import api from '@/api/axios-instance';
import ToastError from '@/components/atoms/Toast/ToastError';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import { DashboardContext } from '@/contexts/DashboardContext/DashboardContext';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

const AddFoodCategory = () => {
    const [name, setName] = useState<string>('');
    const { userData } = useContext(DashboardContext)!;
    const router = useRouter();

    const addCategory = async () => {
        try {
            if (name === '') {
                ToastError('Name cannot be empty!');
                return;
            }
            const response = await api.post('/food/category', { name, merchantId: userData?.merchant?.merchantId });
            if (response) {
                ToastSuccess(`${name} Added to food category!`);
                setTimeout(() => {
                    router.push('/dashboard/menu/category');
                }, 500);
            }
        } catch (e) {
            ToastError('Server Error!');
        }
    };

    return (
        <>
            <Grid container direction="column">
                <Grid item style={{ backgroundColor: 'white', borderRadius: '24px' }}>
                    <Grid container direction="column" sx={{ p: 2, py: 3 }} spacing={2}>
                        <Grid item>
                            <Typography sx={{ color: '#0E2979', fontSize: '24px', fontWeight: 600 }}>Name</Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                fullWidth
                                defaultValue={name}
                                label="Category Food Name"
                                placeholder="Enter category food name"
                                onChange={(e) => setName(() => e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={{ mt: 2 }}>
                    <Button
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
                        onClick={addCategory}
                    >
                        Add Food Category
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default AddFoodCategory;

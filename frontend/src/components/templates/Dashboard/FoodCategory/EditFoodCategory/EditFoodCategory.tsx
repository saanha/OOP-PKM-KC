import api from '@/api/axios-instance';
import ToastError from '@/components/atoms/Toast/ToastError';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import { DashboardContext } from '@/contexts/DashboardContext/DashboardContext';
import type { FoodCategoryType } from '@/types/dashboard';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const EditFoodCategory = () => {
    const [foodCategory, setFoodCategory] = useState<FoodCategoryType>({
        foodCategoryId: -1,
        name: '',
        merchantId: ''
    });
    const { userData } = useContext(DashboardContext)!;
    const router = useRouter();
    const { id } = router.query;

    const editCategory = async () => {
        try {
            if (foodCategory.name === '') {
                ToastError('Name cannot be empty!');
                return;
            }
            const response = await api.put(`/food/category/${id}`, { name: foodCategory.name });
            if (response) {
                ToastSuccess('Food category edited!');
                setTimeout(() => {
                    router.push('/dashboard/menu/category');
                }, 500);
            }
        } catch (e) {
            console.log(e);
            ToastError('Server Error!');
        }
    };

    const getFoodCategory = async () => {
        try {
            const response = await api.get(`/food/category/${id}`);
            if (response) {
                setFoodCategory(() => response.data.data.foodCategory);
                if (response.data.data.foodCategory.merchantId !== userData?.merchant?.merchantId) {
                    ToastError('You are not authorized to edit this food category!');
                    router.push('/dashboard/menu/category');
                }
            }
        } catch (e) {
            if (isAxiosError(e)) {
                if (e.response?.status === 404) {
                    ToastError('Food Category not found!');
                    router.push('/dashboard/menu/category');
                }
            }
        }
    };

    useEffect(() => {
        if (id) getFoodCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

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
                                value={foodCategory.name}
                                label="Category Food Name"
                                placeholder="Enter category food name"
                                onChange={(e) => setFoodCategory((state) => ({ ...state, name: e.target.value }))}
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
                        onClick={editCategory}
                    >
                        Edit Food Category
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default EditFoodCategory;

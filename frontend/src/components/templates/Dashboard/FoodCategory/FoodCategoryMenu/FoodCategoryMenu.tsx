import api from '@/api/axios-instance';
import FoodCategoryList from '@/components/atoms/Dashboard/FoodCategoryList/FoodCategoryList';
import { DashboardContext } from '@/contexts/DashboardContext/DashboardContext';
import type { FoodCategoryType } from '@/types/dashboard';
import { Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const FoodCategoryMenu = () => {
    const router = useRouter();
    const { userData } = useContext(DashboardContext)!;
    const [foodCategory, setFoodCategory] = useState<FoodCategoryType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getFoodCategory = async () => {
        try {
            const response = await api.get(`/food/category/merchant/${userData?.merchant?.merchantId}`);
            if (response) {
                setFoodCategory(response.data.data.foodCategory);
                setLoading(() => false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getFoodCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Grid container direction="column" sx={{ pr: 2 }} spacing={2}>
                <Grid item>
                    <Grid container direction="row-reverse">
                        <Grid item>
                            <Button
                                sx={{
                                    backgroundColor: '#0e2979',
                                    color: 'white',
                                    px: 3,
                                    '&:hover': {
                                        backgroundColor: '#0e2979',
                                        opacity: 0.8
                                    }
                                }}
                                onClick={() => router.push('/dashboard/menu/category/add')}
                            >
                                Add Food Category
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {loading ? null : (
                    <Grid item>
                        <Grid container direction="column" spacing={2}>
                            {foodCategory.length === 0 ? (
                                <Grid item>There is no food category 😥</Grid>
                            ) : (
                                <>
                                    {foodCategory.map((data, index) => {
                                        return (
                                            <Grid item key={index}>
                                                <FoodCategoryList data={data} />
                                            </Grid>
                                        );
                                    })}
                                </>
                            )}
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default FoodCategoryMenu;

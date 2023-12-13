import api from '@/api/axios-instance';
import ToastError from '@/components/atoms/Toast/ToastError';
import { SortMenu } from '@/components/constants/Menu/MenuMock';
import ListFoodMenu from '@/components/molecules/Dashboard/ListFoodMenu/ListFoodMenu';
import { DashboardContext } from '@/contexts/DashboardContext/DashboardContext';
import { returnMenu } from '@/helper/filterMenu';
import type { FoodCategoryType, FoodType } from '@/types/dashboard';
import { Button, Grid, MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const FoodMenu = () => {
    const [selectedSort, setSelectedSort] = useState<string>('0');
    const [foodCategory, setFoodCategory] = useState<FoodCategoryType[]>([]);
    const [food, setFood] = useState<FoodType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('-1');
    const { userData } = useContext(DashboardContext)!;
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();

    const getFoodCategory = async () => {
        try {
            const response = await api.get(`/food/category/merchant/${userData?.merchant?.merchantId}`);
            if (response) {
                setFoodCategory(() => response.data.data.foodCategory);
            }
        } catch (e) {
            console.log(e);
            ToastError('Server Error!');
        }
    };

    const getAllFood = async () => {
        try {
            const response = await api.get(`/food/get/${userData?.merchant?.merchantId}`);
            if (response) {
                console.log(response);
                setFood(() => response.data.data.food);
                setLoading(() => false);
            }
        } catch (e) {
            console.log(e);
            ToastError('Server Error!');
        }
    };

    useEffect(() => {
        getFoodCategory();
        getAllFood();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Grid container direction="column" sx={{ pr: 2 }} spacing={2}>
                <Grid item>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Grid container direction="row" spacing={2} alignItems="center">
                                <Grid item>
                                    <Select
                                        value={selectedSort}
                                        label="Sort By"
                                        sx={{ width: '250px' }}
                                        variant="standard"
                                        onChange={(e: SelectChangeEvent) => setSelectedSort(() => e.target.value)}
                                    >
                                        <MenuItem value={0}>Sort By</MenuItem>
                                        {SortMenu.map((data, index) => {
                                            return (
                                                <MenuItem value={index + 1} key={index}>
                                                    {data}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </Grid>
                                <Grid item>
                                    <Select
                                        value={selectedCategory}
                                        label="Sort By"
                                        sx={{ width: '250px' }}
                                        variant="standard"
                                        onChange={(e: SelectChangeEvent) => setSelectedCategory(() => e.target.value)}
                                    >
                                        <MenuItem value={-1}>All</MenuItem>
                                        {foodCategory.map((data, index) => {
                                            return (
                                                <MenuItem value={index + 1} key={index}>
                                                    {data.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </Grid>
                            </Grid>
                        </Grid>
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
                                onClick={() => router.push('/dashboard/menu/food/add')}
                            >
                                Add Food
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {loading ? null : (
                    <Grid item>
                        <Grid container direction="column" spacing={2}>
                            {returnMenu(food, selectedSort)
                                .filter((data) =>
                                    Number(selectedCategory) !== -1
                                        ? data?.foodCategoryId ===
                                          foodCategory[Number(selectedCategory) - 1].foodCategoryId
                                        : data
                                )
                                .map((data, index) => {
                                    return (
                                        <Grid item key={index} md={12} sm={12} xs={12}>
                                            <ListFoodMenu data={data} />
                                        </Grid>
                                    );
                                })}
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default FoodMenu;

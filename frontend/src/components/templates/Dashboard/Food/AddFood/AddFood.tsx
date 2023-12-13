import api from '@/api/axios-instance';
import Uploader from '@/components/atoms/Dashboard/Uploader/Uploader';
import ToastError from '@/components/atoms/Toast/ToastError';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import { DashboardContext } from '@/contexts/DashboardContext/DashboardContext';
import type { FoodCategoryType, FoodType } from '@/types/dashboard';
import {
    Button,
    FormControlLabel,
    Grid,
    InputAdornment,
    MenuItem,
    Select,
    type SelectChangeEvent,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const AddFood = () => {
    const [foodData, setFoodData] = useState<FoodType>({
        name: '',
        description: '',
        price: 0,
        isSpicy: false,
        isMerchantFavorite: false,
        foodPhotoPath: '',
        foodCategoryId: -1
    });
    const [blobFood, setBlobFood] = useState<any>(null);
    const [foodCategory, setFoodCategory] = useState<FoodCategoryType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('-1');
    const { userData } = useContext(DashboardContext)!;
    const router = useRouter();

    const getFoodCategory = async () => {
        try {
            const response = await api.get(`/food/category/merchant/${userData?.merchant?.merchantId}`);
            if (response) {
                setFoodCategory(response.data.data.foodCategory);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const addFood = async () => {
        try {
            if (Number(selectedCategory) === -1) {
                ToastError('Please select food category!');
                return;
            }
            if (blobFood === null) {
                ToastError('Please upload a photo!');
            }

            const formData: any = new FormData();
            formData.append('name', foodData.name);
            formData.append('price', foodData.price);
            formData.append('description', foodData.description);
            formData.append('isSpicy', foodData.isSpicy);
            formData.append('isMerchantFavorite', foodData.isMerchantFavorite);
            formData.append('foodCategoryId', Number(foodCategory[Number(selectedCategory) - 1].foodCategoryId));
            formData.append('foodImage', blobFood);

            const response = await api.post('/food', formData);
            if (response) {
                console.log(response);
                ToastSuccess('Food successfully added!');
                router.push('/dashboard/menu/food');
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
            <Grid container direction="column" sx={{ minHeight: '80vh' }} justifyContent="space-between" spacing={1}>
                <Grid item>
                    <div style={{ backgroundColor: 'white', borderRadius: '24px' }}>
                        <Grid
                            container
                            direction="column"
                            sx={{ minHeight: '100px', p: 2 }}
                            justifyContent="space-between"
                        >
                            <Grid item sx={{ pb: 2 }}>
                                <Typography sx={{ color: '#0E2979', fontSize: '24px', fontWeight: 600 }}>
                                    Name
                                </Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    label="Food Name"
                                    placeholder="Enter food name"
                                    onChange={(e) => setFoodData((state) => ({ ...state, name: e.target.value }))}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item>
                    <div style={{ backgroundColor: 'white', borderRadius: '24px' }}>
                        <Grid
                            container
                            direction="column"
                            sx={{ minHeight: '100px', p: 2 }}
                            justifyContent="space-between"
                        >
                            <Grid item sx={{ pb: 2 }}>
                                <Typography sx={{ color: '#0E2979', fontSize: '24px', fontWeight: 600 }}>
                                    Description
                                </Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                    multiline
                                    fullWidth
                                    label="Description"
                                    placeholder="Enter description"
                                    rows={3}
                                    onChange={(e) =>
                                        setFoodData((state) => ({ ...state, description: e.target.value }))
                                    }
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item container spacing={2}>
                    <Grid item md={6} xs={12}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <div style={{ backgroundColor: 'white', borderRadius: '24px' }}>
                                    <Grid
                                        container
                                        direction="column"
                                        sx={{ minHeight: '50px', p: 2 }}
                                        justifyContent="space-between"
                                    >
                                        <Grid item sx={{ pb: 2 }}>
                                            <Typography sx={{ color: '#0E2979', fontSize: '24px', fontWeight: 600 }}>
                                                Food Category
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Select
                                                fullWidth
                                                value={selectedCategory}
                                                label="Sort By"
                                                variant="standard"
                                                onChange={(e: SelectChangeEvent) =>
                                                    setSelectedCategory(() => e.target.value)
                                                }
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
                                </div>
                            </Grid>
                            <Grid item>
                                <div style={{ backgroundColor: 'white', borderRadius: '24px' }}>
                                    <Grid
                                        container
                                        direction="column"
                                        sx={{ minHeight: '50px', p: 2 }}
                                        justifyContent="space-between"
                                    >
                                        <Grid item sx={{ pb: 2 }}>
                                            <Typography sx={{ color: '#0E2979', fontSize: '24px', fontWeight: 600 }}>
                                                Price
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                fullWidth
                                                label="Price"
                                                placeholder="Enter price"
                                                type="number"
                                                onChange={(e) =>
                                                    setFoodData((state) => ({
                                                        ...state,
                                                        price: Number.isNaN(parseInt(e.target.value))
                                                            ? 0
                                                            : parseInt(e.target.value)
                                                    }))
                                                }
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">Rp</InputAdornment>
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item>
                                <div style={{ backgroundColor: 'white', borderRadius: '24px' }}>
                                    <Grid
                                        container
                                        direction="column"
                                        sx={{ minHeight: '50px', p: 2 }}
                                        justifyContent="space-between"
                                    >
                                        <Grid item sx={{ pb: 2 }}>
                                            <Typography sx={{ color: '#0E2979', fontSize: '24px', fontWeight: 600 }}>
                                                et cetera
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container direction="column">
                                                <Grid item>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={foodData.isSpicy}
                                                                onChange={(e) =>
                                                                    setFoodData((state) => ({
                                                                        ...state,
                                                                        isSpicy: e.target.checked
                                                                    }))
                                                                }
                                                            />
                                                        }
                                                        label="Spicy Food?"
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={foodData.isMerchantFavorite}
                                                                onChange={(e) =>
                                                                    setFoodData((state) => ({
                                                                        ...state,
                                                                        isMerchantFavorite: e.target.checked
                                                                    }))
                                                                }
                                                            />
                                                        }
                                                        label="Favorite Food?"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <div style={{ backgroundColor: 'white', borderRadius: '24px', height: '100%' }}>
                            <Grid container sx={{ height: '100%', p: 2 }} direction="column">
                                <Grid item sx={{ pb: 2 }}>
                                    <Typography sx={{ color: '#0E2979', fontSize: '24px', fontWeight: 600 }}>
                                        Food Picture
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container justifyContent="center">
                                        <Grid item>
                                            {foodData.foodPhotoPath === '' && blobFood === null ? (
                                                <Uploader
                                                    title="Drag your food photo here"
                                                    functionUpload={(base64: any, blob: any) => {
                                                        setBlobFood(() => blob);
                                                        console.log('test');
                                                    }}
                                                    id="foodUploader"
                                                    height="350px"
                                                />
                                            ) : (
                                                <Grid
                                                    container
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    direction="column"
                                                >
                                                    <Grid item>
                                                        <Image
                                                            src={
                                                                foodData.foodPhotoPath === ''
                                                                    ? URL.createObjectURL(blobFood)
                                                                    : `${process.env.NEXT_PUBLIC_API_URL}/${foodData.foodPhotoPath}`
                                                            }
                                                            alt="logo"
                                                            sizes="100%"
                                                            width={0}
                                                            height={0}
                                                            style={{
                                                                maxHeight: '330px',
                                                                height: '100%',
                                                                width: '100%'
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <Button
                                                            onClick={() => setBlobFood(() => null)}
                                                            sx={{ height: '20px', m: 0, p: 0 }}
                                                        >
                                                            Remove Image
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
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
                        onClick={addFood}
                    >
                        Add Food
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default AddFood;

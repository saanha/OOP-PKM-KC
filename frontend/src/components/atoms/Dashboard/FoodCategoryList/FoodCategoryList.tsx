import DeleteFoodCategoryModal from '@/components/molecules/Dashboard/DeleteFoodCategoryModal/DeleteFoodCategoryModal';
import type { FoodCategoryType } from '@/types/dashboard';
import { Grid, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';

const FoodCategoryList = ({ data }: { data: FoodCategoryType }) => {
    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const router = useRouter();

    return (
        <>
            <DeleteFoodCategoryModal open={deleteModal} setOpen={setDeleteModal} data={data} />
            <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ backgroundColor: 'white', p: 2, borderRadius: '20px' }}
            >
                <Grid item>
                    <Typography sx={{ fontSize: '24px', color: '#0E2979', fontWeight: 500 }}>{data.name}</Typography>
                </Grid>
                <Grid item>
                    <Grid container direction="row" spacing={1}>
                        <Grid item>
                            <IconButton
                                onClick={() => router.push(`/dashboard/menu/category/edit/${data.foodCategoryId}`)}
                            >
                                <MdEdit color="#32CD32" />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => setDeleteModal(() => true)}>
                                <AiFillDelete color="#C70000" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default FoodCategoryList;

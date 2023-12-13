import api from '@/api/axios-instance';
import ToastError from '@/components/atoms/Toast/ToastError';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import type { FoodCategoryType } from '@/types/dashboard';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useRouter } from 'next/router';
import type { Dispatch, SetStateAction } from 'react';

const DeleteFoodCategoryModal = ({
    open,
    setOpen,
    data
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    data: FoodCategoryType;
}) => {
    const handleClose = () => {
        setOpen((state) => !state);
    };
    const router = useRouter();

    const deleteCategory = async () => {
        try {
            const response = await api.put(`/food/category/sethidden/${data.foodCategoryId}`);
            if (response) {
                ToastSuccess(`${data.name} is deleted!`);
                router.reload();
            }
        } catch (e) {
            console.log(e);
            ToastError('Server Error!');
        }
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Are you sure you want to delete this food category?</DialogTitle>
                <DialogContent>
                    <DialogContentText>{data.name} will be deleted and this action is irreversible!</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ px: 2 }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={deleteCategory}
                        sx={{
                            backgroundColor: '#C70000',
                            color: 'white',
                            px: 2,
                            '&:hover': {
                                backgroundColor: '#C70000',
                                opacity: 0.8
                            }
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteFoodCategoryModal;

import api from '@/api/axios-instance';
import ToastError from '@/components/atoms/Toast/ToastError';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import type { FoodType } from '@/types/dashboard';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useRouter } from 'next/router';
import type { Dispatch, SetStateAction } from 'react';

const DeleteFoodModal = ({
    open,
    setOpen,
    data
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    data: FoodType;
}) => {
    const handleClose = () => {
        setOpen((state) => !state);
    };
    const router = useRouter();

    const deleteFood = async () => {
        try {
            const response = await api.put(`/food/sethidden/${data.foodId}`);
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
                <DialogTitle>Are you sure you want to delete this food?</DialogTitle>
                <DialogContent>
                    <DialogContentText>{data.name} will be deleted and this action is irreversible!</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ px: 2 }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={deleteFood}
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

export default DeleteFoodModal;

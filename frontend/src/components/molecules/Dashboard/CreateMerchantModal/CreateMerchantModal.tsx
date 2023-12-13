import api from '@/api/axios-instance';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import { DashboardContext } from '@/contexts/DashboardContext/DashboardContext';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState, type Dispatch, type SetStateAction, useContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CreateMerchantModal = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const [merchantInfo, setMerchantInfo] = useState<{ name: string; address: string }>({ name: '', address: '' });
    const { userData } = useContext(DashboardContext)!;
    const router = useRouter();

    const createRestaurant = async () => {
        try {
            const response = await api.post('/merchant/create', { ...merchantInfo, userId: userData?.userId });
            if (response) {
                ToastSuccess('Restaurant berhasil dibuat!');
                localStorage.setItem('user-data', JSON.stringify(response.data.data.user));
                router.reload();
            }
        } catch (e) {
            if (isAxiosError(e)) {
                console.log(e);
            }
        }
    };

    return (
        <>
            <Modal open={open}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 370,
                        bgcolor: 'background.paper',
                        p: 2,
                        outline: 'none'
                    }}
                >
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <Typography sx={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                                You dont have any restaurant 😥 Lets make one!
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                fullWidth
                                label="Restaurant Name"
                                variant="outlined"
                                placeholder="Enter your Restaurant Name"
                                size="small"
                                defaultValue={merchantInfo.name}
                                onChange={(e) => setMerchantInfo((state) => ({ ...state, name: e.target.value }))}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                fullWidth
                                label="Restaurant Address"
                                variant="outlined"
                                placeholder="Enter your Restaurant Address"
                                size="small"
                                defaultValue={merchantInfo.address}
                                onChange={(e) => setMerchantInfo((state) => ({ ...state, address: e.target.value }))}
                            />
                        </Grid>
                        <Grid item container alignItems="center" justifyContent="center">
                            <Button
                                sx={{
                                    backgroundColor: '#0E2979',
                                    color: 'white',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#0E2979',
                                        opacity: 0.8
                                    },
                                    transition: '0.3s all',
                                    px: 4,
                                    mx: 'auto'
                                }}
                                onClick={createRestaurant}
                            >
                                Create Restaurant
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default CreateMerchantModal;

import { StoreContext } from '@/contexts/StoreContext/StoreContext';
import { Box, Button, Grid, IconButton, Modal, TextField, Typography } from '@mui/material';
import { IoChevronBack } from 'react-icons/io5';
import { useContext, useState } from 'react';
import type { FoodType } from '@/types/dashboard';
import Image from 'next/image';

const MenuModal = ({ open, handleClose, menu }: { open: boolean; handleClose: () => void; menu: FoodType }) => {
    const {
        storeInfo: { config },
        addItemToCart
    } = useContext(StoreContext)!;

    const [quantity, setQuantity] = useState<number>(0);
    const [note, setNote] = useState<string>('');

    const closeModal = () => {
        setQuantity(() => 0);
        setNote(() => '');
        handleClose();
    };

    return (
        <>
            <Modal
                open={open}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 370,
                        bgcolor: 'background.paper',
                        outline: 'none'
                    }}
                >
                    <Grid container direction="column">
                        <Grid
                            item
                            sx={{
                                p: 2,
                                pl: 0.5,
                                borderBottom: `2px solid ${config.thirdColor}`
                            }}
                        >
                            <Grid container direction="row" spacing={1} alignItems="center">
                                <Grid item>
                                    <IconButton sx={{ p: 0 }} onClick={handleClose}>
                                        <IoChevronBack style={{ fontSize: '36px' }} />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            color: config.thirdColor,
                                            fontSize: '24px'
                                        }}
                                    >
                                        Back
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ p: 2 }}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <Image
                                        priority={true}
                                        sizes="100%"
                                        alt="logo"
                                        width={0}
                                        height={0}
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/public/images/${menu.foodPhotoPath}`}
                                        crossOrigin="anonymous"
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            backgroundColor: 'gray',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Grid container direction="row" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography
                                                        sx={{
                                                            color: config.secondaryColor,
                                                            fontWeight: 600,
                                                            fontSize: '20px'
                                                        }}
                                                    >
                                                        {menu.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography
                                                        sx={{
                                                            color: config.secondaryColor,
                                                            fontWeight: 600,
                                                            fontSize: '20px'
                                                        }}
                                                    >
                                                        {menu.price / 1000}K
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                sx={{
                                                    fontSize: '16px',
                                                    fontWeight: 300
                                                }}
                                            >
                                                {menu.description}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid
                                                container
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                            >
                                                <Grid item>
                                                    <Typography sx={{ color: config.secondaryColor, fontWeight: 500 }}>
                                                        Notes :
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs sx={{ ml: 4 }}>
                                                    <TextField
                                                        fullWidth
                                                        defaultValue={note}
                                                        onChange={(e) => setNote(e.target.value)}
                                                        sx={{
                                                            border: `solid 1px ${config.thirdColor}`,
                                                            borderRadius: '4px',
                                                            input: { fontSize: '16px', height: '0.5px' },
                                                            backgroundColor: 'white',
                                                            '& :-webkit-autofill': {
                                                                transitionDelay: '999999999999999s'
                                                            },
                                                            '& .MuiOutlinedInput-root': {
                                                                '& fieldset': {
                                                                    borderRadius: '4px'
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderRadius: '4px'
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderRadius: '4px'
                                                                }
                                                            },
                                                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                                                                {
                                                                    borderColor: 'transparent'
                                                                },
                                                            '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                                                                {
                                                                    borderColor: 'transparent'
                                                                },
                                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                                                {
                                                                    borderColor: 'transparent'
                                                                },
                                                            '& .MuiFormLabel-root': {
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                verticalAlign: 'middle',
                                                                justifyContent: 'center',
                                                                fontSize: '18px'
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography sx={{ textAlign: 'center' }}>
                                        Rp {(menu.price * quantity) / 1000}K
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        <Grid item>
                                            <Grid container spacing={2}>
                                                <Grid item>
                                                    <IconButton
                                                        sx={{
                                                            width: '25px',
                                                            height: '25px',
                                                            verticalAlign: 'middle',
                                                            backgroundColor: config.thirdColor,
                                                            p: 0
                                                        }}
                                                        onClick={() => {
                                                            setQuantity((state) => {
                                                                if (state <= 1) {
                                                                    return 0;
                                                                }
                                                                return state - 1;
                                                            });
                                                        }}
                                                    >
                                                        -
                                                    </IconButton>
                                                </Grid>
                                                <Grid item>{quantity}</Grid>
                                                <Grid item>
                                                    <IconButton
                                                        sx={{
                                                            width: '25px',
                                                            height: '25px',
                                                            verticalAlign: 'middle',
                                                            backgroundColor: config.thirdColor,
                                                            p: 0
                                                        }}
                                                        onClick={() => setQuantity((state) => state + 1)}
                                                    >
                                                        +
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs sx={{ ml: 4 }}>
                                            <Button
                                                sx={{
                                                    width: '100%',
                                                    backgroundColor: config.primaryColor,
                                                    color: config.secondaryColor,
                                                    fontWeight: 'bold',
                                                    transition: '0.3s all',
                                                    '&:hover': {
                                                        backgroundColor: config.primaryColor,
                                                        opacity: 0.8
                                                    }
                                                }}
                                                disabled={quantity === 0}
                                                onClick={() => {
                                                    addItemToCart(menu, quantity, note);
                                                    closeModal();
                                                }}
                                            >
                                                Add To Cart
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default MenuModal;

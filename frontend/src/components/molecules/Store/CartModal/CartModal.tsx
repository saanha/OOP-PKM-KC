import api from '@/api/axios-instance';
import ConfirmedCartMenu from '@/components/atoms/Store/ConfirmedCartMenu/ConfirmedCartMenu';
import FoodCartMenu from '@/components/atoms/Store/FoodCartMenu/FoodCartMenu';
import ToastError from '@/components/atoms/Toast/ToastError';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import { StoreContext } from '@/contexts/StoreContext/StoreContext';
import type { FoodCartType, TransactionItem } from '@/types/store';
import { Box, Button, Divider, Grid, Modal, Typography } from '@mui/material';
import { useContext } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsCart } from 'react-icons/bs';

const CartModal = () => {
    const {
        openCart,
        setOpenCart,
        cart,
        confirmedCart,
        storeInfo: { config },
        storeInfo,
        removeItemFromCart,
        transaction,
        table,
        setConfirmedCart,
        setCart,
        setTransaction
    } = useContext(StoreContext)!;

    const closeModal = () => setOpenCart(() => false);

    const makeOrder = async () => {
        try {
            let newOrder = false;
            let newTransactionId = transaction.transactionId;
            if (transaction.transactionId === -1) {
                newOrder = true;
                newTransactionId = await createTransactions();
            }
            await addItemToTransaction(newOrder, newTransactionId);
        } catch (e) {
            console.log(e);
            ToastError('Server Error!');
        }
    };

    const createTransactions = async (): Promise<number> => {
        try {
            const response = await api.post('/transaction/create', {
                merchantId: storeInfo.merchantId,
                tableMerchantId: table.tableId
            });
            if (response) {
                setTransaction(() => response.data.data.transaction);
                return Number(response.data.data.transaction.transactionId);
            }
        } catch (e) {
            console.log(e);
            ToastError('Server Error!');
            return -1;
        }
        return -1;
    };

    const addItemToTransaction = async (newOrder: boolean, newTransactionId: number) => {
        try {
            const foods: FoodCartType[] = [...cart];
            if (newOrder) {
                foods.map((_, index) => {
                    foods[index].transactionId = newTransactionId;
                });
            }
            console.log(foods);
            const response = await api.post('/transaction/transactionitem/create', { foods });
            if (response) {
                await getNewTransactionItem(newTransactionId);
            }
        } catch (e) {
            console.log(e);
            ToastError('Server Error!');
        }
    };

    const getNewTransactionItem = async (newTransactionId: number) => {
        try {
            const response = await api.get(`/transaction/get/${newTransactionId}`);
            if (response) {
                setConfirmedCart(() => response.data.data.transaction.transactionItem);
                setCart(() => []);
                ToastSuccess('Order success!');
            }
        } catch (e) {
            console.log(e);
            ToastError('Server Error!');
        }
    };

    const countAllHarga = (cart: FoodCartType[] | TransactionItem[]) => {
        let total = 0;
        cart.map((data) => {
            total += data.price;
        });
        return total;
    };

    return (
        <>
            <Modal
                open={openCart}
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
                        p: 2,
                        outline: 'none'
                    }}
                >
                    <Grid
                        container
                        direction="column"
                        sx={{ maxHeight: '80vh', overflowY: 'auto', overflowX: 'hidden' }}
                        spacing={3}
                    >
                        <Grid item>
                            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                <Grid item>
                                    <Typography sx={{ fontSize: '20px' }}>Your Cart</Typography>
                                </Grid>
                                <Grid item>
                                    <BsCart
                                        style={{ color: config.thirdColor, verticalAlign: 'middle' }}
                                        size={'24px'}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" spacing={2}>
                                {cart.length === 0 ? (
                                    <>
                                        <Grid item sx={{ textAlign: 'center' }}>
                                            Current Cart is Empty! 😭
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        {cart.map((data, index) => {
                                            return (
                                                <Grid item key={index} container>
                                                    <FoodCartMenu
                                                        config={config}
                                                        data={data}
                                                        index={index}
                                                        render={true}
                                                        removeItemFromCart={removeItemFromCart}
                                                    />
                                                </Grid>
                                            );
                                        })}
                                        <Grid item>
                                            <Typography sx={{ textAlign: 'center' }}>
                                                Total: Rp{countAllHarga(cart) / 1000}K
                                            </Typography>
                                        </Grid>
                                        <Grid item>
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
                                                onClick={makeOrder}
                                            >
                                                Confirm Order
                                            </Button>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Grid>
                        {confirmedCart.length === 0 ? null : (
                            <>
                                <Grid item>
                                    <Divider sx={{ background: 'black' }} />
                                </Grid>
                                <Grid item>
                                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                        <Grid item>
                                            <Typography sx={{ fontSize: '20px' }}>Your Confirmed Purchase</Typography>
                                        </Grid>
                                        <Grid item>
                                            <AiOutlineCheckCircle
                                                style={{ color: config.thirdColor, verticalAlign: 'middle' }}
                                                size={'24px'}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {confirmedCart.map((data, index) => {
                                    return (
                                        <Grid item key={index} container>
                                            <ConfirmedCartMenu config={config} data={data} index={index} />
                                        </Grid>
                                    );
                                })}
                                <Grid item>
                                    <Typography sx={{ textAlign: 'center' }}>
                                        Total: Rp{countAllHarga(confirmedCart) / 1000}K
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography sx={{ fontSize: '14px', textAlign: 'center' }}>
                                        To pay your transaction, please proceed to the cashier.
                                    </Typography>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default CartModal;

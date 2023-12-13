import hexToRgbA from '@/helper/hexToRGBA';
import type { StoreConfigType, TransactionItem } from '@/types/store';
import { Grid, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { CiHeart } from 'react-icons/ci';
import { GiChiliPepper } from 'react-icons/gi';
import { GrFormClose } from 'react-icons/gr';

const ConfirmedCartMenu = ({
    data,
    config,
    render,
    index,
    removeItemFromCart
}: {
    data: TransactionItem;
    config: StoreConfigType;
    render?: boolean;
    index: number;
    removeItemFromCart?: (index: number) => void;
}) => {
    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    backgroundColor: hexToRgbA(config.primaryColor, '0.3'),
                    p: 1,
                    border: `2px solid ${config.secondaryColor}`,
                    boxShadow: `2px 2px 2px ${config.secondaryColor}`,
                    borderRadius: '5px',
                    position: 'relative'
                }}
            >
                {render === true ? (
                    <div style={{ position: 'absolute', right: -2, top: -10 }}>
                        <IconButton
                            sx={{
                                p: 0,
                                m: 0,
                                backgroundColor: config.primaryColor,
                                '&:hover': {
                                    backgroundColor: config.primaryColor,
                                    opacity: 0.8
                                }
                            }}
                            onClick={() => removeItemFromCart!(index)}
                        >
                            <GrFormClose color={config.secondaryColor} />
                        </IconButton>
                    </div>
                ) : null}
                <Grid item>
                    <Image
                        alt="food"
                        width={0}
                        height={0}
                        priority={true}
                        sizes="50%"
                        src={`${process.env.NEXT_PUBLIC_API_URL}/public/images/${data.food.foodPhotoPath}`}
                        style={{
                            height: '40px',
                            width: '40px',
                            borderRadius: '50%',
                            backgroundColor: 'gray',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    />
                </Grid>
                <Grid item xs={8} sm={9}>
                    <Grid container direction="column" sx={{ width: '100%' }}>
                        <Grid item>
                            <Grid container direction="row" spacing={1} alignItems="center">
                                <Grid item>
                                    <Typography
                                        sx={{
                                            color: config.thirdColor,
                                            fontWeight: 600,
                                            fontSize: '14px'
                                        }}
                                    >
                                        {data.food.name} ({data.quantity} pcs)
                                    </Typography>
                                </Grid>
                                {data.food.isSpicy === true ? (
                                    <Grid item>
                                        <GiChiliPepper style={{ verticalAlign: 'middle' }} />
                                    </Grid>
                                ) : null}
                                {data.food.isMerchantFavorite === true ? (
                                    <Grid item>
                                        <CiHeart style={{ verticalAlign: 'middle' }} />
                                    </Grid>
                                ) : null}
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography
                                sx={{
                                    color: config.thirdColor,
                                    fontWeight: 300,
                                    fontSize: '13px',
                                    width: '100%'
                                }}
                            >
                                {data.notes}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography
                        sx={{
                            color: config.thirdColor,
                            fontWeight: 'bold',
                            fontSize: '13px'
                        }}
                    >
                        {(data.price / 1000) * data.quantity}K
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default ConfirmedCartMenu;

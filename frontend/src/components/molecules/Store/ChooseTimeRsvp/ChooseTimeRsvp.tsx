import { StoreContext } from '@/contexts/StoreContext/StoreContext';
import { Button, Grid, Typography } from '@mui/material';
import { useContext, useState } from 'react';

const timeList: { time: string; hours: number }[] = [
    { time: '10.00', hours: 10 },
    { time: '11.00', hours: 11 },
    { time: '12.00', hours: 12 },
    { time: '13.00', hours: 13 },
    { time: '14.00', hours: 14 },
    { time: '15.00', hours: 15 },
    { time: '16.00', hours: 16 },
    { time: '17.00', hours: 17 },
    { time: '18.00', hours: 18 },
    { time: '19.00', hours: 19 },
    { time: '20.00', hours: 20 },
    { time: '21.00', hours: 21 }
];

const ChooseTimeRsvp = ({ setTime }: { setTime: (arg: number) => void }) => {
    const {
        storeInfo: { config }
    } = useContext(StoreContext)!;

    const [selectedTime, setSelectedTime] = useState<number>(0);

    const checkTime = (hours: number) => {
        const time = new Date().getHours();
        if (time >= hours) {
            return true;
        }
        return false;
    };

    return (
        <>
            <Grid item container direction='column' sx={{ width: '75%', mx: 'auto', mt: 1 }}>
                <Grid item sx={{ pb: 1 }}>
                    <Typography>Time</Typography>
                </Grid>
                <Grid item sx={{ border: `2px solid ${config.secondaryColor}`, p: 1, py: 2 }}>
                    <Grid container direction='row' spacing={2}>
                        {timeList.map((data, index) => {
                            return (
                                <Grid item key={index} xs={4} container justifyContent='center'>
                                    <Button
                                        fullWidth
                                        disabled={checkTime(data.hours)}
                                        sx={{
                                            backgroundColor:
                                                data.hours === selectedTime
                                                    ? config.primaryColor
                                                    : config.secondaryColor,
                                            color: data.hours === selectedTime ? config.secondaryColor : 'white',
                                            '&:hover': {
                                                opacity: 0.8,
                                                backgroundColor:
                                                    data.hours === selectedTime
                                                        ? config.primaryColor
                                                        : config.secondaryColor,
                                                color: data.hours === selectedTime ? config.secondaryColor : 'white'
                                            }
                                        }}
                                        onClick={() => {
                                            setSelectedTime(() => data.hours);
                                            setTime(data.hours);
                                        }}
                                    >
                                        {data.time}
                                    </Button>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default ChooseTimeRsvp;

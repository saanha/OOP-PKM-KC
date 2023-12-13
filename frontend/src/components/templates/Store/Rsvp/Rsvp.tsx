import { StoreContext } from '@/contexts/StoreContext/StoreContext';
import { Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { AiFillCalendar } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiChair } from 'react-icons/bi';
import ChooseTimeRsvp from '@/components/molecules/Store/ChooseTimeRsvp/ChooseTimeRsvp';

const Rsvp = () => {
    const {
        storeInfo: { config }
    } = useContext(StoreContext)!;

    const [rsvpData, setRsvpData] = useState<{ date: Date; name: string; partySize: number }>({
        date: new Date(),
        name: '',
        partySize: 0
    });

    const setTime = (hours: number) => {
        const newDate = rsvpData.date;
        newDate.setHours(hours);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        setRsvpData((state) => ({ ...state, date: newDate }));
    };

    console.log(rsvpData);

    return (
        <>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <Typography
                        sx={{ fontSize: '24px', color: config.secondaryColor, fontWeight: 'bold', textAlign: 'center' }}
                    >
                        RESERVE A TABLE
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        sx={{
                            fontSize: '18px',
                            color: config.secondaryColor,
                            fontWeight: 300,
                            textAlign: 'center',
                            width: '90%',
                            ml: 'auto',
                            mr: 'auto'
                        }}
                    >
                        To help us find the best table for you, please select the preferred party size and time of your
                        reservation.
                    </Typography>
                </Grid>
                <Grid item container direction='column' spacing={2}>
                    <Grid item container alignItems='center' justifyContent='center' sx={{ width: '75%', mx: 'auto' }}>
                        <DatePicker
                            closeOnScroll={true}
                            selected={rsvpData.date}
                            onChange={(date: Date) => {
                                setRsvpData((data) => ({
                                    ...data,
                                    date: date
                                }));
                            }}
                            scrollableYearDropdown
                            showYearDropdown
                            showMonthDropdown
                            yearDropdownItemNumber={100}
                            onKeyDown={(e) => e.preventDefault()}
                            dateFormat='MM/dd/yyyy'
                            customInput={
                                <TextField
                                    onChange={(e) => e.preventDefault()}
                                    variant='standard'
                                    sx={{
                                        width: '100%',
                                        fontSize: '16px',
                                        color: 'black',
                                        fontWeight: 'bold',
                                        backgroundColor: 'white',
                                        '&:hover': {
                                            cursor: 'pointer'
                                        }
                                    }}
                                    placeholder='Date'
                                    label='Date'
                                    // className={styles.inputTextfield}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <AiFillCalendar
                                                    style={{
                                                        fontSize: '24px',
                                                        marginRight: '8px',
                                                        marginLeft: '-16px'
                                                    }}
                                                    color={config.secondaryColor}
                                                />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item container alignItems='center' justifyContent='center' sx={{ width: '75%', mx: 'auto' }}>
                        <TextField
                            onChange={(e) => setRsvpData((state) => ({ ...state, name: e.target.value }))}
                            defaultValue={rsvpData.name}
                            variant='standard'
                            sx={{
                                width: '100%',
                                fontSize: '16px',
                                color: 'black',
                                fontWeight: 'bold',
                                backgroundColor: 'white',
                                '&:hover': {
                                    cursor: 'pointer'
                                }
                            }}
                            placeholder='Enter your name'
                            label='Name'
                            // className={styles.inputTextfield}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <BsFillPersonFill
                                            style={{
                                                fontSize: '24px',
                                                marginRight: '8px',
                                                marginLeft: '-16px'
                                            }}
                                            color={config.secondaryColor}
                                        />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item container alignItems='center' justifyContent='center' sx={{ width: '75%', mx: 'auto' }}>
                        <TextField
                            onChange={(e) =>
                                setRsvpData((state) => ({
                                    ...state,
                                    partySize: Number.isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)
                                }))
                            }
                            variant='standard'
                            type='number'
                            sx={{
                                width: '100%',
                                fontSize: '16px',
                                color: 'black',
                                fontWeight: 'bold',
                                backgroundColor: 'white',
                                '&:hover': {
                                    cursor: 'pointer'
                                },
                                '& .MuiInput-input': {
                                    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                                        WebkitAppearance: 'none'
                                    }
                                }
                            }}
                            label='Party Size'
                            placeholder='Enter your party size'
                            // className={styles.inputTextfield}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <BiChair
                                            style={{
                                                fontSize: '24px',
                                                marginRight: '8px',
                                                marginLeft: '-16px'
                                            }}
                                            color={config.secondaryColor}
                                        />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <ChooseTimeRsvp setTime={setTime} />
                    <Grid item sx={{ width: '75%', mx: 'auto' }}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Typography>Status</Typography>
                            </Grid>
                            <Grid item>
                                <Typography sx={{ color: '#229561' }}>Seats are available</Typography>
                            </Grid>
                            <Grid item>
                                <Typography sx={{ color: '#B2372E' }}>Seats are not available</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container alignItems='center' justifyContent='center' sx={{ width: '75%', mx: 'auto' }}>
                        <Button
                            sx={{
                                textTransform: 'none',
                                backgroundColor: config.thirdColor,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: config.thirdColor,
                                    opacity: 0.8
                                },
                                px: 10,
                                transition: '0.3s all'
                            }}
                        >
                            Reserve Now
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Rsvp;

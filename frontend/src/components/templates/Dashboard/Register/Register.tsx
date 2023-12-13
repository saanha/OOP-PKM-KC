import api from '@/api/axios-instance';
import { textFieldStyles } from '@/components/atoms/Textfield/Textfield';
import ToastError from '@/components/atoms/Toast/ToastError';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import { DashboardContext } from '@/contexts/DashboardContext/DashboardContext';
import { validateEmail } from '@/helper/validateEmail';
import type { UserRegisterType } from '@/types/dashboard';
import { Button, FormHelperText, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AiFillLock } from 'react-icons/ai';
import { MdEmail, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { RiAccountCircleFill } from 'react-icons/ri';

const Register = () => {
    const styles = textFieldStyles();
    const { isLoggedIn } = useContext(DashboardContext)!;
    const [register, setRegister] = useState<UserRegisterType>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const router = useRouter();

    const handleClickPassword = () => setShowPassword(!showPassword);
    const handleClickPassword2 = () => setShowPassword2(!showPassword2);

    const registerAccount = () => {
        if (validateEmail(register.email) && register.password === register.confirmPassword && register.name !== '') {
            setError(false);
            postRegister();
        } else {
            setError(true);
        }
    };

    const postRegister = async () => {
        try {
            const response = await api.post('/auth/register', register);
            if (response) {
                console.log(response);
                ToastSuccess('Register Berhasil!');
            }
        } catch (e) {
            console.log(e);
            if (isAxiosError(e)) {
                if (e?.response?.status === 409) {
                    ToastError('Email Registered! Please use another Email');
                }
            } else {
                ToastError('Server Error!');
            }
        }
    };

    useEffect(() => {
        const logged = isLoggedIn();
        if (logged) {
            const notice = 'Already Logged in!';
            ToastError(notice);
            setTimeout(() => {
                router.push('/dashboard');
            }, 1000);
        }
    }, [router, isLoggedIn]);

    return (
        <>
            <Grid
                container
                sx={{ minHeight: '100vh', backgroundColor: '#E1DEE5' }}
                alignItems='center'
                justifyContent='center'
            >
                <Grid item xs={12} md={'auto'} sm={8} sx={{ p: 4 }}>
                    <Grid container direction='column' spacing={3}>
                        <Grid item container alignItems='center' justifyContent='center'>
                            <Image
                                src='/icon/foodtura.png'
                                alt='logo-transparent'
                                width={0}
                                height={0}
                                sizes='100%'
                                style={{
                                    maxWidth: '190px',
                                    width: '100%',
                                    height: 'auto'
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography
                                sx={{
                                    color: '#0D4066',
                                    fontSize: '48px',
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}
                            >
                                Register
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            container
                            direction='column'
                            spacing={2}
                            sx={{ minWidth: { xs: '100%', md: '500px' } }}
                        >
                            <Grid item>
                                <TextField
                                    fullWidth
                                    label={
                                        <>
                                            <RiAccountCircleFill
                                                style={{
                                                    fontSize: '24px',
                                                    marginRight: '8px'
                                                }}
                                            />{' '}
                                            {' Full Name'}
                                        </>
                                    }
                                    variant='outlined'
                                    onChange={(e) => {
                                        setRegister({
                                            ...register,
                                            name: e.target.value
                                        });
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            color: '#0D4066',
                                            borderColor: 'white',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    error={error && register.name === ''}
                                    className={styles.inputTextfield}
                                    sx={{
                                        input: {
                                            color: '#0D4066',
                                            fontWeight: 'bold'
                                        },
                                        '& label': {
                                            opacity: !register.name ? 1 : 0,
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                    aria-describedby='name'
                                />
                                <FormHelperText id='name' sx={{ color: 'red', ml: 1.5 }}>
                                    {error && register.name === '' ? 'Name cannot be empty!' : ''}
                                </FormHelperText>
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    label={
                                        <>
                                            <MdEmail
                                                style={{
                                                    fontSize: '24px',
                                                    marginRight: '8px'
                                                }}
                                            />{' '}
                                            {' Email Address'}
                                        </>
                                    }
                                    variant='outlined'
                                    onChange={(e) => {
                                        setRegister({
                                            ...register,
                                            email: e.target.value
                                        });
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            color: '#0D4066',
                                            borderColor: 'white',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    error={error && !validateEmail(register.email)}
                                    className={styles.inputTextfield}
                                    sx={{
                                        input: {
                                            color: '#0D4066',
                                            fontWeight: 'bold'
                                        },
                                        '& label': {
                                            opacity: !register.email ? 1 : 0,
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                    aria-describedby='email'
                                />
                                <FormHelperText id='email' sx={{ color: 'red', ml: 1.5 }}>
                                    {error && !validateEmail(register.email) ? 'Format Email not correct!' : ''}
                                </FormHelperText>
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    label={
                                        <>
                                            <AiFillLock
                                                style={{
                                                    fontSize: '24px',
                                                    marginRight: '8px'
                                                }}
                                            />{' '}
                                            {' Password'}
                                        </>
                                    }
                                    autoComplete='off'
                                    variant='outlined'
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={handleClickPassword} sx={{ color: '#0D4066' }}>
                                                    {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={(e) => {
                                        setRegister({
                                            ...register,
                                            password: e.target.value
                                        });
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            color: '#0D4066',
                                            borderColor: 'white',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    className={styles.inputTextfield}
                                    sx={{
                                        input: {
                                            color: '#0D4066',
                                            fontWeight: 'bold'
                                        },
                                        '& label': {
                                            opacity: !register.password ? 1 : 0,
                                            color: 'red',
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                    aria-describedby='password'
                                />
                                <FormHelperText id='password' sx={{ color: 'red', ml: 1.5 }}>
                                    {error && register.password === ''
                                        ? "Password can't be empty!"
                                        : register.password !== register.confirmPassword
                                        ? 'Password Not Match!'
                                        : ''}
                                </FormHelperText>
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    label={
                                        <>
                                            <AiFillLock
                                                style={{
                                                    fontSize: '24px',
                                                    marginRight: '8px'
                                                }}
                                            />{' '}
                                            {' Confirm Password'}
                                        </>
                                    }
                                    autoComplete='off'
                                    variant='outlined'
                                    type={showPassword2 ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={handleClickPassword2} sx={{ color: '#0D4066' }}>
                                                    {showPassword2 ? <MdVisibility /> : <MdVisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={(e) => {
                                        setRegister({
                                            ...register,
                                            confirmPassword: e.target.value
                                        });
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            color: '#0D4066',
                                            borderColor: 'white',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    className={styles.inputTextfield}
                                    sx={{
                                        input: {
                                            color: '#0D4066',
                                            fontWeight: 'bold'
                                        },
                                        '& label': {
                                            opacity: !register.confirmPassword ? 1 : 0,
                                            color: 'red',
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                    aria-describedby='confirm-password'
                                />
                                <FormHelperText id='confirm-password' sx={{ color: 'red', ml: 1.5 }}>
                                    {error && register.confirmPassword === ''
                                        ? "Password can't be empty!"
                                        : register.password !== register.confirmPassword
                                        ? 'Password Not Match!'
                                        : ''}
                                </FormHelperText>
                            </Grid>
                            <Grid item>
                                <Button
                                    sx={{
                                        width: '100%',
                                        backgroundColor: '#0E2979',
                                        color: 'black',
                                        textTransform: 'none',
                                        borderRadius: '18px',
                                        height: '50px',
                                        '&:hover': {
                                            backgroundColor: '#0E2979',
                                            opacity: 0.8
                                        },
                                        transition: '0.3s all'
                                    }}
                                    onClick={registerAccount}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '20px',
                                            fontWeight: 600,
                                            color: 'white'
                                        }}
                                    >
                                        Register
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid
                                item
                                container
                                direction='row'
                                justifyContent='space-between'
                                alignItems='center'
                                sx={{
                                    '@media (max-width:371px)': {
                                        justifyContent: 'center'
                                    },
                                    '@media (max-width:950px) and (min-width:900px)': {
                                        justifyContent: 'center'
                                    }
                                }}
                            >
                                <Grid item>
                                    <Link
                                        href='/dashboard/login'
                                        style={{
                                            color: 'inherit',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: '14px',
                                                textAlign: 'center',
                                                '&:hover': {
                                                    cursor: 'pointer',
                                                    color: 'gray'
                                                }
                                            }}
                                        >
                                            Already have an account?
                                        </Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Register;

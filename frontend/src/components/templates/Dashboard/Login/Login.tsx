import api from '@/api/axios-instance';
import { textFieldStyles } from '@/components/atoms/Textfield/Textfield';
import ToastError from '@/components/atoms/Toast/ToastError';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import { DashboardContext } from '@/contexts/DashboardContext/DashboardContext';
import { Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

const Login = () => {
    const [login, setLogin] = useState<{ email: string; password: string }>({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const handleClickPassword = () => setShowPassword(!showPassword);
    const styles = textFieldStyles();
    const router = useRouter();
    const { isLoggedIn } = useContext(DashboardContext)!;

    const loginAccount = async () => {
        try {
            const response = await api.post('/auth/login', login, {});
            if (response) {
                console.log(response);
                localStorage.setItem('user-data', JSON.stringify(response.data.data));
                ToastSuccess('Login Success!');
                router.push('/dashboard');
            }
        } catch (e) {
            if (isAxiosError(e)) {
                if (e?.response?.status === 400) {
                    ToastError('Invalid credentials!');
                } else if (e?.response?.status === 404) {
                    ToastError('Account not found!');
                }
            } else {
                ToastError('Unexpected Error!');
            }
        }
    };

    useEffect(() => {
        const logged = isLoggedIn();
        if (logged) {
            ToastError('Already Logged in!');
            setTimeout(() => {
                router.push('/dashboard');
            }, 1000);
        }
    }, [router, isLoggedIn]);

    return (
        <>
            <Grid
                container
                direction='column'
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
                                Sign In
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
                                            <AiOutlineMail
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
                                        setLogin({
                                            ...login,
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
                                    onKeyPress={(e) => {
                                        if (e.which === 13) {
                                            loginAccount();
                                        }
                                    }}
                                    className={styles.inputTextfield}
                                    sx={{
                                        input: {
                                            color: '#0D4066',
                                            fontWeight: 'bold'
                                        },
                                        '& label': {
                                            opacity: !login.email ? 1 : 0,
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                />
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
                                    onKeyPress={(e) => {
                                        if (e.which === 13) {
                                            loginAccount();
                                        }
                                    }}
                                    onChange={(e) => {
                                        setLogin({
                                            ...login,
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
                                            opacity: !login.password ? 1 : 0,
                                            color: 'red',
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                />
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
                                    onClick={loginAccount}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '20px',
                                            fontWeight: 600,
                                            color: 'white'
                                        }}
                                    >
                                        Login
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
                                        href='/dashboard/register'
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
                                            Don't have an account?
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
export default Login;

import { useRouter } from 'next/router';
import { isAxiosError } from 'axios';
import api from '@/api/axios-instance';
import { RiAccountCircleFill } from 'react-icons/ri';
import { useContext, useState } from 'react';
import { validateEmail } from '@/helper/validateEmail';
import { textFieldStyles } from '@/components/atoms/Textfield/Textfield';
import { Grid, Typography, Button, TextField, FormHelperText, Alert, InputAdornment, IconButton } from '@mui/material';
import ToastError from '@/components/atoms/Toast/ToastError';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import { AiFillLock } from 'react-icons/ai';
import { MdEmail, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import type { UserRegisterType } from '@/types/dashboard';
import { DashboardContext } from '@/contexts/DashboardContext/DashboardContext';

const RegisterEmployee = () => {
    const styles = textFieldStyles();
    const [register, setRegister] = useState<UserRegisterType>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState<boolean | null>(false);
    const [showPassword2, setShowPassword2] = useState<boolean | null>(false);
    const [error, setError] = useState<boolean>(false);
    const router = useRouter();
    const handleClickPassword = () => setShowPassword(!showPassword);
    const handleClickPassword2 = () => setShowPassword2(!showPassword2);
    const { userData } = useContext(DashboardContext)!;

    function registerAccount() {
        if (!(validateEmail(register.email) && register.password === register.confirmPassword && register.name)) {
            return setError(true);
        }

        setError(false);
        postRegister();
    }

    async function postRegister() {
        try {
            const response = await api.post('/users/officer', {
                ...register,
                merchantId: userData?.merchant?.merchantId
            });
            if (response) {
                ToastSuccess('Register Berhasil!');
                router.reload();
            }
        } catch (e) {
            if (isAxiosError(e)) {
                console.log(e);
                if (e?.response?.status === 409) {
                    ToastError('Email Registered! Please use another Email');
                }
            } else {
                ToastError('Server Error!');
            }
        }
    }

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" direction="column" sx={{ mt: 4 }}>
                <Alert sx={{ position: 'relative', bottom: 24, minWidth: { xs: '80%', md: '500px' } }} severity="info">
                    When you enroll a new member, the role type is automatically set to `Officer`!
                </Alert>

                <Grid item sx={{ marginTop: 6 }}>
                    {/* HEADING */}
                    <Typography
                        sx={{
                            color: '#0D4066',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 16
                        }}
                    >
                        Enroll New Employee
                    </Typography>

                    {/* FORMS REGISTER */}
                    <Grid
                        item
                        container
                        direction="column"
                        spacing={2}
                        sx={{ minWidth: { xs: '100%', md: '500px' }, marginTop: 2 }}
                    >
                        {/* FIELD FULL-NAME */}
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
                                        />
                                        {' Full Name'}
                                    </>
                                }
                                variant="outlined"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setRegister((prev) => ({ ...prev, name: e.target.value }));
                                }}
                                error={error && register.name === ''}
                                className={styles.inputTextfield}
                                InputLabelProps={{
                                    style: {
                                        color: '#0D4066',
                                        borderColor: 'white',
                                        fontWeight: 'bold'
                                    }
                                }}
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
                                aria-describedby="name"
                            />
                            <FormHelperText id="name" sx={{ color: 'red', ml: 1.5 }}>
                                {error && register.name === '' ? 'Name cannot be empty!' : null}
                            </FormHelperText>
                        </Grid>

                        {/* FIELD EMAIL-ADDRESS */}
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
                                        />
                                        {' Email Address '}
                                    </>
                                }
                                onChange={(e) => {
                                    e.preventDefault();
                                    setRegister((prev) => ({ ...prev, email: e.target.value }));
                                }}
                                variant="outlined"
                                error={error && !validateEmail(register.email)}
                                className={styles.inputTextfield}
                                InputLabelProps={{
                                    style: {
                                        color: '#0D4066',
                                        borderColor: 'white',
                                        fontWeight: 'bold'
                                    }
                                }}
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
                                aria-describedby="email"
                            />
                            <FormHelperText id="email" sx={{ color: 'red', ml: 1.5 }}>
                                {error && !validateEmail(register.email) ? 'Format Email not correct!' : null}
                            </FormHelperText>
                        </Grid>

                        {/* FIELD PASSWD */}
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
                                        />
                                        {' Password '}
                                    </>
                                }
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickPassword} sx={{ color: '#0D4066' }}>
                                                {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setRegister((prev) => ({ ...prev, password: e.target.value }));
                                }}
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="off"
                                className={styles.inputTextfield}
                                InputLabelProps={{
                                    style: {
                                        color: '#0D4066',
                                        borderColor: 'white',
                                        fontWeight: 'bold'
                                    }
                                }}
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
                                aria-describedby="password"
                            />
                            <FormHelperText id="password" sx={{ color: 'red', ml: 1.5 }}>
                                {error && register.password === ''
                                    ? "Password can't be empty!"
                                    : register.password !== register.confirmPassword
                                    ? 'Password Not Match!'
                                    : null}
                            </FormHelperText>
                        </Grid>

                        {/* FIELD CONFIRM PASSWD */}
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
                                        />
                                        {' Confirm Password '}
                                    </>
                                }
                                autoComplete="off"
                                variant="outlined"
                                type={showPassword2 ? 'text' : 'password'}
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
                                onChange={(e) => {
                                    e.preventDefault();
                                    setRegister((prev) => ({ ...prev, confirmPassword: e.target.value }));
                                }}
                                InputLabelProps={{
                                    style: {
                                        color: '#0D4066',
                                        borderColor: 'white',
                                        fontWeight: 'bold'
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickPassword2} sx={{ color: '#0D4066' }}>
                                                {showPassword2 ? <MdVisibility /> : <MdVisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                aria-describedby="confirm-password"
                            />
                            <FormHelperText id="confirm-password" sx={{ color: 'red', ml: 1.5 }}>
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
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default RegisterEmployee;

import ListEmployee from '@/components/molecules/Dashboard/Officer/Employee/ListEmployee';
import RegisterEmployee from '@/components/molecules/Dashboard/Officer/Employee/RegisterEmployee';
import { Grid, Button, Typography } from '@mui/material';
import { useState } from 'react';

const Employee = () => {
    const [isCreateUserBtn, setIsCreateUserBtn] = useState<boolean | null>(null);
    const handleCreateUserBtn = () => setIsCreateUserBtn(!isCreateUserBtn);

    return (
        <>
            <Grid container direction="column">
                <Grid item>
                    {isCreateUserBtn ? (
                        <RegisterEmployee />
                    ) : (
                        <>
                            <Grid item>
                                <Typography sx={{ fontSize: '28px', color: '#0e2979', fontWeight: 600 }}>
                                    Employee
                                </Typography>
                            </Grid>
                            <Grid
                                display="flex"
                                flexDirection="row-reverse"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ marginBottom: 2 }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={handleCreateUserBtn}
                                    sx={{
                                        visibility: `${isCreateUserBtn ? 'hidden' : 'visible'}`
                                    }}
                                >
                                    Add New Users
                                </Button>
                            </Grid>
                            <ListEmployee />
                        </>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default Employee;

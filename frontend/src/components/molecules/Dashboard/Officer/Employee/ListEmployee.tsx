import { Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from '@/api/axios-instance';
import { useContext, useEffect, useState } from 'react';
import { DashboardContext } from '@/contexts/DashboardContext/DashboardContext';
import ToastError from '@/components/atoms/Toast/ToastError';

const ListEmployee: React.FC = () => {
    const { userData } = useContext(DashboardContext)!;
    const [officer, setOfficer] = useState([]);

    const getOfficer = async () => {
        try {
            const response = await api.get(`/users/officer/${userData?.merchant?.merchantId}`);
            if (response) {
                console.log(response);
                setOfficer(() => response.data.data.officer);
            }
        } catch (e) {
            console.log(e);
            ToastError('Server Error!');
        }
    };

    useEffect(() => {
        getOfficer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Grid item>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role type</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Created at</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {officer.map((row: any, index) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>Officer</TableCell>
                                    <TableCell>Active</TableCell>
                                    <TableCell>{new Date(row.track.createdAt).toDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </>
    );
};

export default ListEmployee;

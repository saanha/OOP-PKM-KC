import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

interface AvailableTableProps {
    total: number;
    remaining: number;
}
const AvailableTable: React.FC<AvailableTableProps> = ({ total, remaining }) => {
    return (
        <>
            <Grid item width="25%" sx={{}}>
                <TableContainer component={Paper}>
                    <Grid
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ backgroundColor: '#0E2979', paddingY: 2 }}
                    >
                        <Typography style={{ color: 'white', fontWeight: 600, fontSize: '20px' }}>AVAILABLE</Typography>
                    </Grid>
                    <Table aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Remaining Table</TableCell>
                                <TableCell align="center">Total Table</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" sx={{ fontSize: '64px', fontWeight: 'bold' }}>
                                    {total}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: '64px', fontWeight: 'bold' }}>
                                    {remaining}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </>
    );
};

export default AvailableTable;

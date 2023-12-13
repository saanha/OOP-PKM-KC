import AvailableTable from '@/components/molecules/Dashboard/Officer/Tables/AvailableTable';
import ListTable from '@/components/molecules/Dashboard/Officer/Tables/ListTable';
import { Button, Divider, Grid } from '@mui/material';
import api from '@/api/axios-instance';
import { useContext, useEffect, useState } from 'react';
import { DashboardContext } from '@/contexts/DashboardContext/DashboardContext';
import type { TableDataType } from '@/types/dashboard';

const Table: React.FC = () => {
    const { userData } = useContext(DashboardContext)!;
    const [tableList, setTableList] = useState<TableDataType[] | []>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        if (userData?.merchant?.merchantId !== '') {
            getAllMerchantTable();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    const getAllMerchantTable = async () => {
        const { data: response } = await api.get(`/merchant/table/${userData?.merchant?.merchantId}`);
        console.log(response);
        if (response) {
            setTableList(response.data.tables);
        }
    };

    return (
        <>
            <Grid container sx={{}}>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: '12px',
                        marginY: 2
                    }}
                >
                    <Button variant="contained" onClick={() => setOpenModal(true)}>
                        Create New Table
                    </Button>
                </Grid>
            </Grid>

            <Divider sx={{ marginY: 2 }} />

            <Grid container direction="row" gap={4} justifyContent="space-between">
                <ListTable items={tableList} openModal={openModal} setOpenModal={setOpenModal} />
                <AvailableTable total={tableList.length} remaining={tableList.length} />
            </Grid>
        </>
    );
};

export default Table;

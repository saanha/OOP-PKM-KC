/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Typography, Button, TextField, Modal, Box } from '@mui/material';
import { DashboardContext } from '@/contexts/DashboardContext/DashboardContext';
import InputTableCard from './InputTableCard';
import { type Dispatch, type SetStateAction, useContext, useEffect, useState } from 'react';
import type { TableDataType } from '@/types/dashboard';
import api from '@/api/axios-instance';
import { AxiosError } from 'axios';
import ToastError from '@/components/atoms/Toast/ToastError';
import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import { useRouter } from 'next/router';
import QRCode from 'react-qr-code';

interface ListTableProps {
    items: TableDataType[];
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const TableCard = ({ item, i }: { item: TableDataType; i: number }) => {
    const [isMouseEnter, setIsMouseEnter] = useState<boolean | null>(null);
    const [onEdit, setOnEdit] = useState<boolean | null>(null);
    const [updatedItem, setUpdatedItem] = useState<TableDataType>({ ...item });
    const [openModal, setOpenModal] = useState<boolean>(false);
    const router = useRouter();
    const { userData } = useContext(DashboardContext)!;

    const trackChanges = () => {
        if (JSON.stringify(updatedItem) === JSON.stringify(item)) {
            return false;
        } else {
            return true;
        }
    };

    useEffect(() => {
        if (onEdit) return;

        if (!onEdit && trackChanges()) {
            updateTable();
        }
    }, [onEdit]);

    const updateTable = async () => {
        try {
            const { data: response, status } = await api.put(
                `/merchant/table/edit/${updatedItem.tableId}`,
                updatedItem
            );
            if (status === 200) {
                ToastSuccess('Table successfuly updated!');
                router.reload();
            }
            console.log({ response, status });
        } catch (error) {
            if (error instanceof AxiosError) {
                ToastError('cannot be updated the table, please check your input field');
            }
        }
    };

    return (
        <>
            <Modal
                open={openModal}
                onClose={() => setOpenModal((state) => !state)}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        pt: 2,
                        px: 4,
                        pb: 3
                    }}
                >
                    <Grid container direction="column" spacing={2} alignItems="center">
                        <Grid item>
                            <Typography sx={{ fontSize: '24px', textAlign: 'center' }}>
                                QR Code for {item.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <QRCode
                                value={`${process.env.NEXT_PUBLIC_API_URL?.split(':')[0]}:${
                                    process.env.NEXT_PUBLIC_API_URL?.split(':')[1]
                                }:3000/restaurant/${userData?.merchant?.merchantUrl}/${item.tableId}`}
                            />
                        </Grid>
                        <Grid item>
                            <a
                                target="_blank"
                                href={`${process.env.NEXT_PUBLIC_API_URL?.split(':')[0]}:${
                                    process.env.NEXT_PUBLIC_API_URL?.split(':')[1]
                                }:3000/restaurant/${userData?.merchant?.merchantUrl}/${item.tableId}`}
                            >
                                {`${process.env.NEXT_PUBLIC_API_URL?.split(':')[0]}:${
                                    process.env.NEXT_PUBLIC_API_URL?.split(':')[1]
                                }:3000/restaurant/${userData?.merchant?.merchantUrl}/${item.tableId}`}
                            </a>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            <Grid
                item
                container
                direction="column"
                sx={{
                    width: '100%',
                    gap: '20px',
                    border: '2px solid',
                    borderRadius: 2,
                    backgroundColor: 'white',
                    minHeight: '150px',
                    paddingY: 3,
                    paddingX: 3
                }}
                onMouseEnter={() => setIsMouseEnter((prev) => !prev)}
                onMouseLeave={() => setIsMouseEnter(false)}
            >
                <Grid item>
                    <Typography
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '28px'
                        }}
                    >
                        {`# Table ${i + 1}`}
                    </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        defaultValue={item.name ?? ''}
                        disabled={!onEdit}
                        onChange={(e) => {
                            setUpdatedItem((prev) => {
                                return { ...prev, name: e.target.value };
                            });
                        }}
                        label={<>{' Name '}</>}
                        aria-describedby="name"
                    >
                        {item.name}
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
                        defaultValue={item.size ?? ''}
                        disabled={!onEdit}
                        onChange={(e) => {
                            setUpdatedItem((prev) => {
                                return { ...prev, size: parseInt(e.target.value) };
                            });
                        }}
                        label={<>{' Size '}</>}
                        aria-describedby="size"
                    >
                        {item.name}
                    </TextField>
                </Grid>
                <Grid display="flex" sx={{ gap: '8px' }}>
                    {isMouseEnter ? (
                        <Button
                            variant="contained"
                            sx={{ marginY: '8px', paddingY: '8px' }}
                            onClick={() => setOnEdit(!onEdit)}
                        >
                            {onEdit ? 'Save' : 'Edit'}
                        </Button>
                    ) : null}
                    {isMouseEnter ? (
                        <Button
                            variant="contained"
                            sx={{ marginY: '8px', paddingY: '8px' }}
                            onClick={() => setOpenModal(() => true)}
                        >
                            QR Code
                        </Button>
                    ) : null}
                </Grid>
            </Grid>
        </>
    );
};

const ListTable: React.FC<ListTableProps> = ({ openModal, setOpenModal }) => {
    const [tableList, setTableList] = useState<TableDataType[] | []>([]);
    const { userData } = useContext(DashboardContext)!;

    useEffect(() => {
        if (userData?.merchant?.merchantId !== '') {
            getAllMerchantTable();
        }
    }, [userData]);

    const getAllMerchantTable = async () => {
        const { data: response } = await api.get(`/merchant/table/${userData?.merchant?.merchantId}`);
        if (response) {
            setTableList(response.data.tables);
        }
    };

    return (
        <>
            <Modal
                open={openModal}
                onClose={() => setOpenModal((state) => !state)}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        // width: 400,
                        bgcolor: 'background.paper',
                        pt: 2,
                        px: 4,
                        pb: 3
                    }}
                >
                    <InputTableCard tableIndex={tableList.length + 1} />
                </Box>
            </Modal>
            <Grid
                container
                direction="column"
                sx={{
                    width: '60%',
                    borderRadius: 2,
                    minHeight: '100vh'
                }}
                spacing={2}
            >
                {tableList?.map((item, i) => {
                    return (
                        <Grid item key={item.tableId}>
                            {i === tableList.length - 1 && item.name === 'create' && !item.size && !item.merchantId ? (
                                <InputTableCard tableIndex={i + 1} />
                            ) : (
                                <TableCard i={i} item={item} />
                            )}
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default ListTable;

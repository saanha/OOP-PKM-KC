import { Typography, Box } from '@mui/material';
import React from 'react';
import { BsImage } from 'react-icons/bs';

interface Props {
    title?: string;
    functionUpload: (_foto: string, _imageFile: File) => void;
    height: string;
    id: string;
}

const Uploader: React.FC<Props> = ({ title, functionUpload, height, id }) => {
    const handleDragEnter = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragLeave = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleDropUpdate = (imageFile: any) => {
        const reader = new FileReader();
        reader.onload = function (upload) {
            let foto: any = '';
            foto = upload.target?.result;
            functionUpload(foto, imageFile);
        };
        // console.log(imageFile);
        reader.onerror = (error) => {
            return error;
        };
        reader.readAsDataURL(imageFile);
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        const files = [...e.dataTransfer.files];
        if (files && files.length > 0) {
            const imageFile = files[0];
            const image = new Image();
            image.src = window.URL.createObjectURL(imageFile);
            handleDropUpdate(imageFile);
        }
    };

    const getImageBase64Input = (e: any) => {
        const imageFile = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (upload) {
            let foto: any = '';
            foto = upload.target?.result;
            // console.log(imageFile);
            functionUpload(foto, imageFile);
        };
        reader.onerror = (error) => {
            return error;
        };
        reader.readAsDataURL(imageFile);
    };

    return (
        <>
            <Box
                component='div'
                sx={{
                    p: 2,
                    width: '100%',
                    height,
                    border: '2px solid #D9D9D9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '8px',
                    borderRadius: '8px'
                }}
                onDragEnter={(e: any) => handleDragEnter(e)}
                onDragOver={(e: any) => handleDragOver(e)}
                onDragLeave={(e: any) => handleDragLeave(e)}
                onDrop={(e: any) => handleDrop(e)}
            >
                <Box component='div'>
                    <label htmlFor={id}>
                        <BsImage style={{ verticalAlign: 'middle', fontSize: '48px' }} />
                    </label>
                </Box>
                <input
                    id={id}
                    type='file'
                    accept='image/png, image/jpeg, image/jpg'
                    hidden
                    onClick={(e: any) => {
                        const { target = {} } = e || {};
                        target.value = '';
                    }}
                    onChange={async (e: any) => {
                        const image = new Image();
                        image.src = window.URL.createObjectURL(e.target.files[0]);
                        getImageBase64Input(e);
                    }}
                />
                <Typography sx={{ fontSize: '18px', textAlign: 'center', fontWeight: 'bold' }}>
                    {title}
                    <br />
                    <Typography
                        component={'span'}
                        sx={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            '&:hover': {
                                cursor: 'pointer'
                            }
                        }}
                    >
                        <label htmlFor={id}>or click here to upload!</label>
                    </Typography>
                </Typography>
            </Box>
        </>
    );
};

export default Uploader;

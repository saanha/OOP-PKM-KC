import { ButtonBase, Grid, Popover, Typography } from '@mui/material';
import { useState } from 'react';
import { type ColorResult, SketchPicker } from 'react-color';

const EditColorButton = ({
    colorInit,
    setNewColor,
    title
}: {
    colorInit: string | null;
    setNewColor: (arg: string) => void;
    title: string;
}) => {
    const [color, setColor] = useState(colorInit ? colorInit : '#000000');
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Grid container direction="column" alignItems="center">
                <Grid item sx={{ pb: 1 }}>
                    <Typography>{title}</Typography>
                </Grid>
                <Grid item>
                    <ButtonBase
                        sx={{
                            width: '75px',
                            height: '75px',
                            borderRadius: '50%',
                            backgroundColor: color
                        }}
                        onClick={handleClick}
                    />
                </Grid>
            </Grid>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <SketchPicker
                    disableAlpha
                    color={color!}
                    onChange={(e: ColorResult) => {
                        setColor(() => e.hex);
                        setNewColor(e.hex);
                    }}
                />
            </Popover>
        </>
    );
};

export default EditColorButton;

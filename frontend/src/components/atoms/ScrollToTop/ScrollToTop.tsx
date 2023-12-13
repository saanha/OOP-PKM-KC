import { Box, Fade, useScrollTrigger } from '@mui/material';

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

export default function ScrollTop(props: Props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector('#top');

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center'
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role='presentation'
                sx={{
                    position: 'sticky',
                    bottom: 16,
                    right: 16,
                    m: 0,
                    p: 0,
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    pr: 2
                }}
            >
                {children}
            </Box>
        </Fade>
    );
}

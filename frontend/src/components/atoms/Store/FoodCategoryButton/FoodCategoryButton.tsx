import type { ColorContextType } from '@/types/store';
import { Button, Typography } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';

const FoodCategoryButton = ({
    selectedCategory,
    index,
    setSelectedCategory,
    title,
    color,
    resetQuery
}: {
    selectedCategory: number;
    index: number;
    setSelectedCategory: Dispatch<SetStateAction<number>>;
    title: string;
    color: ColorContextType;
    resetQuery: () => void;
}) => {
    return (
        <>
            <Button
                sx={{
                    backgroundColor: selectedCategory === index ? color.secondary : color.primary,
                    '&:hover': {
                        backgroundColor: selectedCategory === index ? color.secondary : color.primary,
                        opacity: 0.8
                    },
                    width: '100%',
                    height: '100%',
                    borderRadius: 0
                }}
                onClick={() => {
                    setSelectedCategory(() => index);
                    resetQuery();
                }}
            >
                <Typography
                    sx={{
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: selectedCategory === index ? 'white' : color.third
                    }}
                >
                    {title}
                </Typography>
            </Button>
        </>
    );
};

export default FoodCategoryButton;

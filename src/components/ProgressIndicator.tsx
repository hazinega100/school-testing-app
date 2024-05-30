import React from 'react';
import { Box } from '@mui/material';

interface ProgressIndicatorProps {
    totalQuestions: number;
    currentQuestion: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ totalQuestions, currentQuestion }) => {
    const renderBlocks = () => {
        return Array.from({ length: totalQuestions }, (_, index) => {
            let backgroundColor;
            if (index < currentQuestion) {
                backgroundColor = 'black';
            } else if (index === currentQuestion) {
                backgroundColor = 'red';
            } else {
                backgroundColor = 'gray';
            }

            return (
                <Box
                    key={index}
                    sx={{
                        width: 30,
                        height: 5,
                        backgroundColor,
                        margin: '0 5px',
                        display: 'inline-block',
                    }}
                />
            );
        });
    };

    return (
        <Box sx={{ display: 'flex', marginBottom: 2, marginTop: 2 }}>
            {renderBlocks()}
        </Box>
    );
};

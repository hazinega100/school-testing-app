import React from 'react';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';

interface MultipleChoiceQuestionProps {
    questionId: string;
    questionText: string;
    options: string[];
    onSubmit: (questionId: string, answer: string | string[]) => void;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ questionId, questionText, options, onSubmit }) => {
    const { control, handleSubmit } = useForm();

    const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
        onSubmit(questionId, data.answer);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <h3>{questionText}</h3>
            <Controller
                name="answer"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <RadioGroup {...field}>
                        {options?.map((option, index) => (
                            <FormControlLabel key={index} value={option} control={<Radio color={"error"} />} label={option} />
                        ))}
                    </RadioGroup>
                )}
            />
            <Button variant={"contained"} color={"error"} type="submit">Отправить</Button>
        </form>
    );
};

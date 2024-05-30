import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import Button from "@mui/material/Button";

interface ShortAnswerQuestionProps {
    questionId: string;
    questionText: string;
    onSubmit: (questionId: string, answer: string) => void;
}

interface FormValues {
    answer: string;
}

export const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({ questionId, questionText, onSubmit }) => {
    const { control, handleSubmit } = useForm<FormValues>();

    const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
        onSubmit(questionId, data.answer);
    };

    return (
        <StyledForm onSubmit={handleSubmit(handleFormSubmit)}>
            <h3>{questionText}</h3>
            <Controller
                name="answer"
                control={control}
                defaultValue=""
                render={({ field }) => <StyledInput {...field} placeholder="Введите короткий ответ" />}
            />
            <div>
                <Button variant={"contained"} color={"error"} type="submit">Отправить</Button>
            </div>
        </StyledForm>
    );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  border: 1px solid gray;
`;

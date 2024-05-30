import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import Button from "@mui/material/Button";

interface DetailedResponseQuestionProps {
    questionId: string;
    questionText: string;
    onSubmit: (questionId: string, answer: string) => void;
}

interface FormValues {
    answer: string;
}

export const DetailedResponseQuestion: React.FC<DetailedResponseQuestionProps> = ({ questionId, questionText, onSubmit }) => {
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
                render={({ field }) => <StyledTextarea {...field} placeholder="Введите развернутый ответ" />}
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

const StyledTextarea = styled.textarea`
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  min-height: 100px;
  border: 1px solid gray;
`;

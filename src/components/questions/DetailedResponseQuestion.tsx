import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';

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
            <StyledButton type="submit">Отправить</StyledButton>
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
`;

const StyledButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

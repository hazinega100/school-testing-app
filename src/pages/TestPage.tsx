import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { loadQuestions, nextQuestion, previousQuestion, resetTest, saveAnswerToServer } from "../store/testSlice";
import { MultipleChoiceQuestion } from "../components/questions/MultipleChoiceQuestion";
import { ShortAnswerQuestion } from "../components/questions/ShortAnswerQuestion";
import styled from "styled-components";
import { Timer } from "../components/Timer";
import { Container } from "../components/Container";
import { StyledNavigateButton } from "../components/StyledNavigateButton";
import { ProgressIndicator } from "../components/ProgressIndicator";

export const TestPage: React.FC = () => {
    const { currentQuestion, questions, loading, error } = useSelector((state: RootState) => state.test);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(loadQuestions());
    }, [dispatch]);

    const handleAnswerSubmit = (questionId: string, answer: string | string[]) => {
        dispatch(saveAnswerToServer({ questionId, answer }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const question = questions[currentQuestion];

    return (
        <Container>
            <StyledTestPage>
                <Timer title={"Тестирование"} duration={600} />
                <ProgressIndicator totalQuestions={questions.length} currentQuestion={currentQuestion} />
                {question?.type === "multiple-choice" && question.options && (
                    <MultipleChoiceQuestion
                        onSubmit={handleAnswerSubmit}
                        questionId={question.id}
                        questionText={question.text}
                        options={question.options}
                    />
                )}
                {question?.type === "short-answer" && (
                    <ShortAnswerQuestion
                        onSubmit={handleAnswerSubmit}
                        questionId={question.id}
                        questionText={question.text}
                    />
                )}
                <StyledNavigateButton onClick={() => dispatch(previousQuestion())} disabled={currentQuestion === 0}>
                    Предыдущий
                </StyledNavigateButton>
                <StyledNavigateButton onClick={() => dispatch(resetTest())} disabled={currentQuestion === questions.length - 1}>
                    Сброс
                </StyledNavigateButton>
                <StyledNavigateButton onClick={() => dispatch(nextQuestion())} disabled={currentQuestion === questions.length - 1}>
                    Следующий
                </StyledNavigateButton>
            </StyledTestPage>
        </Container>
    );
};

const StyledTestPage = styled.div`
  margin-top: 100px;
  min-height: 100vh;
`;

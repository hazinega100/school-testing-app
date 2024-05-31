import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import axios from 'axios';

export interface Question {
    id: string;
    type: string;
    text: string;
    options?: string[];
}

interface TestState {
    questions: Question[];
    currentQuestion: number;
    loading: boolean;
    error: string | null;
}

const initialState: TestState = {
    questions: [],
    currentQuestion: 0,
    loading: false,
    error: null,
};

export const loadQuestions = createAsyncThunk('test/loadQuestions', async () => {
    const response = await axios.get<Question[]>('http://localhost:3001/questions');
    return response.data;
});

const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        nextQuestion(state) {
            if (state.currentQuestion < state.questions.length - 1) {
                state.currentQuestion++;
                localStorage.setItem('currentQuestion', state.currentQuestion.toString());
            }
        },
        previousQuestion(state) {
            if (state.currentQuestion > 0) {
                state.currentQuestion--;
                localStorage.setItem('currentQuestion', state.currentQuestion.toString());
            }
        },
        resetTest(state) {
            state.currentQuestion = 0;
            localStorage.setItem('currentQuestion', '0');
        },
        setCurrentQuestion(state, action: PayloadAction<number>) {
            state.currentQuestion = action.payload;
            localStorage.setItem('currentQuestion', action.payload.toString());
        },
        saveAnswerToServer(state, action: PayloadAction<{ questionId: string; answer: string | string[] }>) {
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload;
            })
            .addCase(loadQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load questions';
            });
    },
});

export const { nextQuestion, previousQuestion, resetTest, setCurrentQuestion, saveAnswerToServer } = testSlice.actions;

export default testSlice.reducer;

export const selectCurrentQuestion = (state: RootState) => state.test.currentQuestion;
export const selectQuestions = (state: RootState) => state.test.questions;
export const selectLoading = (state: RootState) => state.test.loading;
export const selectError = (state: RootState) => state.test.error;

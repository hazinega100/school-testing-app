import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchQuestions, submitAnswer} from "../api/questions";

interface Answer {
    questionId: string;
    answer: string | string[];
}

export interface Question {
    id: string;
    type: string;
    text: string;
    options?: string[];
}

interface TestState {
    answers: Answer[];
    questions: Question[];
    currentQuestion: number;
    startTime: number;
    loading: boolean;
    error: string | null;
}

const initialState: TestState = {
    answers: [],
    questions: [],
    currentQuestion: 0,
    startTime: Date.now(),
    loading: false,
    error: null,
};

export const loadQuestions = createAsyncThunk('test/loadQuestions', async () => {
    return await fetchQuestions();
});

export const saveAnswerToServer = createAsyncThunk(
    'test/saveAnswerToServer',
    async ({ questionId, answer }: { questionId: string; answer: string | string[] }) => {
        await submitAnswer(questionId, answer);
        return { questionId, answer };
    }
);

const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        nextQuestion: (state) => {
            state.currentQuestion += 1;
        },
        previousQuestion: (state) => {
            state.currentQuestion -= 1;
        },
        resetTest: (state) => {
            state.answers = [];
            state.currentQuestion = 0;
            state.startTime = Date.now();
            localStorage.removeItem('testTimer');
            localStorage.removeItem('testTimeLeft');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadQuestions.fulfilled, (state, action: PayloadAction<Question[]>) => {
                state.loading = false;
                state.questions = action.payload;
            })
            .addCase(loadQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load questions';
            })
            .addCase(saveAnswerToServer.fulfilled, (state, action: PayloadAction<Answer>) => {
                const existingAnswer = state.answers.find(a => a.questionId === action.payload.questionId);
                if (existingAnswer) {
                    existingAnswer.answer = action.payload.answer;
                } else {
                    state.answers.push(action.payload);
                }
            });
    },
});

export const { nextQuestion, previousQuestion, resetTest } = testSlice.actions;
export default testSlice.reducer;

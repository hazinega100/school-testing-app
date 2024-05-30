import axios from 'axios';
import {Question} from "../store/testSlice";

const API_BASE_URL = 'http://localhost:3001'; // Мок-сервер URL

export const fetchQuestions = async () => {
    const response = await axios.get<Question[]>(`${API_BASE_URL}/questions`);
    return response.data;
};

export const submitAnswer = async (questionId: string, answer: string | string[]) => {
    const response = await axios.post(`${API_BASE_URL}/answers`, { questionId, answer });
    return response.data;
};

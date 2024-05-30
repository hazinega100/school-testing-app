import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetTest } from '../store/testSlice';
import styled from "styled-components";

interface TimerProps {
    title: string;
    duration: number;
}

export const Timer: React.FC<TimerProps> = ({ title, duration }) => {
    const [timeLeft, setTimeLeft] = useState<number>(duration);

    useEffect(() => {
        const savedTime = localStorage.getItem('testTimer');
        if (savedTime) {
            const parsedTime = parseInt(savedTime, 10);
            const currentTime = Date.now();
            const elapsed = Math.floor((currentTime - parsedTime) / 1000);
            setTimeLeft((prev) => Math.max(prev - elapsed, 0));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('testTimer', Date.now().toString());
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) {
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                const newTime = prev - 1;
                localStorage.setItem('testTimeLeft', newTime.toString());
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        localStorage.setItem('testTimeLeft', timeLeft.toString());
    }, [timeLeft]);

    return (
        <div>
            <StyledTitle>{title} <span>{Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</span></StyledTitle>
        </div>
    );
};

const StyledTitle = styled.h2`
  & span {
    font-weight: 400;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 0 15px;
  }
`

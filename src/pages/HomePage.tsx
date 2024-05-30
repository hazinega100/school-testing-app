import React from 'react';
import { Link } from 'react-router-dom';
import {Button, Container} from "@mui/material";
import styled from "styled-components";

export const HomePage: React.FC = () => {
    return (
        <Container>
            <StyledHomePage>
                <h1>Добро пожаловать в школу по подготовке к ЕГЭ</h1>
                <Link to="/questions">
                    <Button variant="contained" color="primary">
                        Давай начнем
                    </Button>
                </Link>
            </StyledHomePage>
        </Container>
    );
};

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  & h1 {
    margin-bottom: 30px;
  }
`

import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';

describe('Testando a página Feedback', () => {
  test('Ao acessar diretamente a rota /feedback, o score, score total e questões certas serão 0', () => {
    renderWithRouterAndRedux(<Feedback />);
  
    const headerScore = screen.getByTestId('header-score');
    expect(headerScore).toBeInTheDocument();
    const totalScore = screen.getByTestId('feedback-total-score');
    expect(totalScore).toBeInTheDocument();
    const totalQuestion = screen.getByTestId('feedback-total-question');
    expect(totalQuestion).toBeInTheDocument();
    const msg = screen.getByTestId('feedback-text');
    expect(msg).toBeInTheDocument();
    expect(headerScore.innerHTML).toEqual('0');
    expect(totalScore.innerHTML).toEqual('0');
    expect(totalQuestion.innerHTML).toEqual('0');
    expect(msg.innerHTML).toEqual('Could be better...');
  });
  test('Ao acessar diretamente a rota /feedback o name deve estár vazio e alguma imagem está presente', () => {
    renderWithRouterAndRedux(<Feedback />);
  
    const headerName = screen.getByTestId('header-player-name');
    expect(headerName).toBeInTheDocument()
    expect(headerName.innerHTML).toEqual('');
    const img = screen.getByTestId('header-profile-picture');
    expect(img).toBeInTheDocument();
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';
import App from '../App';

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
  test('Testando se o botão Play-Again funciona', () => {
    const initialState = {};
    const route = '/feedback';
    const { history } = renderWithRouterAndRedux(<App />, initialState, route );
    expect( history.location.pathname ).toBe('/feedback');

    const btnPlayAgain = screen.getByTestId('btn-play-again');
    expect(btnPlayAgain).toBeInTheDocument();
    userEvent.click(btnPlayAgain);
    expect(history.location.pathname).toBe('/');
  })
  test('Testando se o botão Ranking funciona', () => {
    const initialState = {};
    const initialStateData = {
      ranking: [
        {
          name: "Bruno",
          assertions: 2,
          score: 165,
          gravatarEmail: "bruno@gmail.com"
        }
      ]
    };
    localStorage.setItem("Ranking", JSON.stringify(initialStateData.ranking));
    const route = '/feedback';
    const { history } = renderWithRouterAndRedux(<App />, initialState, route );
    expect( history.location.pathname ).toBe('/feedback');

    const btnRanking = screen.getByTestId('btn-ranking');
    expect(btnRanking).toBeInTheDocument();
    userEvent.click(btnRanking);
    expect(history.location.pathname).toBe('/ranking');
  })
  test('Testando se a mensagem muda de acordo com os acertos', () => {
    const initialState = {
      player: 
        {
          name: "Bruno",
          assertions: 3,
          score: 165,
          gravatarEmail: "bruno@gmail.com"
        }
    };
    const route = '/feedback';
    const { history } = renderWithRouterAndRedux(<App />, initialState, route );
    expect( history.location.pathname ).toBe('/feedback');

    const msg = screen.getByTestId('feedback-text');
    expect(msg).toBeInTheDocument();
    expect(msg.innerHTML).toBe('Well Done!');

  })
});

import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';
import App from '../App';
import {API_LOGIN, API_QUESTIONS} from './helpers/APIsResult';
import { useStore } from 'react-redux';
      
describe('Testando a página Game', () => {
  afterEach(() => {
    // jest.clearAllMocks(); // limpa os mocks antes de cada teste
  });

    beforeEach(() => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(API_QUESTIONS),
      })
      // global.fetch = jest.fn(() => Promise.resolve({
      //   json: () => Promise.resolve(API_QUESTIONS),
      // }))
    })
    
    it('Testando se todos os elementos foram renderizados corretamente na tela', async () => {
      // const test = jest.spyOn(global, 'fetch');
      // global.fetch.mockResolvedValue({
      //   json: jest.fn().mockResolvedValue(API_QUESTIONS),
      // })
      // global.fetch = jest.fn(() => Promise.resolve({
      //   json: () => Promise.resolve(API_QUESTIONS),
      // }))
      const initialState = {
        player: 
          {
            name: "Bruno",
            assertions: 0,
            score: 0,
            gravatarEmail: "bruno@gmail.com"
          }
      };
      const route = '/game';
      localStorage.setItem("token", API_LOGIN.token);
      const {history} = renderWithRouterAndRedux(<App />, initialState, route );
      expect( history.location.pathname ).toBe('/game');

          const player = await screen.findByTestId('header-player-name');
          expect(player).toBeInTheDocument();
          expect(player.innerHTML).toBe('Bruno');

          const score = screen.getByTestId('header-score');
          expect(score).toBeInTheDocument();
          expect(score.innerHTML).toBe('0');

          const timer = screen.getByRole('heading', { level: 4 });
          expect(timer.innerHTML).toBe('30');

          const question = screen.queryByText("In Terraria, which of the following items does the Martian Saucer mini-boss NOT drop?");
          expect(question).toBeInTheDocument();

          const category = screen.getByTestId('question-category');
          expect(category.innerHTML).toBe('Entertainment: Video Games');

          const correctAnswer = screen.getByTestId('correct-answer');
          expect(correctAnswer).toBeInTheDocument();
          expect(correctAnswer.innerHTML).toBe('Drill Containment Unit');

          const wrongAnswers = screen.getAllByTestId(/wrong-answer-/i);
          expect(wrongAnswers).toHaveLength(3);

          const btnNext = screen.queryByTestId('btn-next');
          expect(btnNext).not.toBeInTheDocument();
    })

    it('Testando se o timer esta sendo reduzido corretamente', async () => {
      const initialState = {
        player: 
          {
            name: "Bruno",
            assertions: 0,
            score: 0,
            gravatarEmail: "bruno@gmail.com"
          }
      };
      const route = '/game';
      localStorage.setItem("token", API_LOGIN.token);
      const {history} = renderWithRouterAndRedux(<App />, initialState, route );
      expect( history.location.pathname ).toBe('/game');

          const question = await screen.findByText("In Terraria, which of the following items does the Martian Saucer mini-boss NOT drop?");
          expect(question).toBeInTheDocument();

          const timer = await screen.findByRole('heading', { level: 4 });
          expect(timer.innerHTML).toBe('30');
          await waitFor(() => {
            expect(timer.innerHTML).toBe('27');
          }, {timeout:3000 , interval: 1000});
    })

    it('Testando se quando o timer chega a 0 a página renderiza corretamente', async () => {
      const initialState = {
        player: 
          {
            name: "Bruno",
            assertions: 0,
            score: 0,
            gravatarEmail: "bruno@gmail.com"
          },
          timer: 
          {
            timeIsOver: true,
            time: 0,
          },
      };
      const route = '/game';
      localStorage.setItem("token", API_LOGIN.token);
      const {history} = renderWithRouterAndRedux(<App />, initialState, route );
      expect( history.location.pathname ).toBe('/game');

          const question = await screen.findByText("In Terraria, which of the following items does the Martian Saucer mini-boss NOT drop?");
          expect(question).toBeInTheDocument();

          const timer = await screen.findByRole('heading', { level: 4 });
          expect(timer.innerHTML).toBe('0');

          const btnCorrect = screen.getByTestId('correct-answer');
          const btnIncorrects = screen.getAllByTestId(/wrong-answer/i);
          expect(btnCorrect).toBeInTheDocument();
          expect(btnIncorrects).toHaveLength(3);
          await waitFor(() => {
            expect(btnCorrect).toHaveClass('correct');
          })
          expect(btnIncorrects[0]).toHaveClass('wrong');

          const btnNext = screen.getByTestId('btn-next');
          expect(btnNext).toBeInTheDocument();
    })

    it('Testando se a página volta para a Home quando não é informado um token', async () => {
      jest.resetAllMocks();
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          "response_code":3,
          "results":[]
        }),
      })
      const initialState = {
        player: 
          {
            name: "Bruno",
            assertions: 0,
            score: 0,
            gravatarEmail: "bruno@gmail.com"
          },
          timer: 
          {
            timeIsOver: true,
            time: 0,
          },
      };
      const route = '/game';
      localStorage.setItem("token", API_LOGIN.token);
      const {history} = renderWithRouterAndRedux(<App />, initialState, route );
      await waitFor(() => {
        expect( history.location.pathname ).toBe('/');
      })
    })
    it('Testando se o jogo está funcionando normalmente', async () => {
      const initialState = {
        player: 
          {
            name: "Bruno",
            assertions: 0,
            score: 0,
            gravatarEmail: "bruno@gmail.com"
          },
          timer: 
          {
            timeIsOver: true,
            time: 0,
          },
      };
      const route = '/game';
      localStorage.setItem("token", API_LOGIN.token);
      const {history, store} = renderWithRouterAndRedux(<App />, initialState, route );
      expect( history.location.pathname ).toBe('/game');

      const firstQuestion = await screen.findByText('In Terraria, which of the following items does the Martian Saucer mini-boss NOT drop?');
      expect(firstQuestion).toBeInTheDocument();
      
      const firstAnswer = await screen.findByText('Drill Containment Unit'); //correta 10 + (30 * 2)
      expect(firstAnswer).toBeInTheDocument();

      userEvent.click(firstAnswer);
      // await waitFor( () => {
        // const score = screen.getByTestId('header-score')
        // expect(score).toBeInTheDocument()
      //   expect(score.innerHTML).toBe('70')
      //   const assertions = screen.getByTestId('feedback-total-question')
      //   expect(assertions).toBeInTheDocument();
      //   expect(assertions.innerHTML).toBe('1')

      // }, 4000)

      const btnFirstNext = screen.getByTestId('btn-next');
      userEvent.click(btnFirstNext);

      const secondQuestion = await screen.findByText('Which animal was part of an Russian domestication experiment in 1959?');
      expect(secondQuestion).toBeInTheDocument();

      const secondAnswer = await screen.findByText('Foxes') // correta 10 + (30 * 3)
      userEvent.click(secondAnswer);

      const btnSecondNext = screen.getByTestId('btn-next');
      userEvent.click(btnSecondNext);

      const thirdQuestion = await screen.findByText('Which sci-fi cult films plot concerns aliens attempting to prevent humans from creating a doomsday weapon?');
      expect(thirdQuestion).toBeInTheDocument();

      
      const thirdAnswer = await screen.findByText('It Came from Outer Space') // incorreta

      userEvent.click(thirdAnswer);

      const btnThirdNext = screen.getByTestId('btn-next');
      userEvent.click(btnThirdNext);

      const fourthQuestion = await screen.findByText('Which country is the Taedong River in?');
      expect(fourthQuestion).toBeInTheDocument();

      const fourthAnswer = await screen.findByText('China') // incorreta
      userEvent.click(fourthAnswer);

      const btnFourthNext = screen.getByTestId('btn-next');
      userEvent.click(btnFourthNext);

      const fifthQuestion = await screen.findByText('In The Simpsons, which war did Seymour Skinner serve in the USA Army as a Green Beret?');
      expect(fifthQuestion).toBeInTheDocument();

      const fifthAnswer = await screen.findByText('Vietnam War') // correta 10 + (30 * 1)
      userEvent.click(fifthAnswer);

      const btnFifthNext = screen.getByTestId('btn-next');
      userEvent.click(btnFifthNext);

      await waitFor(() => {
        expect( history.location.pathname ).toBe('/feedback');
      })
      // const totalScore = await screen.findByTestId('feedback-total-score');
      // await waitFor(() => {
      //   expect(totalScore.innerHTML).toBe('210')

      // })
    })
  });
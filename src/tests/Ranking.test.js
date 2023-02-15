import React from "react";
import { screen } from "@testing-library/react";

import App from "../App";
import renderWithRuterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";

describe("Testa o componente <Ranking />", () => {
  test("Testa se a página contém os elementos", () => {
    const initialState = {};
    const initialStateData = {
      ranking: [
        {
          name: "Bruno",
          assertions: 2,
          score: 165,
          gravatarEmail: "bruno@gmail.com"
        },
        {
          name: "Allan",
          assertions: 4,
          score: 195,
          gravatarEmail: "allan@gmail.com"
        }
      ]
    };
    const route = "/ranking";
    localStorage.setItem("Ranking", JSON.stringify(initialStateData.ranking));

    renderWithRuterAndRedux(<App />, initialState, route);

    const title = screen.getByTestId("ranking-title");
    expect(title).toBeInTheDocument();

    const btnHome = screen.getByTestId("btn-go-home");
    expect(btnHome).toBeInTheDocument();

    const name = screen.getAllByTestId(/player-name-/i);
    expect(name).toHaveLength(2);

  });
  test("testa se o Botão 'inicio' manda para a tela inicial", () => {
    const initialState = {};

    const route = "/ranking";
    const { history } = renderWithRuterAndRedux(<App />, initialState, route);

    const btnHome = screen.getByTestId("btn-go-home");
    expect(btnHome).toBeInTheDocument();

    userEvent.click(btnHome);
    (expect(history.location.pathname).toBe("/"))
  });
});

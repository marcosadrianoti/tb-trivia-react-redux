import React from "react";
import {  screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderWithRouterAndRedux from "../helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import App from "../../App";

describe("Loading tests", () => {
  test("Test player name input", () => {
    renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId("input-player-name");
    expect(nameInput).toBeInTheDocument();
    userEvent.type(nameInput, "testname");
    expect(nameInput.value).toBe("testname");
  });

  test("Test email input", () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId("input-gravatar-email");
    expect(emailInput).toBeInTheDocument();
    userEvent.type(emailInput, "test@emailtest.com");
    expect(emailInput.value).toBe("test@emailtest.com");
  });

  test("Test configure button", () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const configButton = screen.getByTestId("btn-settings");
    expect(configButton).toBeInTheDocument();
    userEvent.click(configButton);
    expect(history.location.pathname).toBe("/settings");
  });

  test('Test play button', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId("input-player-name");
    const emailInput = screen.getByTestId("input-gravatar-email");
    userEvent.type(nameInput, "joestar");
    userEvent.type(emailInput, "joestar@warudo.com");
    const playButton = screen.getByTestId("btn-play");
    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeEnabled();
    await waitFor(() => userEvent.click(playButton));

    await waitFor(() => expect(history.location.pathname).toBe('/game'));
  });
});

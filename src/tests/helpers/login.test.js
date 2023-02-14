// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import { MemoryRouter as Router } from "react-router-dom";
// import { Provider } from "react-redux";
// import configureStore from "redux-mock-store";
// import App from "../App";

// const mockStore = configureStore([]);

// describe("Loading tests", () => {
//   test("Test player name input", () => {
//     render(
//       <Provider store={mockStore({})}>
//         <Router>
//           <App />
//         </Router>
//       </Provider>
//     );
//     const nameInput = screen.getByTestId("input-player-name");
//     expect(nameInput).toBeInTheDocument();
//     userEvent.type(nameInput, "testname");
//     expect(nameInput.value).toBe("testname");
//   });
  
//   test("Test email input", () => {
//     render(
//       <Provider store={mockStore({})}>
//         <Router>
//           <App />
//         </Router>
//       </Provider>
//     );
//     const emailInput = screen.getByTestId("input-gravatar-email");
//     expect(emailInput).toBeInTheDocument();
//     userEvent.type(emailInput, "test@emailtest.com");
//     expect(emailInput.value).toBe("test@emailtest.com");
//   });

//   test("Test configure button", () => {
//     const { history } = render(
//       <Provider store={mockStore({})}>
//         <Router>
//           <App />
//         </Router>
//       </Provider>
//     );
//     const configButton = screen.getByTestId("btn-settings");
//     expect(configButton).toBeInTheDocument();
//     userEvent.click(configButton);
//     expect(history.location.pathname).toBe("/settings");
//   });
  
//   test('Test play button', async () => {
//     const { history } = render(
//       <Provider store={mockStore({})}>
//         <Router>
//           <App />
//         </Router>
//       </Provider>
//     );
//     const nameInput = screen.getByTestId("input-player-name");
//     const emailInput = screen.getByTestId("input-gravatar-email");
//     userEvent.type(nameInput, "joestar");
//     userEvent.type(emailInput, "joestar@warudo.com");
//     const playButton = screen.getByTestId("btn-play");
//     expect(playButton).toBeInTheDocument();
//     expect(playButton).toBeEnabled();
//     userEvent.click(playButton);
//     await waitFor(() => expect(history.location.pathname).toBe('/Game'));
//   });
// });

import React from "react";
import { render, screen } from "@testing-library/react";

import RegistrationPage from "../RegistrationPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders registration page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RegistrationPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("registration-datatable")).toBeInTheDocument();
    expect(screen.getByRole("registration-add-button")).toBeInTheDocument();
});

import React from "react";
import { render, screen } from "@testing-library/react";

import TransactionsPage from "../TransactionsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders transactions page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TransactionsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("transactions-datatable")).toBeInTheDocument();
    expect(screen.getByRole("transactions-add-button")).toBeInTheDocument();
});

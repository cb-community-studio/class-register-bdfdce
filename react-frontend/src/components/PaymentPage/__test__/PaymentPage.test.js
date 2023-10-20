import React from "react";
import { render, screen } from "@testing-library/react";

import PaymentPage from "../PaymentPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders payment page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PaymentPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("payment-datatable")).toBeInTheDocument();
    expect(screen.getByRole("payment-add-button")).toBeInTheDocument();
});

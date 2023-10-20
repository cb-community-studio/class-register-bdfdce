import React from "react";
import { render, screen } from "@testing-library/react";

import ReceiptPage from "../ReceiptPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders receipt page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ReceiptPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("receipt-datatable")).toBeInTheDocument();
    expect(screen.getByRole("receipt-add-button")).toBeInTheDocument();
});

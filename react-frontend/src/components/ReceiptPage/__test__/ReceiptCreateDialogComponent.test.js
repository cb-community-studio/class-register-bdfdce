import React from "react";
import { render, screen } from "@testing-library/react";

import ReceiptCreateDialogComponent from "../ReceiptCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders receipt create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ReceiptCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("receipt-create-dialog-component")).toBeInTheDocument();
});

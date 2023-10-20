import React from "react";
import { render, screen } from "@testing-library/react";

import PurchaseorderPage from "../PurchaseorderPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders purchaseorder page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PurchaseorderPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("purchaseorder-datatable")).toBeInTheDocument();
    expect(screen.getByRole("purchaseorder-add-button")).toBeInTheDocument();
});

import React from "react";
import { render, screen } from "@testing-library/react";

import DiscountPage from "../DiscountPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders discount page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DiscountPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("discount-datatable")).toBeInTheDocument();
    expect(screen.getByRole("discount-add-button")).toBeInTheDocument();
});

import React from "react";
import { render, screen } from "@testing-library/react";

import LecturersPage from "../LecturersPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders lecturers page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LecturersPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("lecturers-datatable")).toBeInTheDocument();
    expect(screen.getByRole("lecturers-add-button")).toBeInTheDocument();
});

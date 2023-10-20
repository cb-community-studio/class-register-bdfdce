import React from "react";
import { render, screen } from "@testing-library/react";

import TimetablePage from "../TimetablePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders timetable page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TimetablePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("timetable-datatable")).toBeInTheDocument();
    expect(screen.getByRole("timetable-add-button")).toBeInTheDocument();
});

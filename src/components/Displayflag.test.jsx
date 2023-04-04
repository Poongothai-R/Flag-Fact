
import { render, fireEvent, screen } from "@testing-library/react";
import DisplayFlag from "./DisplayFlag";

describe("DisplayFlag", () => {
    const data = [
        { name: { common: "United States" }, flag: "us.png" },
        { name: { common: "Canada" }, flag: "ca.png" },
        { name: { common: "Mexico" }, flag: "mx.png" }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render a list of flag items based on the data prop", () => {
        render(<DisplayFlag data={data} />);
        const flagItems = screen.getAllByTestId("flag-item");
        expect(flagItems.length).toBe(data.length);
    });

    it("should filter the list of flag items based on the search input", async () => {
        render(<DisplayFlag data={data} />);
        const searchInput = screen.getByRole("textbox", { name: /search/i });

        // Enter "united" into the search input
        fireEvent.change(searchInput, { target: { value: "united" } });

        // Wait for the filter to be applied
        await screen.findByTestId("flag-item");

        // Expect only the United States flag item to be displayed
        const flagItems = screen.getAllByTestId("flag-item");
        expect(flagItems.length).toBe(1);
        expect(flagItems[0]).toHaveTextContent("United States");

        // Clear the search input
        fireEvent.change(searchInput, { target: { value: "" } });

        // Wait for the filter to be removed
        await screen.findByTestId("flag-item");

        // Expect all flag items to be displayed again
        expect(flagItems.length).toBe(data.length);
    });
});

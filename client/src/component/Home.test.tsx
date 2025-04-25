import { render, screen} from "@testing-library/react";
import Home from "./Home.tsx";
import { describe, it, expect, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { vi } from 'vitest';

const mockUsedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
   const actual = await vi.importActual("react-router-dom")
   return {...actual, useNavigate: () => mockUsedNavigate} 
});


describe ("Home", () => {

    beforeEach(() => {
        mockUsedNavigate.mockClear();
    })

    render(<Home/>);

    it("renders Fly Typer description", () => {
        expect(screen.getByText(/Increase your typing speed while racing against others!/i)).toBeInTheDocument();
    })
    
    it("QuickPLay button", async () => {
        const button = screen.getByRole("button", {name: /Quick play/i});
        const quickPlayValue = screen.getByTestId("qp-value");
        
        expect(quickPlayValue.textContent).toEqual("Quick play");

        await userEvent.click(button);
    })

    it('should call navigate when clicked', async () => {
        const button = screen.getByRole("button", {name: /Quick play/i});

        await userEvent.click(button);
        
        expect(mockUsedNavigate).toHaveBeenCalledWith('/quickplay');
        
      });
})
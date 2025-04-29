import { render, screen} from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { vi } from 'vitest';
import Navbar from "./Navbar.tsx";

const mockUsedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
   const actual = await vi.importActual("react-router-dom")
   return {...actual, useNavigate: () => mockUsedNavigate}
});


describe ("Navbar", () => {

    beforeEach(() => {
        mockUsedNavigate.mockClear();
    })

    render(<Navbar/>);

    it("should render the Fly Typer text", () => {
        const flyTyper = screen.getByTestId("nav-flyTyper")
        expect(flyTyper).toBeInTheDocument();
        expect(flyTyper.getAttribute("href")).toBe("/");
        expect(flyTyper.textContent).toBe("Fly Typer");

    })

    it("should render the Home text", () => {
        const home = screen.getByTestId("nav-home")
        expect(home).toBeInTheDocument();
        expect(home.getAttribute("href")).toBe("/");
        expect(home.textContent).toBe("Home");

    })

    it("should render the Login text", () => {
        const login = screen.getByTestId("nav-login")
        expect(login).toBeInTheDocument();
        expect(login.getAttribute("href")).toBe("/");
        expect(login.textContent).toBe("Login");

    })

})
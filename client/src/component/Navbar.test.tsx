import {render, screen} from "@testing-library/react";
import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import "@testing-library/jest-dom/vitest";
import { vi } from 'vitest';
import Navbar from "./Navbar.tsx";
import userEvent from "@testing-library/user-event";

const mockUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
   const actual = await vi.importActual("react-router-dom")
   return {...actual, useNavigate: () => mockUseNavigate}
});


describe ("Navbar", () => {

  beforeAll(() => {
    render(<Navbar/>);
  })

  beforeEach(() => {
      mockUseNavigate.mockClear();
    })

  it("should render the Fly Typer text", async () => {
      const flyTyper = screen.getByRole('link', { name: /Fly Typer/i });
      expect(flyTyper).toBeInTheDocument();
      expect(flyTyper).toHaveAttribute('href', '/');
      expect(flyTyper).toHaveTextContent("Fly Typer");
      await userEvent.click(flyTyper);
      expect(mockUseNavigate).toHaveBeenCalledWith('/');
    })

  it("should render the Home text", async () => {
      const home = screen.getByRole('link', { name: /Home/i });
      expect(home).toBeInTheDocument();
      expect(home).toHaveAttribute('href', '/');
      expect(home).toHaveTextContent("Home");
      await userEvent.click(home);
      expect(mockUseNavigate).toHaveBeenCalledWith('/');
  })

  it("should render the Login text",async () => {
      const login = screen.getByRole('link', { name: /Login/i });
      expect(login).toBeInTheDocument();
      expect(login).toHaveAttribute('href', '/');
      expect(login).toHaveTextContent("Login");
      await userEvent.click(login);
      expect(mockUseNavigate).toHaveBeenCalledWith('/');
  })
})
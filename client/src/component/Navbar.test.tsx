import {getByRole, render, screen} from "@testing-library/react";
import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import "@testing-library/jest-dom/vitest";
import { vi } from 'vitest';
import Navbar from "./Navbar.tsx";

const mockUsedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
   const actual = await vi.importActual("react-router-dom")
   return {...actual, useNavigate: () => mockUsedNavigate}
});


describe ("Navbar", () => {

  beforeAll(() => {
    render(<Navbar/>);
  })

  beforeEach(() => {
      mockUsedNavigate.mockClear();
    })

  it("should render the Fly Typer text", () => {
      const flyTyper = screen.getByRole('link', { name: /Fly Typer/i });
      expect(flyTyper).toBeInTheDocument();
      expect(flyTyper.getAttribute("href")).toBe("/");
      expect(flyTyper.textContent).toBe("Fly Typer");
  })
  
  it("should render the Home text", () => {
      const home = screen.getByRole('link', { name: /Home/i });
      expect(home).toBeInTheDocument();
      expect(home.getAttribute("href")).toBe("/");
      expect(home.textContent).toBe("Home");
  })

  it("should render the Login text", () => {
      const login = screen.getByRole('link', { name: /Login/i });
      expect(login).toBeInTheDocument();
      expect(login.getAttribute("href")).toBe("/");
      expect(login.textContent).toBe("Login");
  })
})
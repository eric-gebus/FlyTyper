import { render, screen} from "@testing-library/react";
import Footer from "./Footer.tsx";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

describe ("Footer", () => {
  
  it("renders copyright", () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025 All Rights Reserved./i)).toBeInTheDocument();
  })

  it("renders FlyTyper", () => {
    expect(screen.getByTestId("flytyper-footer")).toBeInTheDocument();
  })
})
import { render, screen} from "@testing-library/react";
import { describe, it, expect, beforeAll } from "vitest";
import "@testing-library/jest-dom/vitest";
import Footer from "./Footer.tsx";

describe ("Footer", () => {
  beforeAll(() => {
    render(<Footer />)
  })

  it("renders copyright", () => {
    expect(screen.getByText(/© 2025 All Rights Reserved./i)).toBeInTheDocument();
  })

  it("renders FlyTyper", () => {
    expect(screen.getByTestId("flytyper-footer")).toBeInTheDocument();
  })
})
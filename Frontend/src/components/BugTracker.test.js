import { render, screen, fireEvent } from "@testing-library/react";
import BugTracker from "./BugTracker";

test("renders BugTracker form", () => {
  render(<BugTracker />);
  expect(screen.getByPlaceholderText(/Bug title/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Bug description/i)).toBeInTheDocument();
  expect(screen.getByText(/Report Bug/i)).toBeInTheDocument();
});

test("allows user to type in inputs", () => {
  render(<BugTracker />);
  const titleInput = screen.getByPlaceholderText(/Bug title/i);
  const descInput = screen.getByPlaceholderText(/Bug description/i);

  fireEvent.change(titleInput, { target: { value: "Test Bug" } });
  fireEvent.change(descInput, { target: { value: "Test Description" } });

  expect(titleInput.value).toBe("Test Bug");
  expect(descInput.value).toBe("Test Description");
});

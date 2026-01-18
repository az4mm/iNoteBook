import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";

jest.mock(
  "react-router-dom",
  () => ({
    useNavigate: () => jest.fn(),
  }),
  { virtual: true }
);

beforeEach(() => {
  localStorage.clear();
});

test("toggles password visibility on login form", async () => {
  render(<Login />);

  const passwordInput = screen.getByLabelText(/password/i, {
    selector: "input",
  });
  expect(passwordInput).toHaveAttribute("type", "password");

  await userEvent.click(screen.getByRole("button", { name: /show password/i }));
  expect(passwordInput).toHaveAttribute("type", "text");

  await userEvent.click(screen.getByRole("button", { name: /hide password/i }));
  expect(passwordInput).toHaveAttribute("type", "password");
});

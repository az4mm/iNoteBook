import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "./Signup";

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

test("toggles password visibility on signup form", async () => {
  render(<Signup />);

  const passwordInput = screen.getByLabelText(/create a new password/i, {
    selector: "input",
  });
  const confirmInput = screen.getByLabelText(/confirm password/i, {
    selector: "input",
  });

  expect(passwordInput).toHaveAttribute("type", "password");
  expect(confirmInput).toHaveAttribute("type", "password");

  await userEvent.click(screen.getByRole("button", { name: /show password/i }));
  expect(passwordInput).toHaveAttribute("type", "text");
  expect(confirmInput).toHaveAttribute("type", "password");

  await userEvent.click(
    screen.getByRole("button", { name: /show confirm password/i })
  );
  expect(confirmInput).toHaveAttribute("type", "text");
});

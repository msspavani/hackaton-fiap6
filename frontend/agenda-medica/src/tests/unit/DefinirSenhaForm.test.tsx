import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DefinirSenhaForm from "../../pages/DefinirSenhaForm";
import { vi } from "vitest";
import * as router from "react-router-dom";

// Mock parcial seguro de react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  };
});

describe("DefinirSenhaForm - Validação", () => {
  beforeEach(() => {
    // Define valores simulados antes de cada teste
    vi.mocked(router.useLocation).mockReturnValue({
      state: { crm: "12345", token: "fake-token" },
    } as any);
  });

  it("deve mostrar erro se as senhas forem diferentes", async () => {
    render(<DefinirSenhaForm />);

    await userEvent.type(screen.getByPlaceholderText(/nova senha/i), "Senha123@");
    await userEvent.type(screen.getByPlaceholderText(/confirmar senha/i), "Senha123@Diferente");
    await userEvent.click(screen.getByRole("button", { name: /salvar senha/i }));

    expect(await screen.findByText(/as senhas não coincidem/i)).toBeInTheDocument();
  });
});

import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";

interface LocationState {
  crm: string;
  token: string;
}

interface FormData {
  password: string;
  confirmPassword: string;
}

// Validação de senha com requisitos básicos
const schema = Yup.object().shape({
  password: Yup.string()
    .required("A senha é obrigatória.")
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .matches(/[A-Z]/, "A senha deve conter uma letra maiúscula.")
    .matches(/[a-z]/, "A senha deve conter uma letra minúscula.")
    .matches(/[0-9]/, "A senha deve conter um número.")
    .matches(/[@$!%*?&]/, "A senha deve conter um caractere especial."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas não coincidem.")
    .required("Confirmação de senha é obrigatória."),
});

const DefinirSenhaForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { crm, token } = location.state as LocationState;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormData) => {
    const response = await fetch("/api/medicos/definir-senha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ crm, senha: data.password }),
    });

    if (response.ok) {
      alert("Senha definida com sucesso!");
      navigate("/");
    } else {
      alert("Erro ao definir senha.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Cadastre sua senha</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nova senha"
                {...register("password")}
                className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirmar senha"
              {...register("confirmPassword")}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
          >
            Salvar Senha
          </button>
        </form>
      </div>
    </div>
  );
};

export default DefinirSenhaForm;

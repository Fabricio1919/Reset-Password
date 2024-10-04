import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./index.css";

const ResetPasswordSchema = z
  .object({
    email: z.string().email("O e-mail e invalido"),
    newEmail: z.string().email("O novo e-mail deve ser válido"),
    confirmEmail: z.string().email("A confirmação do e-mail deve ser válida"),
    password: z.string().min(8, "A senha invalido "),
    NewPassword: z
      .string()
      .min(8, { message: "A nova senha deve te pelo menos 8 caracteries" })
      .regex(/[a-z]/, {
        message: "A nova senha deve te pelo menos uma letra minuscula",
      })
      .regex(/[A-Z]/, {
        message: "A nova senha deve te pelo menos uma letra mascula",
      })
      .regex(/[0-9]/, { message: " A senha deve te pelo menos um numero" })
      .regex(/[!@#$%&*]/, {
        message: "A nova senha deve te pelo menos um caracteries especial",
      })
      .min(1, { message: "A senha e obrigatoria" }),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatoria"),
  })
  .refine((data) => data.NewPassword === data.confirmPassword, {
    message: "As senhas devem corresponder",
    path: ["confirmPassword"],
  })
  .refine((data) => data.newEmail === data.confirmEmail, {
    message: "Os E-mail devem corresponder",
    path: ["confirmEmail"],
  });

type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;

export function Password() {
  const {
    register: registerReset,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const oldPassword = "F@b123456";
  const oldEmail = "fabricio@enablers.com";

  const onSubmit = (data: ResetPasswordType) => {
    if (data.email !== oldEmail) {
      alert("o E-mail antigo esta incorretar");
      return;
    }
    if (data.password !== oldPassword) {
      alert(" A senha antiga esta incorretar");
      return;
    }
    console.log("dados atualizado");
    console.log(data);
  };

  return (
    <form className="card" onSubmit={handleSubmit(onSubmit)}>
      <div className="card-content">
        <div className="form-group">
          <label htmlFor="email">E-mail: </label>
          <input
            {...registerReset("email")}
            id="email"
            type="email"
            placeholder="Digite sua E-mail"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="NewEmail">New E-mail: </label>
          <input
            {...registerReset("newEmail")}
            id="NewEmail"
            type="email"
            placeholder="Digite o novo E-mail"
          />
          {errors.newEmail && <p>{errors.newEmail.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmEmail">Confirm E-mail: </label>
          <input
            {...registerReset("confirmEmail")}
            id="confirmEmail"
            type="email"
            placeholder="Digite o novo E-mail"
          />
          {errors.confirmEmail && <p>{errors.confirmEmail.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            {...registerReset("password")}
            id="password"
            type="password"
            placeholder="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="NewPassword">New Password: </label>
          <input
            {...registerReset("NewPassword")}
            id="NewPassword"
            type="password"
            placeholder="Digite o novo senha"
          />
          {errors.NewPassword && <p>{errors.NewPassword.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            {...registerReset("confirmPassword")}
            id="confirmPassword"
            type="password"
            placeholder="Confirma a nova senha"
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit">Update user</button>
      </div>
    </form>
  );
}

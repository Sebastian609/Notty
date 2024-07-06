// LogInForm.tsx
"use client";
import { login } from "@/hooks/useLogin";
import { createCookie } from "@/Service/Cookies/cookies";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation"; // Importar useRouter desde next/router

export function LogInForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter(); // Instanciar useRouter para utilizar en el componente

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const mail = formData.get("email");
    const password = formData.get("password");

    if (mail && password) {
      const dataLogin = {
        mail: mail.toString().toUpperCase(),
        password: password.toString(),
      };

      const loginResponse = await login(dataLogin);

      if (!loginResponse) {
        alert("el usuario no existe");
        return;
      }
      createCookie("token", loginResponse.token);
      createCookie("idUser", loginResponse.idUser);
      createCookie("name", loginResponse.name);

      router.push("/dashboard");
    }

    setIsLoading(false);
  }

  return (
    <div className="w-1/3 border-2 rounded-lg p-4">
      <h1 className="text-center text-4xl font-bold my-6 mb-2">Notty</h1>
      <h2 className="text-center text-slate-400 mb-6">to do groups.</h2>

      <form onSubmit={onSubmit} className="space-y-8">
        <div>
          <label htmlFor="username">Email Address</label>
          <input
            id="username"
            type="email"
            name="email"
            placeholder="example@mail.com"
            className="block w-full mt-1"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="your password"
            className="block w-full mt-1"
          />
        </div>

        <button
          className="w-full  bg-blue-500 text-white py-2 rounded-2xl"
          type="submit"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>

        <p className="text-center hover:text-slate-800 text-slate-300 transition-all ease-in">
          Create an account
        </p>
      </form>
    </div>
  );
}

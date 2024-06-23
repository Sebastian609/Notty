// useLogin.ts

"use server"; // Indica que este código se ejecuta en el servidor

import { createCookie } from "@/Service/Cookies/cookies";

type LoginData = {
  mail: string;
  password: string;
};

export const login = async (dataLogin: LoginData) => {
  console.log(dataLogin);

  try {
    const backendHostname = process.env.NEXT_PUBLIC_NOTTY_BACKEND_HOSTNAME;

    if (!backendHostname) {
      throw new Error("Backend hostname is not defined.");
    }

    const response = await fetch(`${backendHostname}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataLogin),
    });

    if (response.ok) {
      const idUser = response.headers.get("Authorization")?.split(" ")[1];
      const token = response.headers.get("Authorization")?.split(" ")[0].trim().split(",")[0];
      if (token) {
        console.log("Login successful. Token:", token);
        createCookie('token', token);
        createCookie('idUser', idUser);

        return {
          token: token,
          idUser: idUser
        }; // Return the token
      } else {
        console.error("Login successful but token not found in headers.");
        return false; // Token not found
      }
    } else {
      console.error("Login failed. Status:", response.status);
      return false; // Indicate failure
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return false; // Indicate failure due to an error
  }
};

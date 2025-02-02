"use client";

import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react";

interface IContextApp {
  PageState: boolean;
  setPageState: (state: boolean) => void;
  Logout: () => void;
  isLogged: boolean;
  Login: (email: string, senha: string) => void;
  Logged: () => void;
}

export const ContextApp = createContext({} as IContextApp);

export const ContextAppProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [PageState, setPageState] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const Login = (email: string, senha: string) => {
    if (email == "lucas@gmail.com" && senha == "123") {
      localStorage.setItem("token", "fake token");
      setIsLogged(true);
      router.push("/");
    } else {
      setIsLogged(false);
    }
  };


  const Logged = () => {
    if (isLogged !== true) {
      router.push("/login");
    }
  };

  const Logout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    router.push("/login");
  };

  return (
    <ContextApp.Provider
      value={{ PageState, setPageState, Logout, Login, Logged, isLogged }}
    >
      {children}
    </ContextApp.Provider>
  );
};

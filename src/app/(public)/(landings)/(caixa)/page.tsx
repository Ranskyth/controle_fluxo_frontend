'use client'
import { useContext } from "react";
import { ContextApp } from "../../_components/context-app";

const Caixa = () => {
  const {Logged, isLogged} = useContext(ContextApp)

  Logged()

  if(!isLogged){return null}


  return <>
  <h1>Sistema de Caixa</h1>
  </>
};

export default Caixa;

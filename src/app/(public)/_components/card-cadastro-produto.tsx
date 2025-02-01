"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormEvent, useContext } from "react";
import { ContextPageState } from "./contextPageState";

export const CardCadastroProduto = () => {
  const {SetPageState} = useContext(ContextPageState)
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      titulo: formData.get("titulo") as string,
      quantidade: Number(formData.get("quantidade")),
      preco: Number(formData.get("preco")),
      descricao: formData.get("descricao") as string,
    };
    try {
      const fet = await fetch(`${process.env.NEXT_PUBLIC_API}/produtos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (fet.status === 400) {
        alert("verifique os campos");
      }
    } catch (e) {
      console.log(e);
    }
    SetPageState(true)
  };

  return (
    <div className="p-4 z-10 fixed justify-center flex flex-col items-center gap-5">
      <Card className="flex flex-col items-center">
        <CardHeader>
          <h1 className="text-4xl font-bold">Cadastra Produto</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col w-96 gap-4">
            <input
              className="border-2 p-3"
              type="text"
              name="titulo"
              placeholder="Titulo"
            />
            <input
              className="border-2 p-3"
              type="text"
              name="quantidade"
              placeholder="Quantidade"
            />
            <input
              className="border-2 p-3"
              type="text"
              name="preco"
              placeholder="Preço"
            />
            <textarea
              placeholder="Desc Produto"
              className="border-2 p-3"
              name="descricao"
            />
            <Button type="submit">Cadastra Novo Produto</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

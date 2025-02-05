/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";

export const CardEditarProduto = ({
  Id,
  Titulo,
  Quantidade,
  Preco,
  Descricao,
}: {
  Id?: number;
  Titulo: string;
  Quantidade: number;
  Preco: number;
  Descricao?: string;
}) => {
  const [id, setId] = useState(Id);
  const [titulo, setTitulo] = useState(Titulo);
  const [quantidade, setQuantidade] = useState(Quantidade);
  const [preco, setPreco] = useState(Preco);
  const [descricao, setDescricao] = useState(Descricao);

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/produtos/${Id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, titulo, quantidade, preco, descricao }),
    });
    console.log(res.body);
  };
  return (
    <Card className="fixed w-96 z-10">
      <CardHeader>
        <h1 className="text-[32px]">Editar Produto</h1>
      </CardHeader>
      <CardContent className="flex flex-col gap-11">
        <form onSubmit={handleEdit}>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="titulo">Titulo</Label>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="quantidade">Quantidade</Label>
              <Input
                id="quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="preco">Preço</Label>
              <Input
                id="preco"
                value={preco}
                onChange={(e) => setPreco(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="descricao">Descrição</Label>
              <textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" className="bg-green-500">
            Atualizar Dados do Produto
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

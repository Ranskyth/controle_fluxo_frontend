"use client";
import { ChangeEvent, useContext, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContextApp } from "../../_components/context-app";

interface Estoque {
  id?: number;
  titulo?: string;
  quantidade?: number;
  preco?: number;
  descricao?: string;
  createde_at?: string;
  updated_at?: string;
}

const CardVenda = (dados: Estoque) => {
  const [Qtproduto, setQtproduto] = useState<number>(1);
  return (
    <Card className="absolute z-10">
      <CardHeader>
        <CardTitle>{dados.titulo}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="flex flex-col gap-6">
          <h1>Quantidade em Estoque : {dados.quantidade}</h1>
          <h1>Preço Unitario : R$ {dados.preco}</h1>
          <div className="flex gap-2 items-center">
            <Button onClick={() => setQtproduto((prev) => prev - 1)}>-</Button>
            {Qtproduto}
            <Button onClick={() => setQtproduto((prev) => prev + 1)}>+</Button>
          </div>

          <Button className="bg-green-500">
            Confirmar Venda ( R${" "}
            {(Number(dados.preco || 0) * Qtproduto).toFixed(2)})
          </Button>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

const Caixa = () => {
  const { Logged, isLogged } = useContext(ContextApp);
  const [Produto, setProduto] = useState<Estoque[]>([]);
  const [HoverVenda, setHoverVenda] = useState(false);
  const [DataVendaProduto, setDataVendaProduto] = useState<Estoque>({});

  console.log(DataVendaProduto);

  Logged();

  if (!isLogged) {
     return null;
  }

  const handleProduto = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const arg = await String(e.target.value);
    if (arg === "") {
      return;
    }
    const data = await fetch(`http://localhost:9090/api/produtos/nome/${arg}`);
    const datajson = data.json();
    setProduto(await datajson);
  };

  console.log(HoverVenda);

  return (
    <>
      <div className="flex w-full flex-col items-center p-14">
        <h1 className="text-[42px] mb-9">Frente de Caixa</h1>
        <div className="w-full h-[34px]">
          <input
            className="h-full w-full rounded-[8px]"
            type="text"
            onChange={(e) => handleProduto(e)}
          />
        </div>
        {HoverVenda ? (
          <CardVenda
            id={DataVendaProduto.id}
            titulo={DataVendaProduto.titulo}
            preco={DataVendaProduto.preco}
            quantidade={DataVendaProduto.quantidade}
          />
        ) : null}

        <Table className="mt-9">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Titulo</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="text-right">Quantidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Produto.map((item) => {
              return (
                <TableRow
                  onClick={() => {
                    if (!HoverVenda) {
                      setHoverVenda(true);
                      setDataVendaProduto(item);
                    } else {
                      setHoverVenda(false);
                    }
                  }}
                  key={item.id}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.titulo}</TableCell>
                  <TableCell>R$ {item.preco}</TableCell>
                  <TableCell className="text-right">
                    {item.quantidade}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Caixa;

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ChangeEvent, useContext, useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [quantidade, setquantidade] = useState<number>(1);
  const [pagamento, setPagamento] = useState<string>();
  const total = Number((quantidade * Number(dados.preco)).toFixed(2))

  const handlePagamento = () => {
    fetch(`${process.env.NEXT_PUBLIC_API}/venda/${dados.id}/produtos`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({total, quantidade, pagamento})
    })
  }
  return (
    <Card className="absolute z-10">
      <CardHeader className="flex items-center">
        <CardTitle className="text-[1.5rem]">Venda de {dados.titulo}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="flex items-center gap-12">
          <div className="flex flex-col gap-2">
            <h1>Produto : {dados.titulo}</h1>
            <h1>Codigo Produto : {dados.id}</h1>
            <h1>Quantidade em Estoque : {dados.quantidade}</h1>
            <h1>Preço : R$ {dados.preco}</h1>
            <div className="flex gap-2 items-center">
              <Button onClick={() => setquantidade((prev) => prev - 1)}>
                -
              </Button>
              {quantidade}
              <Button onClick={() => setquantidade((prev) => prev + 1)}>
                +
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Select onValueChange={setPagamento}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo Pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="cartao_debito">Cartão Débito</SelectItem>
                  <SelectItem value="cartao_credito">Cartão Crédito</SelectItem>
                  <SelectItem value="dinheiro">Dinheiro</SelectItem>
                  <SelectItem value="pix">Pix</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button className="bg-green-500" onClick={handlePagamento}>Confirmar Venda (R$ {(Number(dados.preco) * quantidade).toFixed(2)})</Button>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
};
const Caixa = () => {
  //const { Logged, isLogged } = useContext(ContextApp);
  const [Produto, setProduto] = useState<Estoque[]>([]);
  const [HoverVenda, setHoverVenda] = useState(false);
  const [DataVendaProduto, setDataVendaProduto] = useState<Estoque>({});
  console.log(DataVendaProduto);
  //Logged();
  //if (!isLogged) {
  //   return null;
  //}
  const handleProduto = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const arg = await String(e.target.value);
    if (arg === "") {
      return;
    }
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API}/produtos/nome/${arg}`
    );
    const datajson = data.json();
    setProduto(await datajson);
  };
  console.log(HoverVenda);
  return (
    <>
      <div className="flex w-full flex-col items-center p-14">
        <h1 className="text-[42px] mb-9">Frente de Caixa</h1>
        <div className="w-full h-[34px]">
          <Input
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
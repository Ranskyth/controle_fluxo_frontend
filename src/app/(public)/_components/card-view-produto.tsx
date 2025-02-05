/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {format} from "date-fns"
import { ptBR } from "date-fns/locale"
interface Detalhes {
  id: number;
  titulo: string;
  quantidade: number;
  preco: number;
  created_at: string;
  updated_at: string;
}
const formateData = (data:string) => {
  return format(new Date(data), "dd/MM/yyyy | HH:mm", {locale: ptBR})
}
export const CardViewProduto = ({ id }: { id?: number }) => {

  const [Data, setData] = useState<Detalhes[]>([]);

  useEffect(() => {
    const RequestData = async () => {
      const request = await fetch(`${process.env.NEXT_PUBLIC_API}/produtos/${id}`);
      const json = await request.json();

      setData(json);
    };
    RequestData();
  }, []);

  return (
    <Card className="fixed w-96 z-10 h-72">
      <CardHeader>
        <h1>Info Produto</h1>
      </CardHeader>
      <CardContent>
        {Data?.map((item) => {
          return (
            <div key={item.id}>
              <h1>ID Produto : {item.id}</h1>
              <h1>Titulo do Produto : {item.titulo}</h1>
              <h1>Preço do Produto : {item.preco}</h1>
              <h1>Quantidade do Produto : {item.quantidade}</h1>
              <h1>Data de Criação : {formateData(item.created_at)}</h1>
              <h1>Ultima Atualização : {formateData(item.updated_at)}</h1>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

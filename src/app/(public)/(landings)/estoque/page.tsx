"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CardCadastroProduto } from "../../_components/card-cadastro-produto";
import { CardViewProduto } from "../../_components/card-view-produto";

interface Estoque {
  id: number;
  titulo: string;
  quantidade: number;
  preco: number;
  descricao: string;
}

export default function Estoque() {
  const [Data, setData] = useState<Estoque[]>([]);
  const [HiddenCadastro, setHiddenCadastro] = useState(false);
  const [HiddenVer, serHiddenVer] = useState(false);
  const [IdCardView, setIdCardView] = useState(0);

  const handleDeleta = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API}/produtos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    const produtos = async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API}/produtos`);
      const datajson = await data.json();
      setData(datajson);
    };
    produtos();
  }, []);

  const router = useRouter();

  if (!Data) {
    return <div>Carregando...</div>;
  }

  return (
    <div >

      <div className="flex justify-center">
        <h1 className="text-[32px] font-[600]">Estoque</h1>
      </div>

    <div className="flex h-screen p-14 justify-center gap-5">
      {HiddenCadastro ? <CardCadastroProduto /> : null}
          {HiddenVer ? (
              <CardViewProduto id={IdCardView} />
          ) : null}

      <div className="w-full">
        <div className="flex mb-4 justify-end">
          <Button
            onClick={() => {
              if (!HiddenCadastro) {
                setHiddenCadastro(true);
              } else {
                setHiddenCadastro(false);
              }
            }}
            className="p-5"
          >
            {!HiddenCadastro ? "Cadastra Novo Produto" : "Voltar"}
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Titulo</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.titulo}</TableCell>
                <TableCell>{item.quantidade}</TableCell>
                <TableCell className="text-right">{item.preco}</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Button
                    onClick={() => {
                      if (!HiddenVer) {
                        serHiddenVer(true);
                        setIdCardView(item.id);
                      } else {
                        serHiddenVer(false);
                      }
                    }}
                    className="p-2"
                  >
                    Visualizar
                  </Button>
                  <Button
                    onClick={() => router.push(`/estoque/edita/${item.id}`)}
                    className="p-2"
                  >
                    Editar
                  </Button>
                  <Button className="p-2" onClick={() => handleDeleta(item.id)}>
                    Deletar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
    </div>
  );
}

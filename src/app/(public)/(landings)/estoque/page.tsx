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
import { useContext, useEffect, useState } from "react";
import { CardCadastroProduto } from "../../_components/card-cadastro-produto";
import { CardViewProduto } from "../../_components/card-view-produto";
import { CardEditarProduto } from "../../_components/card-editar-produto";

import { ContextApp } from "../../_components/context-app";
import { useRouter } from "next/navigation";

interface Estoque {
  id: number;
  titulo: string;
  quantidade: number;
  preco: number;
  descricao: string;
}

const Estoque = () => {

  const {Logged, isLogged, setPageState, PageState} = useContext(ContextApp)

  Logged()
  
  const router = useRouter()
  const [Data, setData] = useState<Estoque[]>([]);
  const [HiddenCadastro, setHiddenCadastro] = useState(false);
  const [HiddenVer, serHiddenVer] = useState(false);
  const [Id, setId] = useState(0);
  const [HiddenEditar, setHiddenEditar] = useState(false);
  const [loading, setloading] = useState(true);
  
  useEffect(() => {
    const produtos = async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API}/produtos`);
      setloading(false);
      const datajson = await data.json();
      setData(datajson);
    };
    
    produtos();
  }, [PageState, router, Logged]);

  if(!isLogged){
    return null
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Carregando...
      </div>
    );
  }

  const handleDeleta = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API}/produtos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      
    });
    setPageState(true)
  };

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-[32px] font-[600]">Estoque</h1>
      </div>

      <div className="flex h-screen p-14 justify-center gap-5">
        {HiddenCadastro ? <CardCadastroProduto /> : null}
        {HiddenVer ? <CardViewProduto id={Id} /> : null}
        {HiddenEditar ? <CardEditarProduto id={Id} /> : null}

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
              className="p-5 bg-[#555555]"
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
                  <TableCell className="text-right">R$ {item.preco.toFixed(2)}</TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <Button
                      onClick={() => {
                        if (!HiddenVer) {
                          serHiddenVer(true);
                          setId(item.id);
                        } else {
                          serHiddenVer(false);
                        }
                      }}
                      className="p-2 bg-[#727272]"
                    >
                      Visualizar
                    </Button>
                    <Button
                      onClick={() => {
                        if (!HiddenEditar) {
                          setHiddenEditar(true);
                          setId(item.id)
                        } else {
                          setHiddenEditar(false);
                        }
                      }}
                      className="p-2 bg-[#7fca8c]"
                    >
                      Editar
                    </Button>
                    <Button
                      className="p-2 bg-[#c26666]"
                      onClick={() => handleDeleta(item.id)}
                    >
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

export default Estoque
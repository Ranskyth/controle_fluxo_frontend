'use client'

import { useContext } from "react";
import { CardComponent } from "../../_components/card-metricas";
import { MetricasCaixa, MetricasProdutos } from "../../_components/metricas-component";
import { ContextApp } from "../../_components/context-app";


export default function Home() {
  const { Logged, isLogged } = useContext(ContextApp)

  Logged()

  if(!isLogged){
    return null
  }

  return (
    <div className="p-4 flex flex-col items-center gap-5">
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </div>
      <div className="flex gap-5 justify-center  w-full flex-wrap">
        {[...Array(4)].map((item) => {return <CardComponent key={item} title="Total Vendas" description="total de vendas do dia" value="100"/>})}
      </div>
      <div className="flex gap-28 justify-center w-full flex-wrap">
        <MetricasCaixa/>
        <MetricasProdutos/>
        
      </div>
    </div>
  );
}

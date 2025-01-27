"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { month: "Janeiro", Entrada: 186, Saida: 80 },
    { month: "Fevereiro", Entrada: 305, Saida: 200 },
    { month: "Março", Entrada: 237, Saida: 120 },
    { month: "Abril", Entrada: 73, Saida: 190 },
    { month: "Maio", Entrada: 209, Saida: 130 },
    { month: "Junho", Entrada: 214, Saida: 140 },
    { month: "Julho", Entrada: 195, Saida: 100 },
    { month: "Agosto", Entrada: 220, Saida: 150 },
    { month: "Setembro", Entrada: 240, Saida: 170 },
    { month: "Outubro", Entrada: 260, Saida: 180 },
    { month: "Novembro", Entrada: 280, Saida: 190 },
    { month: "Dezembro", Entrada: 300, Saida: 200 },
]

const chartConfig = {
  Entrada: {
    label: "Entrada",
    color: "#2563eb",
  },
  Saida: {
    label: "Saida",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function MetricasCaixa() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full max-h-[350px] max-w-[580px]">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="Entrada" fill="var(--color-Entrada)" radius={4} />
        <Bar dataKey="Saida" fill="var(--color-Saida)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export function MetricasProdutos() {
    return (
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full max-h-[350px] max-w-[580px]">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="Entrada" fill="var(--color-Entrada)" radius={4} />
          <Bar dataKey="Saida" fill="var(--color-Saida)" radius={4} />
        </BarChart>
      </ChartContainer>
    )
  }
  
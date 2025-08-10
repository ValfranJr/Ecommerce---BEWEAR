"use client";

import { useState } from "react";
import { useAdminSalesSummary } from "@/hooks/queries/use-admin-sales-summary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formatCurrency = (valueInCents: number) =>
  (valueInCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const SalesSummaryClient = ({
  initialData,
}: {
  initialData: Awaited<
    ReturnType<
      typeof import("@/actions/get-admin-sales-summary").getAdminSalesSummary
    >
  >;
}) => {
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">(
    "day",
  );
  const { data, isLoading } = useAdminSalesSummary({ period, initialData });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm">Período</span>
        <Select value={period} onValueChange={(v) => setPeriod(v as any)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Dia</SelectItem>
            <SelectItem value="week">Semana</SelectItem>
            <SelectItem value="month">Mês</SelectItem>
            <SelectItem value="year">Ano</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="flex flex-col rounded-md border p-4">
          <span className="text-muted-foreground text-xs">Vendas</span>
          <span className="text-xl font-semibold">
            {isLoading ? "..." : formatCurrency(data?.totalSalesInCents ?? 0)}
          </span>
        </div>
        <div className="flex flex-col rounded-md border p-4">
          <span className="text-muted-foreground text-xs">Pedidos</span>
          <span className="text-xl font-semibold">
            {isLoading ? "..." : (data?.totalOrders ?? 0)}
          </span>
        </div>
        <div className="flex flex-col rounded-md border p-4">
          <span className="text-muted-foreground text-xs">De</span>
          <span className="text-sm">
            {data?.from ? new Date(data.from).toLocaleString("pt-BR") : "--"}
          </span>
        </div>
        <div className="flex flex-col rounded-md border p-4">
          <span className="text-muted-foreground text-xs">Até</span>
          <span className="text-sm">
            {data?.to ? new Date(data.to).toLocaleString("pt-BR") : "--"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SalesSummaryClient;

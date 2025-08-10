import { Header } from "@/components/common/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminSalesSummary } from "@/actions/get-admin-sales-summary";
import { getAdminOrders } from "@/actions/get-admin-orders";
import SalesSummaryClient from "./components/sales-summary-client";
import AdminOrdersClient from "./components/admin-orders-client";
import Orders from "@/app/my-orders/components/orders";

const AdminPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/authentication");
  }
  const dbUser = await db.query.userTable.findFirst({
    where: (t, { eq }) => eq(t.id, session.user!.id),
  });
  if (!dbUser?.isAdmin) {
    redirect("/");
  }

  const initialSummary = await getAdminSalesSummary({ period: "day" });
  const initialOrders = await getAdminOrders();

  return (
    <>
      <Header />
      <div className="mx-auto grid w-full max-w-5xl gap-6 p-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Painel Administrativo</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Resumo de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesSummaryClient initialData={initialSummary} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Todos os Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminOrdersClient initialData={initialOrders} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminPage;

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const CardEditarProduto = ({ id }: { id?: number }) => {
  return (
    <Card className="fixed w-96 z-10 h-72">
      <CardHeader>
        <h1>Info Produto</h1>
      </CardHeader>
      <CardContent>
        <h1>{id}</h1>
      </CardContent>
    </Card>
  );
};

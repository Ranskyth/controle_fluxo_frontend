import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const CardComponent = ({title, description, value}:{title?:string,description?:string, value?:string}) => {
  return (
    <>
      <Card className="w-72 h-32">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
          <p>{value}</p>
        </CardContent>
      </Card>
    </>
  );
};

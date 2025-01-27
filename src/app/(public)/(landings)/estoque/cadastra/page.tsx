import { Button } from "@/components/ui/button";
import { TextareaProduto } from "../../../_components/textarea";

export default function CadastraEstoque() {
  return (
    <div className="p-4 flex flex-col items-center gap-5">
      <div>
        <h1 className="text-4xl font-bold">Estoque</h1>
      </div>
      <div>
        <form className="flex flex-col w-96 gap-4">
          <input type="text" placeholder="Titulo"/>
          <input type="text" placeholder="Quantidade"/>
          <input type="text" placeholder="Preco"/>
          <TextareaProduto/>
          
          <Button>Enviar</Button>
        </form>
      </div>
    </div>
  );
}

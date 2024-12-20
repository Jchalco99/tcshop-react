import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

function AdminProductListComponent({ items, onSelect, selectedId }) {
  return (
    <div className="flex h-full flex-col overflow-auto">
      <div className="flex items-center gap-4 p-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar..." className="pl-8" />
        </div>
        <Link to="/admin/dashboard/productos/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Añadir nuevo
          </Button>
        </Link>
      </div>

      <div className="flex-1">
        {items.map((item) => (
          <div
            key={item.idProducto}
            className={`flex cursor-pointer items-center gap-3 border-b p-4 hover:bg-muted/50 ${
              selectedId === item.idProducto ? "bg-muted" : ""
            }`}
            onClick={() => onSelect(item)}
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <img
                src={item.imagen}
                alt={item.nombre}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{item.nombre}</h3>
              <p className="text-sm text-muted-foreground">
                {item.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProductListComponent;

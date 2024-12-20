import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function AdminListUserComponent({ items, onSelect, selectedId }) {
  return (
    <div className="flex h-full flex-col overflow-auto">
      <div className="flex items-center gap-4 p-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar..." className="pl-8" />
        </div>
      </div>

      <div className="flex-1">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex cursor-pointer items-center gap-3 border-b p-4 hover:bg-muted/50 ${
              selectedId === item.id ? "bg-muted" : ""
            }`}
            onClick={() => onSelect(item)}
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <img src={`https://ui-avatars.com/api/?name=${item.name}`} alt={item.name} className="object-cover" />
            </div>
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminListUserComponent;

import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Database, Users, Building2, Package } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function AdminSidebarComponent({ isOpen }) {

  const sidebarItems = [
    { icon: Users, label: "Usuarios", href: "/admin/dashboard/usuarios" },
    { icon: Database, label: "Productos", href: "/admin/dashboard/productos" },
    { icon: Building2, label: "Tiendas", href: "/admin/dashboard/tiendas" },
    { icon: Package, label: "Afiliados", href: "#" },
  ];

  return (
    <div
      className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] transform border-r bg-background transition-all duration-200 ease-in-out ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <ScrollArea className="h-full py-6">
        <div className="px-3 py-2">
          {isOpen && (
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Tablas
            </h2>
          )}
          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <TooltipProvider key={index} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      className={`flex h-10 items-center rounded-md px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground
    ${isOpen ? "justify-start" : "justify-center"}`}
                    >
                      <item.icon
                        className={`h-5 w-5 ${isOpen ? "mr-2" : ""}`}
                      />
                      {isOpen && <span>{item.label}</span>}
                    </Link>
                  </TooltipTrigger>
                  {!isOpen && (
                    <TooltipContent side="right" className="font-normal">
                      {item.label}
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}
          </nav>
        </div>
      </ScrollArea>
    </div>
  );
}

export default AdminSidebarComponent;

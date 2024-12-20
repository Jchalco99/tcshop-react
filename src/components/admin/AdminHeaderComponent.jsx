import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User } from "lucide-react";
import AuthService from "@/services/AuthService";
import ConfirmationModal from "../modals/ConfirmationModal";
import { useNavigate } from "react-router-dom";

function AdminHeaderComponent({ onToggleSidebar }) {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/admin/auth/login");
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center px-4">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>

        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsConfirmationModalOpen(true)}>Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleLogout}
        title="¿Estás seguro que deseas cerrar sesión?"
        description="Al cerrar sesión, tendrás que volver a iniciar sesión para acceder a tu cuenta."
      />
    </header>
  );
}

export default AdminHeaderComponent;

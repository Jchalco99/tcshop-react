import { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, User, Heart, ShoppingCart, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import AuthService from '@/services/AuthService'
import ConfirmationModal from './modals/ConfirmationModal'
import WarningModal from './modals/WarningModal'

function HeaderComponent() {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false)

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <header className="w-full bg-[#1f293a] py-4 px-4 md:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">T&C Shop</span>
        </Link>
        
        <div className="hidden flex-1 items-center gap-2 md:flex max-w-xl mx-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white text-[#1f293a] hover:bg-gray-100 min-w-[130px]">
                Categorias
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Electronics</DropdownMenuItem>
              <DropdownMenuItem>Computers</DropdownMenuItem>
              <DropdownMenuItem>Smartphones</DropdownMenuItem>
              <DropdownMenuItem>Accessories</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex flex-1">
            <Input
              type="search"
              placeholder="Buscar"
              className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button className="rounded-l-none bg-[#0ef] text-[#1f293a] hover:bg-[#0ef]/90">
              Buscar
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative text-white hover:text-[#0ef]">
            <Heart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0ef] text-xs font-bold text-[#1f293a]">
              2
            </span>
          </Button>
          {/* Botón de perfil y logout solo si hay un token */}
          {token ? (
            <>
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative text-white hover:text-[#0ef]">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0ef] text-xs font-bold text-[#1f293a]">
                    3
                  </span>
                </Button>
              </Link>
              <Link to="/user">
                <Button variant="ghost" size="icon" className="text-white hover:text-[#0ef]">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="text-white hover:text-[#0ef]" onClick={() => setIsConfirmationModalOpen(true)}>
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="icon" className="text-white hover:text-[#0ef]" onClick={() => setIsWarningModalOpen(true)}>
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Link to="/login">
                <Button variant="ghost" size="icon" className="text-white hover:text-[#0ef]">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="mt-4 flex gap-2 md:hidden">
        <Input
          type="search"
          placeholder="Search here"
          className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button className="rounded-l-none bg-[#0ef] text-[#1f293a] hover:bg-[#0ef]/90">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleLogout}
        title="¿Estás seguro que deseas cerrar sesión?"
        description="Al cerrar sesión, tendrás que volver a iniciar sesión para acceder a tu cuenta."
      />

      <WarningModal
        isOpen={isWarningModalOpen}
        onClose={() => setIsWarningModalOpen(false)}
        title="Inicio de sesión requerido"
        description="Debes iniciar sesión para acceder a esta función."
        actionText="Confirmar"
      />
    </header>
  )
}

export default HeaderComponent;

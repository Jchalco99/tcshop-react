import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom'
import AuthService from "@/services/AuthService";
import ErrorModal from "@/components/modals/ErrorModal";

function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      await AuthService.login(identifier, password);
      navigate('/')
    } catch(err) {
      setIsErrorModalOpen(true);
      console.log("Error:", err.message)
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1f293a] p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to='/'>
            <h1 className="text-4xl font-bold text-[#0ef]">T&C Shop</h1>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-[#0ef]">Usuario</label>
            <Input
              type="text"
              id="identifier"
              required
              className="border-[#0ef]/20 bg-[#1f293a] text-white placeholder:text-gray-400 focus-visible:ring-[#0ef]"
              placeholder="Usuario o correo educativo"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#0ef]">Contraseña</label>
            <Input
              type="password"
              id="password"
              required
              className="border-[#0ef]/20 bg-[#1f293a] text-white placeholder:text-gray-400 focus-visible:ring-[#0ef]"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-[#0ef] hover:text-[#0ef]/80"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0ef] text-[#1f293a] hover:bg-[#0ef]/90"
          >
            Iniciar sesión
          </Button>
        </form>

        <div className="text-center">
          <Link
            to="/register"
            className="text-sm text-[#0ef] hover:text-[#0ef]/80"
          >
            Registrarse
          </Link>
        </div>
      </div>

      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title="Ocurrio un error"
        description="Verifica si tus datos son correctos o si activaste tu cuenta desde tu correo"
      />
    </div>
  );
}

export default LoginPage;

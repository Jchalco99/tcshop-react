import { Button } from "@/components/ui/button"
import { CheckCircleIcon } from 'lucide-react'
import { Link } from "react-router-dom";

function VerifyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1f293a] p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-[#2a3a4f] p-6 text-center shadow-xl">
        <div className="flex justify-center">
          <CheckCircleIcon className="h-16 w-16 text-[#0ef]" />
        </div>
        <h2 className="text-2xl font-bold text-[#0ef]">
          Verifique su correo electrónico
        </h2>
        <p className="text-gray-300">
          Hemos enviado un enlace de verificación a su dirección de correo
          electrónico. Por favor, revise su bandeja de entrada y haga clic en el
          enlace para verificar su cuenta.
        </p>
        <div className="space-y-4">
          <Link to="/login">
          <Button
            variant="outline"
            className="w-full border-[#0ef] text-[#0ef] hover:bg-[#0ef] bg-[#0ef]/10"
          >
            Volver al inicio
          </Button>
          </Link>
        </div>
        <p className="text-sm text-gray-400">
          ¿No recibió el correo? Revise su carpeta de spam o contacte con
          soporte.
        </p>
      </div>
    </div>
  );
}

export default VerifyPage

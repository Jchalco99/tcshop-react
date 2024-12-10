import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../components/modals/ErrorModal"
import AuthService from "@/services/AuthService";

const sedes = [
  { idSede: 1, nombreSede: "Sede Arequipa" },
  { idSede: 2, nombreSede: "Sede Trujillo" },
  { idSede: 3, nombreSede: "Sede Lima" },
];

const departamentos = [
  { idDepartamento: 1, nombreDepartamento: "Electricidad y Electrónica" },
  { idDepartamento: 2, nombreDepartamento: "Gestión y Producción" },
  { idDepartamento: 3, nombreDepartamento: "Mecánica y Aviación" },
  { idDepartamento: 4, nombreDepartamento: "Mecatrónica" },
  {
    idDepartamento: 5,
    nombreDepartamento: "Minería y Procesos Químico-Metalúrgicos",
  },
  { idDepartamento: 6, nombreDepartamento: "Seguridad y Salud en el Trabajo" },
  { idDepartamento: 7, nombreDepartamento: "Tecnología Agrícola" },
  { idDepartamento: 8, nombreDepartamento: "Tecnología Digital" },
];

const carreras = [
  { idCarrera: 1, idDepartamento: 1, nombreCarrera: "Mecatrónica Industrial" },
  { idCarrera: 2, idDepartamento: 1, nombreCarrera: "Electricidad Industrial" },
  {
    idCarrera: 3,
    idDepartamento: 1,
    nombreCarrera: "Electrónica y Automatización Industrial",
  },
  {
    idCarrera: 4,
    idDepartamento: 1,
    nombreCarrera: "Tecnología Mecánica Eléctrica",
  },
  {
    idCarrera: 5,
    idDepartamento: 2,
    nombreCarrera: "Logística Digital Integrada",
  },
  {
    idCarrera: 6,
    idDepartamento: 2,
    nombreCarrera: "Administración y Emprendimiento de Negocios Digitales",
  },
  {
    idCarrera: 7,
    idDepartamento: 2,
    nombreCarrera: "Marketing Digital Analítico",
  },
  { idCarrera: 8, idDepartamento: 2, nombreCarrera: "Diseño Industrial" },
  {
    idCarrera: 9,
    idDepartamento: 2,
    nombreCarrera: "Tecnología de la Producción",
  },
  {
    idCarrera: 10,
    idDepartamento: 2,
    nombreCarrera: "Producción y Gestión Industrial",
  },
  {
    idCarrera: 11,
    idDepartamento: 3,
    nombreCarrera: "Mantenimiento de Equipo Pesado",
  },
  {
    idCarrera: 12,
    idDepartamento: 3,
    nombreCarrera: "Mecatrónica y Gestión Automotriz",
  },
  {
    idCarrera: 13,
    idDepartamento: 3,
    nombreCarrera: "Gestión y Mantenimiento de Maquinaria Pesada",
  },
  {
    idCarrera: 14,
    idDepartamento: 3,
    nombreCarrera: "Aviónica y Mecánica Aeronáutica",
  },
  {
    idCarrera: 15,
    idDepartamento: 3,
    nombreCarrera: "Mantenimiento y Gestión de Plantas Industriales",
  },
  {
    idCarrera: 16,
    idDepartamento: 3,
    nombreCarrera: "Tecnología Mecánica Eléctrica",
  },
  { idCarrera: 17, idDepartamento: 4, nombreCarrera: "Mecatrónica" },
  { idCarrera: 18, idDepartamento: 5, nombreCarrera: "Topografía y Geomática" },
  {
    idCarrera: 19,
    idDepartamento: 5,
    nombreCarrera: "Procesos Químicos y Metalúrgicos",
  },
  { idCarrera: 20, idDepartamento: 5, nombreCarrera: "Operaciones Mineras" },
  {
    idCarrera: 21,
    idDepartamento: 5,
    nombreCarrera: "Operación de Plantas de Procesamiento de Minerales",
  },
  {
    idCarrera: 22,
    idDepartamento: 5,
    nombreCarrera: "Gestión de Seguridad y Salud en el Trabajo",
  },
  {
    idCarrera: 23,
    idDepartamento: 6,
    nombreCarrera: "Gestión de Seguridad y Salud en el Trabajo",
  },
  { idCarrera: 24, idDepartamento: 7, nombreCarrera: "Tecnología Agrícola" },
  {
    idCarrera: 25,
    idDepartamento: 8,
    nombreCarrera: "Modelado y Animación Digital",
  },
  {
    idCarrera: 26,
    idDepartamento: 8,
    nombreCarrera: "Ciberseguridad y Auditoría Informática",
  },
  {
    idCarrera: 27,
    idDepartamento: 8,
    nombreCarrera: "Diseño y Desarrollo de Software",
  },
  {
    idCarrera: 28,
    idDepartamento: 8,
    nombreCarrera: "Diseño y Desarrollo de Simuladores y Videojuegos",
  },
  {
    idCarrera: 29,
    idDepartamento: 8,
    nombreCarrera: "Administración de Redes y Comunicaciones",
  },
  {
    idCarrera: 30,
    idDepartamento: 8,
    nombreCarrera: "Big Data y Ciencia de Datos",
  },
];

function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [idSede, setIdSede] = useState(null);
  const [idDepartamento, setIdDepartamento] = useState(null);
  const [idCarrera, setIdCarrera] = useState(null);

  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [carrerasFiltradas, setCarrerasFiltradas] = useState([]);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const idRol = 2;

  useEffect(() => {
    if (selectedDepartamento) {
      const filteredCarreras = carreras.filter(
        (carrera) => carrera.idDepartamento === parseInt(selectedDepartamento)
      );
      setCarrerasFiltradas(filteredCarreras);
    } else {
      setCarrerasFiltradas([]);
    }
  }, [selectedDepartamento]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.endsWith("@tecsup.edu.pe")) {
      setIsErrorModalOpen(true);
      return;
    }

    const user = {
      name,
      username,
      email,
      password,
      rol: { idRol },
      number,
      sede: { idSede },
      departamento: { idDepartamento },
      carrera: { idCarrera },
    };

    setIsLoading(true);

    AuthService.register(user)
      .then((response) => {
        console.log(user);
        setIsLoading(false);
        navigate('/verify');
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      })
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1f293a]">
        <div className="text-center">
          <div className="mb-4">
            <div
              className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#0ef] border-r-transparent align-[-0.125em]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Cargando...
              </span>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-[#0ef]">Cargando...</h2>
          <p className="mt-2 text-gray-400">Por favor, espere un momento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1f293a] p-4 font-sans">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0ef]">Registrarse</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-8">
            {/* Columna de Información Personal */}
            <div className="flex-1 space-y-6">
              <h2 className="text-xl font-semibold text-[#0ef]">
                Información Personal
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-[#0ef]">Nombre</label>
                  <Input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-[#0ef]/20 bg-[#1f293a] text-white placeholder:text-gray-400 focus-visible:ring-[#0ef]"
                    placeholder="Ingresa tu nombre"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#0ef]">
                    Nombre de usuario
                  </label>
                  <Input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-[#0ef]/20 bg-[#1f293a] text-white placeholder:text-gray-400 focus-visible:ring-[#0ef]"
                    placeholder="Ingresa tu nombre de usuario"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#0ef]">
                    Correo electrónico
                  </label>
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-[#0ef]/20 bg-[#1f293a] text-white placeholder:text-gray-400 focus-visible:ring-[#0ef]"
                    placeholder="Ingresa tu correo electrónico"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#0ef]">Contraseña</label>
                  <Input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-[#0ef]/20 bg-[#1f293a] text-white placeholder:text-gray-400 focus-visible:ring-[#0ef]"
                    placeholder="Ingresa tu contraseña"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#0ef]">
                    Número de teléfono
                  </label>
                  <Input
                    type="tel"
                    required
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="border-[#0ef]/20 bg-[#1f293a] text-white placeholder:text-gray-400 focus-visible:ring-[#0ef]"
                    placeholder="Ingresa tu número de teléfono"
                  />
                </div>
              </div>
            </div>

            {/* Línea divisoria */}
            <div className="w-px bg-[#0ef]/20"></div>

            {/* Columna de Información Institucional */}
            <div className="flex-1 space-y-6">
              <h2 className="text-xl font-semibold text-[#0ef]">
                Información Institucional
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-[#0ef]">Sede</label>
                  <Select onValueChange={(value) => setIdSede(parseInt(value))}>
                    <SelectTrigger className="border-[#0ef]/20 bg-[#1f293a] text-white">
                      <SelectValue placeholder="Selecciona tu sede" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1f293a] text-white">
                      {sedes.map((sede) => (
                        <SelectItem
                          key={sede.idSede}
                          value={sede.idSede.toString()}
                          className="focus:bg-[#0ef]/20"
                        >
                          {sede.nombreSede}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#0ef]">Departamento</label>
                  <Select
                    onValueChange={(value) => {
                      setSelectedDepartamento(value);
                      setIdDepartamento(parseInt(value));
                    }}
                  >
                    <SelectTrigger className="border-[#0ef]/20 bg-[#1f293a] text-white">
                      <SelectValue placeholder="Selecciona tu departamento" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1f293a] text-white">
                      {departamentos.map((departamento) => (
                        <SelectItem
                          key={departamento.idDepartamento}
                          value={departamento.idDepartamento.toString()}
                          className="focus:bg-[#0ef]/20"
                        >
                          {departamento.nombreDepartamento}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#0ef]">Carrera</label>
                  <Select
                    disabled={!selectedDepartamento}
                    onValueChange={(value) => setIdCarrera(parseInt(value))}
                  >
                    <SelectTrigger className="border-[#0ef]/20 bg-[#1f293a] text-white">
                      <SelectValue placeholder="Selecciona tu carrera" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1f293a] text-white">
                      {carrerasFiltradas.map((carrera) => (
                        <SelectItem
                          key={carrera.idCarrera}
                          value={carrera.idCarrera.toString()}
                          className="focus:bg-[#0ef]/20"
                        >
                          {carrera.nombreCarrera}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0ef] text-[#1f293a] hover:bg-[#0ef]/90"
          >
            Registrarse
          </Button>
        </form>

        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-[#0ef] hover:text-[#0ef]/80"
          >
            ¿Ya tienes una cuenta?
          </Link>
        </div>
      </div>

      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title="Error"
        description="El correo electrónico debe terminar en @tecsup.edu.pe"
      />
    </div>
  );
}

export default RegisterPage;

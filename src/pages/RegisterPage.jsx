import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

const departments = [
  "Electricidad y Electrónica",
  "Gestión y Producción",
  "Mecánica y Aviación",
  "Mecatrónica",
  "Minería y Procesos Químico-Metalúrgicos",
  "Seguridad y Salud en el Trabajo",
  "Tecnología Agrícola",
  "Tecnología Digital",
];

const careersByDepartment = {
  "Electricidad y Electrónica": [
    "Mecatrónica Industrial",
    "Electricidad Industrial",
    "Electrónica y Automatización Industrial",
    "Tecnología Mecánica Eléctrica",
  ],
  "Gestión y Producción": [
    "Logística Digital Integrada",
    "Administración y Emprendimiento de Negocios Digitales",
    "Marketing Digital Analítico",
    "Diseño Industrial",
    "Tecnología de la Producción",
    "Producción y Gestión Industrial",
  ],
  "Mecánica y Aviación": [
    "Mantenimiento de Equipo Pesado",
    "Mecatrónica y Gestión Automotriz",
    "Gestión y Mantenimiento de Maquinaria Pesada",
    "Aviónica y Mecánica Aeronáutica",
    "Mantenimiento y Gestión de Plantas Industriales",
    "Tecnología Mecánica Eléctrica",
  ],
  Mecatrónica: ["Mecatrónica"],
  "Minería y Procesos Químico-Metalúrgicos": [
    "Topografía y Geomática",
    "Procesos Químicos y Metalúrgicos",
    "Operaciones Mineras",
    "Operación de Plantas de Procesamiento de Minerales",
    "Gestión de Seguridad y Salud en el Trabajo",
  ],
  "Seguridad y Salud en el Trabajo": [
    "Gestión de Seguridad y Salud en el Trabajo",
  ],
  "Tecnología Agrícola": ["Tecnología Agrícola"],
  "Tecnología Digital": [
    "Modelado y Animación Digital",
    "Ciberseguridad y Auditoría Informática",
    "Diseño y Desarrollo de Software",
    "Diseño y Desarrollo de Simuladores y Videojuegos",
    "Administración de Redes y Comunicaciones",
    "Big Data y Ciencia de Datos",
  ],
};

function RegisterPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    if (selectedDepartment) {
      setCareers(careersByDepartment[selectedDepartment]);
    } else {
      setCareers([]);
    }
  }, [selectedDepartment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1f293a] p-4 font-sans">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0ef]">Registrarse</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-[#0ef]">Nombre</label>
            <Input
              type="text"
              required
              className="border-[#0ef]/20 bg-[#1f293a] text-white placeholder:text-gray-400 focus-visible:ring-[#0ef] font-sans"
              placeholder="Ingresa tu nombre"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#0ef]">Correo de Tecsup</label>
            <Input
              type="email"
              required
              className="border-[#0ef]/20 bg-[#1f293a] text-white placeholder:text-gray-400 focus-visible:ring-[#0ef] font-sans"
              placeholder="Ingresa tu correo"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#0ef]">Contraseña</label>
            <Input
              type="password"
              required
              className="border-[#0ef]/20 bg-[#1f293a] text-white placeholder:text-gray-400 focus-visible:ring-[#0ef] font-sans"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#0ef]">Teléfono</label>
            <Input
              type="tel"
              required
              className="border-[#0ef]/20 bg-[#1f293a] text-white placeholder:text-gray-400 focus-visible:ring-[#0ef] font-sans"
              placeholder="Ingresa tu teléfono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#0ef]">Departamento</label>
            <Select onValueChange={setSelectedDepartment}>
              <SelectTrigger className="border-[#0ef]/20 bg-[#1f293a] text-white font-sans">
                <SelectValue placeholder="Selecciona tu departamento" />
              </SelectTrigger>
              <SelectContent className="bg-[#1f293a] text-white font-sans">
                {departments.map((department) => (
                  <SelectItem
                    key={department}
                    value={department}
                    className="focus:bg-[#0ef]/20"
                  >
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#0ef]">Carrera</label>
            <Select disabled={!selectedDepartment}>
              <SelectTrigger className="border-[#0ef]/20 bg-[#1f293a] text-white font-sans">
                <SelectValue placeholder="Selecciona tu carrera" />
              </SelectTrigger>
              <SelectContent className="bg-[#1f293a] text-white font-sans">
                {careers.map((career) => (
                  <SelectItem
                    key={career}
                    value={career}
                    className="focus:bg-[#0ef]/20"
                  >
                    {career}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0ef] text-[#1f293a] hover:bg-[#0ef]/90 font-sans"
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
    </div>
  );
}

export default RegisterPage;

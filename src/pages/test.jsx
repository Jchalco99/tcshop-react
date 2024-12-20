import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import LayoutAdmin from "./admin/LayoutAdmin";

export function ComprehensiveForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <LayoutAdmin>
      <form onSubmit={handleSubmit} className="p-6">
        {/* Título */}
        <h2 className="text-2xl font-semibold mb-6 text-start">
          Formulario Completo
        </h2>

        {/* Contenedor de columnas */}
        <div className="grid grid-cols-3 gap-0">
          {/* Primera columna */}
          <div className="space-y-4 px-4">
            <div className="space-y-2">
              <Label>Texto</Label>
              <Input type="text" placeholder="Ingrese texto" />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="correo@ejemplo.com" />
            </div>

            <div className="space-y-2">
              <Label>Contraseña</Label>
              <Input type="password" placeholder="••••••••" />
            </div>

            <div className="space-y-2">
              <Label>Número</Label>
              <Input type="number" placeholder="0" />
            </div>

            <div className="space-y-2">
              <Label>Teléfono</Label>
              <Input type="tel" placeholder="+51 999 999 999" />
            </div>

            <div className="space-y-2">
              <Label>URL</Label>
              <Input type="url" placeholder="https://ejemplo.com" />
            </div>
          </div>

          {/* Segunda columna */}
          <div className="space-y-4 px-4">
            <div className="space-y-2">
              <Label>Fecha</Label>
              <Input type="date" />
            </div>

            <div className="space-y-2">
              <Label>Hora</Label>
              <Input type="time" />
            </div>

            <div className="space-y-2">
              <Label>Color</Label>
              <Input type="color" className="h-10" />
            </div>

            <div className="space-y-2">
              <Label>Rango</Label>
              <Input type="range" min="0" max="100" />
            </div>

            <div className="space-y-2">
              <Label>Archivo</Label>
              <Input type="file" />
            </div>

            <div className="space-y-2">
              <Label>Área de texto</Label>
              <Textarea placeholder="Escriba aquí..." />
            </div>
          </div>

          {/* Tercera columna */}
          <div className="space-y-4 px-4">
            <div className="space-y-2">
              <Label>Select</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Opción 1</SelectItem>
                  <SelectItem value="2">Opción 2</SelectItem>
                  <SelectItem value="3">Opción 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Checkbox</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label htmlFor="terms">Acepto los términos</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="newsletter" />
                  <label htmlFor="newsletter">Suscribirse al newsletter</label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Radio</Label>
              <RadioGroup defaultValue="1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="r1" />
                  <label htmlFor="r1">Opción 1</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="r2" />
                  <label htmlFor="r2">Opción 2</label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Switch</Label>
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <label htmlFor="airplane-mode">Modo avión</label>
              </div>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" type="button">
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </LayoutAdmin>
  );
}

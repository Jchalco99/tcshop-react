import { useState, useEffect } from "react";
import LayoutAdmin from "./LayoutAdmin";
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
import AuthService from "@/services/AuthService";
import TiendaService from "@/services/TiendaService";
import ProductoService from "@/services/ProductoService";
import CategoriaService from "@/services/CategoriaService";

function AddProductPage() {
  const [tiendasBySede, setTiendasBySede] = useState([]);
  const [categorias, setCategorias] =useState([]);
  const [loading, setLoading] = useState(true);
  const [userIdSede, setUserIdSede] = useState(null);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [idTienda, setIdTienda] = useState(null);
  const [idCategoria, setIdCategoria] = useState(null);

  useEffect(() => {
    listarCategorias()
  }, [])

  const listarCategorias = () => {
    CategoriaService.getAllCategorias()
      .then((response) => {
        setCategorias(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    const listarTiendasBySede = () => {
      TiendaService.getAllTiendasBySede(userIdSede)
        .then((response) => {
          setTiendasBySede(response.data);
          console.log(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    };

    if (userIdSede) {
      listarTiendasBySede();
    }
  }, [userIdSede]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await AuthService.getUserInfo();
        setUserIdSede(userInfo.sede.idSede);
        setLoading(false);
        console.log("Sede ID:", userIdSede);
      } catch (error) {
        console.error(
          "No se pudo obtener la información del usuario: " + error
        );
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [userIdSede]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("file", imagen);
    formData.append("precio", precio);
    formData.append("stock", stock);
    formData.append("tiendaId", idTienda);
    formData.append("categoriaId", idCategoria);

    try {
      setLoading(true);
      const response = await ProductoService.addProduct(formData);
      console.log("Producto añadido exitosamente:", response.data);
    } catch (error) {
      console.error("Error al añadir el producto:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">Cargando...</div>
      </div>
    );
  }

  return (
    <LayoutAdmin>
      <form onSubmit={handleSubmit} className="p-6">
        {/* Título */}
        <h2 className="text-2xl font-semibold mb-6 text-start">
          Formulario de Producto
        </h2>

        {/* Contenedor de columnas */}
        <div className="grid grid-cols-3 gap-0">
          {/* Primera columna */}
          <div className="space-y-4 px-4">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input
                type="text"
                placeholder="Ingrese el nombre del producto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea
                placeholder="Escriba una breve descripción del producto"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Imagen</Label>
              <Input
                type="file"
                onChange={(e) => setImagen(e.target.files[0])}
              />
            </div>
          </div>

          {/* Segunda columna */}
          <div className="space-y-4 px-4">
            <div className="space-y-2">
              <Label>Precio</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                min="0"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Stock</Label>
              <Input
                type="number"
                placeholder="0"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
          </div>

          {/* Tercera columna */}
          <div className="space-y-4 px-4">
            <div className="space-y-2">
              <Label>Tienda</Label>
              <Select
                value={idTienda}
                onValueChange={(value) => setIdTienda(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una tienda" />
                </SelectTrigger>
                <SelectContent>
                  {tiendasBySede.map((tienda) => (
                    <SelectItem
                      key={tienda.idTienda}
                      value={tienda.idTienda.toString()}
                    >
                      {tienda.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select
                value={idCategoria}
                onValueChange={(value) => setIdCategoria(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una tienda" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((categoria) => (
                    <SelectItem
                      key={categoria.idCategoria}
                      value={categoria.idCategoria.toString()}
                    >
                      {categoria.nombreCategoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

export default AddProductPage;

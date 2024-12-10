import CardComponent from "@/components/CardComponent";
import { ArrowLeft } from "lucide-react";
import Layout from "./Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TiendaService from "@/services/TiendaService";
import ShopDetailComponent from "@/components/ShopDetailComponent";
import HorarioService from "@/services/HorarioService";
import ProductoService from "@/services/ProductoService";

function ShopPage() {
  const [tienda, setTienda] = useState({});
  const [horario, setHorario] = useState({});
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);
  const { idTienda } = useParams();

  useEffect(() => {
    TiendaService.getTiendaById(idTienda)
      .then((response) => {
        setTienda(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [idTienda]);

  useEffect(() => {
    HorarioService.getHorarioByIdTienda(idTienda)
      .then((response) => {
        setHorario(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [idTienda]);

  useEffect(() => {
    ProductoService.getProductoByTienda(idTienda)
      .then((response) => {
        setProductos(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [idTienda]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">Cargando tienda...</div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-6">
        <div className="container mx-auto px-4">
          <a
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </a>
        </div>

        {/* Shop Info */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ShopDetailComponent
            key={tienda.idTienda}
            imagen={tienda.imagen}
            nombre={tienda.nombre}
            descripcion={tienda.descripcion}
            estado={horario.estado}
            horario={`${horario.apertura} - ${horario.cierre}`}
            ubicacion={tienda.ubicacion}
          />

          {/* Products Section */}
          <div className="mt-8 pb-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Productos</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {productos.map((producto) => (
                <CardComponent
                  key={producto.idProducto}
                  idProducto={producto.idProducto}
                  image={producto.imagen}
                  name={producto.nombre}
                  category={producto.descripcion}
                  price={producto.precio}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ShopPage;

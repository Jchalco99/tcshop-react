import { useEffect, useState } from "react";
import ProductoService from "../services/ProductoService";
import CardComponent from "../components/CardComponent";
import Layout from "./Layout";

function HomePage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listarProductos();
  }, []);

  const listarProductos = () => {
    ProductoService.getAllProductos()
      .then((response) => {
        setProductos(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">Cargando productos...</div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Nuestros Productos</h1>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productos.map((producto) => (
            <CardComponent
              key={producto.idProducto}
              idProducto={producto.idProducto}
              image={producto.imagen}
              name={producto.nombre}
              category={producto.categoria.nombreCategoria}
              price={producto.precio}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;

import { useEffect, useState } from "react";
import ProductoService from "../services/ProductoService";
import CardComponent from "../components/CardComponent";
import Layout from "./Layout";
import AuthService from "@/services/AuthService";
import CardShopComponent from "@/components/CardShopComponent";
import TiendaService from "@/services/TiendaService";

function HomePage() {
  const [productos, setProductos] = useState([]);
  const [productosBySede, setProductosBySede] = useState([]);
  const [tiendasBySede, setTiendasBySede] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userIdSede, setUserIdSede] = useState(null);
  const token = localStorage.getItem("token");

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

  useEffect(() => {
    const listarProductosBySede = () => {
      ProductoService.getProductosBySede(userIdSede)
        .then((response) => {
          setProductosBySede(response.data);
          console.log(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    };

    if (userIdSede) {
      listarProductosBySede();
    }
  }, [userIdSede]);

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
        })
    }

    if (userIdSede) {
      listarTiendasBySede()
    }
  }, [userIdSede])

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
        {token ? (
          <>
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-2xl font-bold">
                Disfruta de los productos de tu sede
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {productosBySede.map((productoBySede) => (
                <CardComponent
                  key={productoBySede.idProducto}
                  idProducto={productoBySede.idProducto}
                  image={productoBySede.imagen}
                  name={productoBySede.nombre}
                  category={productoBySede.categoria.nombreCategoria}
                  price={productoBySede.precio}
                />
              ))}
            </div>
            <div className="container mx-auto px-4 py-8">
              <div className="mb-8 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                  Nuestras Tiendas
                </h1>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tiendasBySede.map((tiendaBySede) => (
                  <CardShopComponent
                    key={tiendaBySede.idTienda}
                    idTienda={tiendaBySede.idTienda}
                    imagen={tiendaBySede.imagen}
                    nombre={tiendaBySede.nombre}
                    descripcion={tiendaBySede.descripcion}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-2xl font-bold">
                Disfruta de nuestros productos
              </h1>
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
          </>
        )}
      </div>
    </Layout>
  );
}

export default HomePage;

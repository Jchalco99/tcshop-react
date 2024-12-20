import { useEffect, useState } from "react";
import ProductoService from "@/services/ProductoService";
import AdminProductListComponent from "@/components/admin/AdminProductListComponent";
import AdminProductInfoComponent from "@/components/admin/AdminProductInfoComponent";
import LayoutAdmin from "./LayoutAdmin";
import AuthService from "@/services/AuthService";

function AdminProductDashboardPage() {
  const [productosBySede, setProductosBySede] = useState([]);
  const [userIdSede, setUserIdSede] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [loading, setLoading] = useState(true);

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

  return (
    <LayoutAdmin>
      <div className="grid h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[1fr,minmax(400px,600px)]">
        <AdminProductListComponent
          items={productosBySede}
          onSelect={setSelectedProduct}
          selectedId={selectedProduct?.idProducto}
        />
        <AdminProductInfoComponent producto={selectedProduct} />
      </div>
    </LayoutAdmin>
  );
}

export default AdminProductDashboardPage;

import { useState, useEffect } from "react";
import TiendaService from "@/services/TiendaService";
import AuthService from "@/services/AuthService";
import LayoutAdmin from "./LayoutAdmin";
import AdminProductListComponent from "@/components/admin/AdminProductListComponent";
import AdminProductInfoComponent from "@/components/admin/AdminProductInfoComponent";

function AdminTiendaDashboardPage() {
    const [tiendasBySede, setTiendasBySede] = useState([]);
    const [userIdSede, setUserIdSede] = useState(null);
    const [selectedTienda, setSelectedTienda] = useState({});
    const [loading, setLoading] = useState(true);
  
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
  
    return (
      <LayoutAdmin>
        <div className="grid h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[1fr,minmax(400px,600px)]">
          <AdminProductListComponent
            items={tiendasBySede}
            onSelect={setSelectedTienda}
            selectedId={selectedTienda?.idTienda}
          />
          <AdminProductInfoComponent producto={selectedTienda} />
        </div>
      </LayoutAdmin>
    );
  }

  export default AdminTiendaDashboardPage

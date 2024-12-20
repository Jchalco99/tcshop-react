import AdminUserInfoComponent from "@/components/admin/AdminUserInfoComponent";
import AdminListUserComponent from "@/components/admin/AdminUserListComponent";
import { useEffect, useState } from "react";
import UsuarioService from "@/services/UsuarioService";
import LayoutAdmin from "./LayoutAdmin";

function AdminUserDashboardPage() {
  const [usuarios, setUsuarios] = useState([]);

  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const listarUsuarios = () => {
      UsuarioService.getAllUsuarios()
        .then((response) => {
          setUsuarios(response.data);
          console.log(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    };

    listarUsuarios();
  }, []);

  return (
    <LayoutAdmin>
      <div className="grid h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[1fr,minmax(400px,600px)]">
        <AdminListUserComponent
          items={usuarios}
          onSelect={setSelectedContact}
          selectedId={selectedContact?.id}
        />
        <AdminUserInfoComponent usuario={selectedContact} />
      </div>
    </LayoutAdmin>
  );
}

export default AdminUserDashboardPage;

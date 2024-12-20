import { useState, useEffect } from "react";

function AdminTiendaInfoComponent({ tienda }) {
  const [loading, setLoading] = useState(true);
  const [idTienda, setIdTienda] = useState(null);

  useEffect(() => {
    if (tienda) {
      setIdTienda(tienda.idTienda);
    }
  }, [tienda]);

  if (!tienda) return null;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">Esperando tienda...</div>
      </div>
    );
  }

  return (
    <div className="h-full border-l">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Detalles de la tienda</h2>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-6">
            <div className="relative h-24 w-24 overflow-hidden rounded-full">
              <img
                src={tienda.imagen}
                alt={tienda.nombre}
                className="object-cover h-24"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">{tienda.nombre}</h3>
              <p className="text-lg text-muted-foreground">
                {tienda.descripcion}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Ubicacion
                </label>
                <p className="text-lg">{tienda.ubicacion}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Apertura
                </label>
                <p className="text-lg">{tienda.nombre}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Sede
                </label>
                <p className="text-lg">{tienda.sede.nombreSede}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Cierre
                </label>
                <p className="text-lg">{tienda.nombre}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTiendaInfoComponent;

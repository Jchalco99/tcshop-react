function AdminUserInfoComponent({ usuario }) {
  if (!usuario) return null;

  return (
    <div className="h-full border-l">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Detalles del usuario</h2>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-6">
            <div className="relative h-24 w-24 overflow-hidden rounded-full">
              <img
                src={`https://ui-avatars.com/api/?name=${usuario.name}`}
                alt={usuario.name}
                className="object-cover h-24"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">{usuario.name}</h3>
              <p className="text-lg text-muted-foreground">
                {usuario.username}
              </p>
              <p className="text-lg text-muted-foreground">{usuario.email}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Teléfono
                </label>
                <p className="text-lg">{usuario.number}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Rol
                </label>
                <p className="text-lg">{usuario.rol.nombreRol}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Habilitado
                </label>
                <p className="text-lg">{usuario.enable}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Sede
                </label>
                <p className="text-lg">{usuario.sede.nombreSede}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Departamento
                </label>
                <p className="text-lg">
                  {usuario.departamento.nombreDepartamento}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Carrera
                </label>
                <p className="text-lg whitespace-pre-wrap">
                  {usuario.carrera.nombreCarrera}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserInfoComponent;

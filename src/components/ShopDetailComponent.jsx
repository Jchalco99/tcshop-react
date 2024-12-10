import { Clock, MapPin } from "lucide-react";

function ShopDetailComponent(props) {
  return (
    <div className="bg-white p-6 shadow-lg sm:rounded-lg">
      <div className="flex flex-col items-center sm:flex-row sm:items-start">
        <div className="relative h-32 w-32 overflow-hidden rounded-lg border-4 border-white shadow-md">
          <img src={props.imagen} alt={props.nombre} className="object-cover" />
        </div>
        <div className="mt-4 text-center sm:ml-6 sm:mt-0 sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900">{props.nombre}</h1>
          <p className="mt-2 text-gray-500">{props.descripcion}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <span
                className={`rounded px-2 py-1 text-sm ${
                  props.estado === "cerrado"
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {props.estado}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-5 w-5" />
              <span>{props.horario}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-5 w-5" />
              <span>{props.ubicacion}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopDetailComponent;

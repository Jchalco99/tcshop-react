import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom";

function CardShopComponent(props) {
  return (
    <Link to={`/tienda/${props.idTienda}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="h-10 w-full bg-gradient-to-r from-[#1f293a] to-[#0ef]">
        </div>
        <div className="relative p-4">
          <div className="absolute -top-8 left-4 h-16 w-16 overflow-hidden rounded-lg border-4 border-white bg-white shadow-md">
            <img
              src={props.imagen}
              alt={props.nombre}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900">{props.nombre}</h3>
            <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
              <span>{props.descripcion}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default CardShopComponent;

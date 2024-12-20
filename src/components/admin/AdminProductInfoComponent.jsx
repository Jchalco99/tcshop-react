import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Star, Trash2 } from "lucide-react";
import ReviewService from "@/services/ReviewService";
import ProductoService from "@/services/ProductoService";
import { Link } from "react-router-dom";

function AdminProductInfoComponent({ producto, listarProductos  }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idProducto, setProducto] = useState(null);

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    const day = date.getUTCDate();
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${day} ${month} ${year}, ${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
  };
  
  useEffect(() => {
    if (producto) {
      setProducto(producto.idProducto);
    }
  }, [producto]);

  useEffect(() => {
    if (idProducto) {
      ReviewService.getReviewsByIdProduct(idProducto)
        .then((response) => {
          setReviews(response.data);
          console.log(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [idProducto]);

  const handleDelete = async (idProducto) => {
    try {
      const response = await ProductoService.deleteProducto(idProducto);
      if (response.status === 200 || response.status === 204) {
        alert('Producto eliminado exitosamente');
      } else {
        console.error('Error al eliminar el producto:', response.status);
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error.message);
    }
  };

  if (!producto) return null

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">Esperando producto...</div>
      </div>
    );
  }

  return (
    <div className="h-full border-l overflow-auto">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Detalles del producto</h2>
          <div className="flex gap-2">
            <Link to={`/admin/dashboard/productos/update/${producto.idProducto}`}>
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(producto.idProducto)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-6">
            <div className="relative h-24 w-24 overflow-hidden rounded-lg">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">{producto.nombre}</h3>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Descripción
                </label>
                <p className="text-lg">{producto.descripcion}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Precio
                </label>
                <p className="text-lg">{producto.precio}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Stock
                </label>
                <p className="text-lg">{producto.stock}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Categoría
                </label>
                <p className="text-lg">{producto.categoria.nombreCategoria}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Tienda
                </label>
                <p className="text-lg">
                  {producto.tienda.nombre}
                </p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Reseñas de clientes</h3>
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="flex items-start gap-4 border-b pb-4">
                  <div className="relative h-10 w-10 flex-shrink-0">
                    <img
                      src={`https://ui-avatars.com/api/?name=${review.usuario.name}`}
                      alt={review.usuario.username}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{review.usuario.name}</h4>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review.fecha)}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.calificacion
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm">{review.comentario}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProductInfoComponent

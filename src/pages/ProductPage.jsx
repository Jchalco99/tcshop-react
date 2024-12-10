import { useEffect, useState } from "react";
import ProductGalleryComponent from "@/components/ProductGalleryComponent";
import ProductDetailComponent from "@/components/ProductDetailComponent";
import ReviewComponent from "@/components/ReviewComponent";
import ProductoService from "@/services/ProductoService";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import ReviewService from "@/services/ReviewService";
import { ArrowLeft } from "lucide-react";

function ProductPage() {
  const [producto, setProducto] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { idProducto } = useParams();

  const calculateAverage = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;

    const total = reviews.reduce((sum, review) => sum + review.calificacion, 0);

    const average = total / reviews.length;

    return Number.isInteger(average) ? average : average.toFixed(1);
  };

  const average = calculateAverage(reviews);

  useEffect(() => {
    ProductoService.getProductoById(idProducto)
      .then((response) => {
        setProducto(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [idProducto]);

  useEffect(() => {
    ReviewService.getReviewsByIdProduct(idProducto)
      .then((response) => {
        setReviews(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      })
  }, [idProducto])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">Cargando producto...</div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
      <div className="container mx-auto px-4">
          <a
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </a>
        </div>

        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm">
          <a href="/" className="text-gray-500 hover:text-gray-700">
            Inicio
          </a>
          <span className="text-gray-400">/</span>
          <a href="/categories" className="text-gray-500 hover:text-gray-700">
            Tiendas
          </a>
          <span className="text-gray-400">/</span>
          <a href="/headphones" className="text-gray-500 hover:text-gray-700">
            {producto.tienda.nombre}
          </a>
          <span className="text-gray-400">/</span>
          <span className="text-[#0ef]">{producto.nombre}</span>
        </nav>

        {/* Product Section */}
        <div className="mb-16 grid gap-8 lg:grid-cols-2">
          <ProductGalleryComponent image={producto.imagen} />
          <ProductDetailComponent
            key={producto.idProducto}
            name={producto.nombre}
            rating={average}
            reviewCount={reviews.length}
            price={producto.precio}
            description={producto.descripcion}
            category={producto.categoria?.nombreCategoria || "Sin categoría"}
          />
        </div>

        {/* Reviews Section */}
        <div id="reviews">
          <ReviewComponent reviews={reviews} overallRating={average} idProducto={idProducto} />
        </div>
      </div>
    </Layout>
  );
}

export default ProductPage;

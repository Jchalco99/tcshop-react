import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import AuthService from "@/services/AuthService";

function ReviewComponent({ reviews, overallRating }) {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState("");
  const [userId, setUserId] = useState({})

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
    const fetchUserInfo = async () => {
      try {
        const userInfo = await AuthService.getUserInfo();
        setUserId(userInfo.id);
      } catch (error) {
        console.error("No se pudo obtener el ID del usuario: " + error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserInfo();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">Cargando usuario...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Reviews ({reviews.length})</h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">Aún no existen comentarios sobre este producto.</p>
      ) : (
        <>
          {/* Overall Rating */}
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold">{overallRating}</div>
              <div className="flex text-[#0ef]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < Math.floor(overallRating) ? "text-[#0ef]" : "text-gray-200"}>
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-2">
                  <div className="flex w-24 text-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < stars ? "text-[#0ef]" : "text-gray-200"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-[#0ef]"
                      style={{
                        width: `${
                          (reviews.filter((r) => Math.floor(r.calificacion) === stars).length / reviews.length) * 100
                        }%`,
                      }}
                    />
                  </div>
                  <span className="w-8 text-sm text-gray-500">
                    {reviews.filter((r) => Math.floor(r.calificacion) === stars).length}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="border-b pb-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold">{review.usuario.username}</span>
                  <span className="text-sm text-gray-500">{formatDate(review.fecha)}</span>
                </div>
                <div className="mb-2 flex text-[#0ef]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < review.calificacion ? "text-[#0ef]" : "text-gray-200"}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600">{review.comentario}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2">
            <Button variant="outline" className="h-8 w-8 p-0">
              1
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0">
              2
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0">
              3
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0">
              4
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0">
              →
            </Button>
          </div>
        </>
      )}

      {/* Review Form */}
      {token && (
        <form className="rounded-lg border p-6">
          <h3 className="mb-4 text-xl font-semibold">Escribe una Review</h3>
          <div className="space-y-4">
            <Textarea
              placeholder="Tu Review"
              className="min-h-[100px]"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              required
            />
            <div className="flex items-center gap-2">
              <span>Tu Calificación:</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setCalificacion(i + 1)}
                    className={`text-2xl ${i < calificacion ? "text-[#0ef]" : "text-gray-200"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <Button type="submit" className="bg-[#1f293a] hover:bg-[#0ef]">
              Enviar
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ReviewComponent;

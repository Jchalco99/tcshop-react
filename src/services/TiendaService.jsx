import axios from "axios";

const TIENDA_BASE_REST_API_URL = import.meta.env.VITE_API_URL + "/tiendas";

class TiendaService {
  getAllTiendasBySede(idSede) {
    return axios.get(TIENDA_BASE_REST_API_URL + "/sede/" + idSede, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  }

  getTiendaById(idTienda) {
    return axios.get(TIENDA_BASE_REST_API_URL + "/" + idTienda, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  }
}

export default new TiendaService();

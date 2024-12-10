import axios from "axios";

const HORARIO_BASE_REST_API_URL = import.meta.env.VITE_API_URL + "/horarios";

class HorarioService {
  getHorarioByIdTienda(idTienda) {
    return axios.get(HORARIO_BASE_REST_API_URL + "/tienda/" + idTienda, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  }
}

export default new HorarioService();

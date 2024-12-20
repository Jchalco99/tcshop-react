import axios from "axios";

const USUARIO_BASE_REST_API_URL =
  import.meta.env.VITE_API_URL + "/usuarios";

class UsuarioService {
  getAllUsuarios() {
    return axios.get(USUARIO_BASE_REST_API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
  }

  getUsuarioById(usuarioId) {
    return axios.get(USUARIO_BASE_REST_API_URL + "/" + usuarioId);
  }
}

export default new UsuarioService();

import axios from "axios";

const AUTH_API_URL = import.meta.env.VITE_API_URL;

class AuthService {
  async login(identifier, password) {
    try {
      const response = await axios.post(
        `${AUTH_API_URL}/login`,
        { identifier, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Respuesta de la API:", response.data);

      const { token } = response.data || {};
      if (!token) {
        throw new Error("La respuesta de la API no contiene un token válido.");
      }

      localStorage.setItem("token", token);

      return response.data;
    } catch (err) {
      console.error("Error al iniciar sesión con la API:", err);

      if (err.response && err.response.status === 401) {
        throw new Error(
          "Credenciales incorrectas. Por favor, verifica tu usuario y contraseña."
        );
      } else {
        throw new Error(
          "Hubo un problema al comunicarse con el servidor. Inténtalo más tarde."
        );
      }
    }
  };

  register(user) {
    return axios.post(AUTH_API_URL + '/register', user)
  }

  logout() {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  }

  async getUserInfo() {
    const token = localStorage.getItem("token");
  
    if (!token) {
      throw new Error("No hay token disponible. Por favor, inicia sesión.");
    }
  
    try {
      const response = await axios.post(
        `${AUTH_API_URL}/user-info`,
        {"token": token},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
      throw new Error("No se pudo obtener la información del usuario.");
    }
  }
}

export default new AuthService();

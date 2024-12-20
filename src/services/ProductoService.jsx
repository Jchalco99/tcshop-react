import axios from "axios";

const PRODUCTO_BASE_REST_API_URL = import.meta.env.VITE_API_URL + "/productos";

const token = localStorage.getItem("token");

class ProductoService {
  getAllProductos() {
    return axios.get(PRODUCTO_BASE_REST_API_URL);
  }

  getProductosBySede(idSede) {
    return axios.get(PRODUCTO_BASE_REST_API_URL + "/sede/" + idSede);
  }

  getProductoById(productoId) {
    return axios.get(PRODUCTO_BASE_REST_API_URL + "/" + productoId);
  }

  getProductoByTienda(idTienda) {
    return axios.get(PRODUCTO_BASE_REST_API_URL + "/tienda/" + idTienda);
  }

  addProduct(product) {
    return axios.post(
      PRODUCTO_BASE_REST_API_URL,
      product,
      { token: token },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
  }

  updateProduct(productId, product) {
    return axios.put(
      PRODUCTO_BASE_REST_API_URL + '/' + productId,
      product,
      { token: token },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    )
  }

  deleteProducto(idProducto) {
    return axios.delete(PRODUCTO_BASE_REST_API_URL + "/" + idProducto, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  }
}

export default new ProductoService();

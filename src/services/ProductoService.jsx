import axios from "axios"

const PRODUCTO_BASE_REST_API_URL = import.meta.env.VITE_API_URL + "/productos"

class ProductoService {
    getAllProductos() {
        return axios.get(PRODUCTO_BASE_REST_API_URL)
    }

    getProductosBySede(idSede) {
        return axios.get(PRODUCTO_BASE_REST_API_URL + "/sede/" + idSede)
    }

    getProductoById(productoId) {
        return axios.get(PRODUCTO_BASE_REST_API_URL + '/' + productoId)
    }

    getProductoByTienda(idTienda) {
        return axios.get(PRODUCTO_BASE_REST_API_URL + "/tienda/" + idTienda)
    }
}

export default new ProductoService()

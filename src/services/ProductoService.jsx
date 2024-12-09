import axios from "axios"

const PRODUCTO_BASE_REST_API_URL = import.meta.env.VITE_API_URL + "/productos"

class ProductoService {
    getAllProductos() {
        return axios.get(PRODUCTO_BASE_REST_API_URL)
    }

    getProductoById(productoId) {
        return axios.get(PRODUCTO_BASE_REST_API_URL + '/' + productoId)
    }
}

export default new ProductoService()

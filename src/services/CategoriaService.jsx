import axios from "axios"

const PRODUCTO_BASE_REST_API_URL = import.meta.env.VITE_API_URL + "/categorias"

class CategoriaService {
    getAllCategorias() {
        return axios.get(PRODUCTO_BASE_REST_API_URL)
    }

    getCategoriaById(categoriaId) {
        return axios.get(PRODUCTO_BASE_REST_API_URL + '/' + categoriaId)
    }
}

export default new CategoriaService()
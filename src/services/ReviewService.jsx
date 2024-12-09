import axios from "axios";

const REVIEW_BASE_REST_API_URL = import.meta.env.VITE_API_URL + "/reviews"

class ReviewService {
    getReviewsByIdProduct(productoId) {
        return axios.get(REVIEW_BASE_REST_API_URL + '/producto/' + productoId)
    }
}

export default new ReviewService()

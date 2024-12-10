import axios from "axios";

const REVIEW_BASE_REST_API_URL = import.meta.env.VITE_API_URL + "/reviews";

class ReviewService {
  getReviewsByIdProduct(productoId) {
    return axios.get(REVIEW_BASE_REST_API_URL + "/producto/" + productoId);
  }

  createReview(review) {
    return axios.post(REVIEW_BASE_REST_API_URL, review, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  }
}

export default new ReviewService();

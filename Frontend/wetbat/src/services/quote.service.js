import http from "../http-common";

// Communicates with Backend
class QuoteDataService {
  getAll() {
    return http.get("/quotes");
  }

  create(data) {
    return http.post("/quotes", data);
  }

  delete(id) {
    return http.delete(`/quotes/${id}`);
  }
}

export default new QuoteDataService();
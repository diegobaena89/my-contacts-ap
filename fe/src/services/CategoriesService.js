import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  listCategories(orderBy = 'asc') {
    return this.httpClient.get(`/categories?orderBy=${orderBy}`);
  }

  getCategoryById(id) {
    return this.httpClient.get(`/categories/${id}`);
  }

  createCategory(category) {
    return this.httpClient.post('/categories', {
      body: category,
    });
  }

  updateCategory(id, category) {
    return this.httpClient.put(`/categories/${id}`, {
      body: category,
    });
  }

  deleteCategory(id) {
    return this.httpClient.delete(`/categories/${id}`);
  }
}

export default new CategoriesService();

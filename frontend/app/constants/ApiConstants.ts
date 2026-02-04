class ApiConstants {
    static readonly BASE_URL: string = "http://localhost:8080";

    static readonly login = "/api/auth/login";
    static readonly signup = "/api/auth/signUp";
    static readonly validateAuth = "/api/auth/validate";

    static readonly books = "/api/books/all";
    static readonly saveBook = "/api/books/save";
    static readonly deleteBook = "/api/books/delete";

    static readonly categories = "/api/categories/all";
    static readonly saveCategory = "/api/categories/save";
}

export default ApiConstants;
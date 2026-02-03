import type { FunctionComponent } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "~/common/ApiClient";
import type { BookModel } from "../models/BookModel";
import { useNavigate } from "react-router";

interface BooksPageProps {}

const fetchBooks = async (): Promise<BookModel[]> => {
    const response: any = await ApiClient.instance.get<BookModel[]>(
      "api/books/all"
    );
    return response.data;
};

const BooksPage: FunctionComponent<BooksPageProps> = () => {
    const navigate = useNavigate();

  const {
    data: books,
    error,
    isLoading,
  } = useQuery<BookModel[], Error>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  if (isLoading) {
    return <div>Fetching books...</div>;
  }

  if (error) {
    if (error)
    // navigate("/login");
    return <div>An error occurred: {error.message}</div>;
  }

  if (!books || books.length === 0) {
    return <div>No books</div>;
  }

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  );
};

export default BooksPage;
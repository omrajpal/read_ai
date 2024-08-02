import { useState, useEffect } from "react";
import { BookService } from "../service/book-service";
import { QuestionService } from "../service/question-service";

const useFetch = (endpoint: string, query: any) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const bookService = new BookService(query.cat, query.gen);
  const questionService = new QuestionService();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      let responseData;

      if (endpoint.startsWith("/getBooks")) {
        if (endpoint === "/getBooks") {
          responseData = await bookService.getAllBooks();
        } else if (endpoint.startsWith("/getBooks/top")) {
          responseData = await bookService.getTopBooks();
        } else if (endpoint.startsWith("/getBooks/category/")) {
          const genre = endpoint.split("/").pop();
          responseData = await bookService.getBooksByGenre(genre);
        } else if (endpoint.startsWith("/getBooks/similar/")) {
          const id = endpoint.split("/").pop();
          responseData = await bookService.getSimilarBooks(id);
        } else if (endpoint.startsWith("/getBooks/")) {
          const id = endpoint.split("/").pop();
          responseData = await bookService.getBookById(id);
        }
      } else if (endpoint === "/questions") {
        responseData = await questionService.getAllQuestions();
      }
      setData(responseData);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;

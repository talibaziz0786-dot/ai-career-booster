import axios from "axios";

export const getAIQuestion =
  async (
    category: string,
    difficulty: string
  ) => {

    const response =
      await axios.post(
        "http://localhost:5000/api/interview/question",
        {
          category,
          difficulty,
        }
      );

    return response.data;
  };
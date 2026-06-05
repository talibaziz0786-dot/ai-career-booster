import axios from "axios";

export const getQuestion =
  async (
    category: string,
    difficulty: string
  ) => {
    const response =
      await axios.post(
        "/api/interview/question",
        {
          category,
          difficulty,
        }
      );

    return response.data;
  };
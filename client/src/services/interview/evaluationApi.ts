// import axios from "axios";

// export async function evaluateAnswer(
//   question: string,
//   answer: string
// ) {
//   const response =
//     await axios.post(
//       "http://localhost:5000/api/evaluation/evaluate",
//       {
//         question,
//         answer,
//       }
//     );

//   return response.data;
// }



import { api } from "../../lib/axios";

export async function evaluateAnswer(
  question: string,
  answer: string
) {
  const response = await api.post(
    "/api/evaluation/evaluate",
    {
      question,
      answer,
    }
  );

  return response.data;
}
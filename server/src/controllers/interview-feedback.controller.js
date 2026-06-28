// import { askAI }
// from "../services/ai/ai-manager.service.js";

// export const getInterviewFeedback =
// async (req,res) => {

//   try {

//     const {
//       questions,
//       answers,
//       skills,
//     } = req.body;

//     const result =
//       await askAI(`
// You are a senior recruiter.

// Analyze this interview.

// Skills:
// ${skills.join(",")}

// Questions:
// ${questions.join("\n")}

// Answers:
// ${answers.join("\n")}

// Return ONLY JSON:

// {
//   "overallScore": 85,
//   "technicalScore": 82,
//   "communicationScore": 88,
//   "confidenceScore": 80,
//   "strengths": [],
//   "weaknesses": [],
//   "improvements": [],
//   "recruiterVerdict": ""
// }
// `);

//     res.json({
//       success:true,
//       feedback: JSON.parse(
//         result.content
//       ),
//     });

//   } catch(error){

//     console.error(error);

//     res.status(500).json({
//       success:false,
//     });

//   }

// };
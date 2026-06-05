import {
  generateQuestion,
} from "../services/ai.service.js";

import { askAI }
from "../services/ai/ai-manager.service.js";

export const getQuestion =
  async (req, res) => {
    try {
      const {
        category,
        difficulty,
      } = req.body;

      const question =
  await askAI(`
Generate one
${difficulty}
${category}
interview question.
`);

      const question =
        await generateQuestion(
          category,
          difficulty
        );

      res.json({
        success: true,
        question,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
      });
    }
  };
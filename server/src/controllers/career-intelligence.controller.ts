import { Request, Response } from "express";

import { generateCareerIntelligence } from "../services/ai/career-intelligence.service.js";

export async function careerIntelligenceController(

  req: Request,

  res: Response

) {

  try {

    const {

      resumeText,

      userId,

    } = req.body;

    if (

      !resumeText ||

      !userId

    ) {

      return res.status(400).json({

        success: false,

        message:

          "resumeText and userId are required.",

      });

    }

    const cacheKey =

      `career:${userId}`;

    const profile =

      await generateCareerIntelligence(

        cacheKey,

        resumeText

      );

    return res.json({

      success: true,

      profile,

    });

  }

  catch (error) {

    console.error(

      "Career Intelligence Error:",

      error

    );

    return res.status(500).json({

      success: false,

      message:

        "Failed to generate career intelligence.",

    });

  }

}
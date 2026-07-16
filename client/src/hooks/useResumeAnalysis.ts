import { useState } from "react";

import { analyzeResume } from "../services/resume.service";

export function useResumeAnalysis() {

const [loading, setLoading] = useState(false);

const [analysis, setAnalysis] = useState(null);

const runAnalysis = async (

resumeText: string,

language: string

) => {

setLoading(true);

try {

const data = await analyzeResume(

resumeText,

language

);

setAnalysis(data);

} finally {

setLoading(false);

}

};

return {

loading,

analysis,

runAnalysis,

};

}
import type {
  SkillCompetencyMap,
  Competency,
} from "./competency-types.js";

function createCompetency(
  id: string,
  name: string,
  description: string,
  difficulty: "beginner" | "intermediate" | "advanced",
  tags: string[],
  keywords: string[],
  prerequisites: string[] = []
): Competency {
  return {
    id,
    name,
    description,
    difficulty,
    tags,
    keywords,
    prerequisites,
  };
}

export const COMPETENCY_MAP: Record<
  string,
  SkillCompetencyMap
> = {
  "gen ai": {
    skill: "gen ai",

    competencies: [
      createCompetency(
        "llm-fundamentals",
        "LLM Fundamentals",
        "Understanding transformers, tokenization, inference and context windows.",
        "beginner",
        ["llm", "transformer"],
        [
          "large language model",
          "transformer",
          "tokens",
          "context window",
        ]
      ),

      createCompetency(
        "prompt-engineering",
        "Prompt Engineering",
        "Writing effective prompts using system prompts, few-shot and chain-of-thought strategies.",
        "beginner",
        ["prompt"],
        [
          "system prompt",
          "few shot",
          "zero shot",
          "instruction",
        ],
        ["llm-fundamentals"]
      ),

      createCompetency(
        "embeddings",
        "Embeddings",
        "Understanding vector embeddings and semantic similarity.",
        "intermediate",
        ["embedding"],
        [
          "semantic search",
          "vector",
          "similarity search",
        ],
        ["llm-fundamentals"]
      ),

      createCompetency(
        "vector-database",
        "Vector Databases",
        "Using vector databases for semantic retrieval.",
        "intermediate",
        ["vectordb"],
        [
          "pinecone",
          "weaviate",
          "milvus",
          "chroma",
        ],
        ["embeddings"]
      ),

      createCompetency(
        "rag",
        "Retrieval Augmented Generation",
        "Combining retrieval systems with LLMs.",
        "intermediate",
        ["rag"],
        [
          "retrieval",
          "context injection",
          "knowledge base",
        ],
        [
          "embeddings",
          "vector-database",
        ]
      ),

      createCompetency(
        "fine-tuning",
        "Fine Tuning",
        "Training and adapting LLMs using LoRA and QLoRA.",
        "advanced",
        ["training"],
        [
          "lora",
          "qlora",
          "adapter",
          "dataset",
        ],
        ["llm-fundamentals"]
      ),

      createCompetency(
        "agents",
        "AI Agents",
        "Building autonomous AI agents using tools and planning.",
        "advanced",
        ["agents"],
        [
          "planning",
          "reasoning",
          "tool calling",
        ],
        [
          "prompt-engineering",
          "rag",
        ]
      ),

      createCompetency(
        "evaluation",
        "LLM Evaluation",
        "Evaluating LLM quality, hallucinations and benchmarks.",
        "advanced",
        ["evaluation"],
        [
          "hallucination",
          "benchmark",
          "accuracy",
        ]
      ),

      createCompetency(
        "guardrails",
        "AI Guardrails",
        "Protecting AI systems against prompt injection and jailbreak attacks.",
        "advanced",
        ["security"],
        [
          "prompt injection",
          "jailbreak",
          "alignment",
        ]
      ),

      createCompetency(
        "deployment",
        "Production Deployment",
        "Deploying AI systems with monitoring, scaling and optimization.",
        "advanced",
        ["deployment"],
        [
          "latency",
          "monitoring",
          "autoscaling",
          "cost optimization",
        ]
      ),
    ],
  },
};
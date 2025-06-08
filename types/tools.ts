export interface Tool {
  name: string
  description: string
  functions: ToolFunction[]
}

export interface ToolFunction {
  name: string
  description: string
}

export interface ToolCategory {
  name: string
  description: string
  tools: Tool[]
}

export interface TextStats {
  words: number
  sentences: number
  characters: number
  paragraphs: number
}
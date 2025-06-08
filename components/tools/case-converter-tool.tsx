"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { AboutSection } from "@/components/tools/about-section"
import { TextStatsDisplay } from "@/components/tools/text-stats"
import { TextStats, ToolFunction } from "@/types/tools"
import { Copy, Download } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CaseConverterToolProps {
  title: string
  description?: string
  functions: ToolFunction[]
}

const caseConverterAboutContent = (
  <div className="space-y-6">
    <p>
      Transform your text with our powerful <strong>Case Converter Tool</strong>. 
      Convert between different case formats with ease and precision.
    </p>

    <hr />

    <h3 className="text-xl font-bold">Features</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">🔄 Case Conversion</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>UPPERCASE:</strong> Convert text to all capital letters</li>
          <li><strong>lowercase:</strong> Convert text to all small letters</li>
          <li><strong>Title Case:</strong> Capitalize First Letter Of Each Word</li>
          <li><strong>Sentence case:</strong> Capitalize first letter of each sentence</li>
          <li><strong>camelCase:</strong> First word lowercase, others capitalized</li>
          <li><strong>PascalCase:</strong> All words capitalized, no spaces</li>
          <li><strong>snake_case:</strong> All lowercase with underscores</li>
          <li><strong>kebab-case:</strong> All lowercase with hyphens</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">🔧 Text Operations</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Line Operations:</strong> Sort, remove duplicates, clean empty lines</li>
          <li><strong>Whitespace:</strong> Trim extra spaces and format text</li>
          <li><strong>Special Cases:</strong> Toggle case, random case for creative needs</li>
        </ul>
      </div>
    </div>

    <hr />

    <h3 className="text-xl font-bold">Use Cases</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">💻 Development</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Convert between different naming conventions</li>
          <li>Format variable and function names</li>
          <li>Clean and standardize code formatting</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">📝 Writing</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Format titles and headings</li>
          <li>Prepare text for different style guides</li>
          <li>Clean up copied text from various sources</li>
        </ul>
      </div>
    </div>
  </div>
)

export function CaseConverterTool({
  title,
  description,
  functions
}: CaseConverterToolProps) {
  const [inputText, setInputText] = React.useState("")
  const [outputText, setOutputText] = React.useState("")
  const [selectedFunction, setSelectedFunction] = React.useState(functions[0]?.name || "")
  const [textStats, setTextStats] = React.useState<TextStats>({
    words: 0,
    sentences: 0,
    characters: 0,
    paragraphs: 0
  })
  const { toast } = useToast()

  const calculateStats = (text: string) => {
    const words = text.trim().split(/\s+/).filter(Boolean).length
    const sentences = text.split(/[.!?]+/).filter(Boolean).length
    const characters = text.length
    const paragraphs = text.split(/\n\s*\n/).filter(Boolean).length

    setTextStats({
      words,
      sentences,
      characters,
      paragraphs
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setInputText(newText)
    calculateStats(newText)
    processText(newText)
  }

  const processText = React.useCallback((text: string) => {
    if (!text || !selectedFunction) {
      setOutputText("")
      return
    }

    let result = text

    switch (selectedFunction) {
      case "UPPERCASE":
        result = text.toUpperCase()
        break
      case "lowercase":
        result = text.toLowerCase()
        break
      case "Sentence case":
        result = text
          .toLowerCase()
          .replace(/(^\s*\w|[.!?]\s+\w)/g, letter => letter.toUpperCase())
        break
      case "Title Case":
        result = text
          .toLowerCase()
          .replace(/\b\w+/g, word => word.charAt(0).toUpperCase() + word.slice(1))
        break
      case "camelCase":
        result = text
          .replace(/[^a-zA-Z0-9\s]/g, ' ')
          .toLowerCase()
          .replace(/\s+/g, ' ')
          .trim()
          .replace(/\s(.)/g, (_, char) => char.toUpperCase())
        break
      case "PascalCase":
        result = text
          .replace(/[^a-zA-Z0-9\s]/g, ' ')
          .toLowerCase()
          .replace(/\s+/g, ' ')
          .trim()
          .replace(/\s(.)/g, (_, char) => char.toUpperCase())
          .replace(/^[a-z]/, char => char.toUpperCase())
        break
      case "snake_case":
        result = text
          .replace(/[^a-zA-Z0-9\s]/g, ' ')
          .toLowerCase()
          .replace(/\s+/g, ' ')
          .trim()
          .replace(/\s/g, '_')
        break
      case "SCREAMING_SNAKE_CASE":
        result = text
          .replace(/[^a-zA-Z0-9\s]/g, ' ')
          .toUpperCase()
          .replace(/\s+/g, ' ')
          .trim()
          .replace(/\s/g, '_')
        break
      case "kebab-case":
        result = text
          .replace(/[^a-zA-Z0-9\s]/g, ' ')
          .toLowerCase()
          .replace(/\s+/g, ' ')
          .trim()
          .replace(/\s/g, '-')
        break
      case "dot.case":
        result = text
          .replace(/[^a-zA-Z0-9\s]/g, ' ')
          .toLowerCase()
          .replace(/\s+/g, ' ')
          .trim()
          .replace(/\s/g, '.')
        break
      case "path/case":
        result = text
          .replace(/[^a-zA-Z0-9\s]/g, ' ')
          .toLowerCase()
          .replace(/\s+/g, ' ')
          .trim()
          .replace(/\s/g, '/')
        break
      case "tOGGLE cASE":
        result = text
          .split('')
          .map(char => 
            char === char.toUpperCase() 
              ? char.toLowerCase() 
              : char.toUpperCase()
          )
          .join('')
        break
      case "RaNdOm CaSe":
        result = text
          .split('')
          .map(char => 
            Math.random() > 0.5 
              ? char.toUpperCase() 
              : char.toLowerCase()
          )
          .join('')
        break
      case "Trim Whitespace":
        result = text
          .trim()
          .replace(/\s+/g, ' ')
        break
      case "Remove Duplicate Lines":
        result = Array.from(new Set(text.split('\n')))
          .filter(line => line.trim())
          .join('\n')
        break
      case "Remove Empty Lines":
        result = text
          .split('\n')
          .filter(line => line.trim())
          .join('\n')
        break
      case "Sort Lines (A-Z)":
        result = text
          .split('\n')
          .filter(line => line.trim())
          .sort((a, b) => a.localeCompare(b))
          .join('\n')
        break
      case "Sort Lines (Z-A)":
        result = text
          .split('\n')
          .filter(line => line.trim())
          .sort((a, b) => b.localeCompare(a))
          .join('\n')
        break
      default:
        result = text
    }

    setOutputText(result)
  }, [selectedFunction])

  React.useEffect(() => {
    processText(inputText)
  }, [inputText, selectedFunction, processText])

  const handleCopy = async () => {
    if (!outputText) return
    
    try {
      await navigator.clipboard.writeText(outputText)
      toast({
        title: "Copied to clipboard",
        description: "Text has been copied to your clipboard",
        duration: 2000,
      })
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  const handleDownload = () => {
    if (!outputText) return

    const blob = new Blob([outputText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedFunction.toLowerCase().replace(/\s+/g, '-')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded successfully",
      description: "Your text has been downloaded",
      duration: 2000,
    })
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-2">{description}</p>
          )}
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Select value={selectedFunction} onValueChange={setSelectedFunction}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select function" />
                  </SelectTrigger>
                  <SelectContent>
                    {functions.map((func) => (
                      <SelectItem key={func.name} value={func.name}>
                        {func.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Textarea
                  placeholder="Enter text here..."
                  value={inputText}
                  onChange={handleInputChange}
                  className="min-h-[300px] font-mono"
                />

                <TextStatsDisplay stats={textStats} />
              </div>

              <div className="space-y-4">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopy}
                    disabled={!outputText}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleDownload}
                    disabled={!outputText}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <Textarea
                  readOnly
                  value={outputText}
                  className="min-h-[300px] font-mono bg-secondary/20"
                  placeholder="Output will appear here..."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <AboutSection
          title="About Case Converter"
          content={caseConverterAboutContent}
        />
      </div>
    </div>
  )
}
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { AboutSection } from "@/components/tools/about-section"
import { formatters } from "@/lib/utils/formatters"
import { Copy, Download, RotateCcw } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const aboutContent = (
  <div className="space-y-6">
    <p>
      Transform your code with our <strong>Code Formatter Tool</strong>. 
      Format and beautify code in multiple languages with customizable options.
    </p>

    <hr />

    <h3 className="text-xl font-bold">Features</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">🔧 Supported Languages</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Python:</strong> Format using Black code formatter</li>
          <li><strong>JavaScript/TypeScript:</strong> Format modern JS/TS code</li>
          <li><strong>HTML:</strong> Clean and organize HTML markup</li>
          <li><strong>CSS:</strong> Format stylesheets with proper indentation</li>
          <li><strong>JSON:</strong> Pretty print and validate JSON data</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">⚡ Key Features</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Real-time Formatting:</strong> See changes as you type</li>
          <li><strong>Minify Mode:</strong> Switch between formatted and minified output</li>
          <li><strong>Syntax Validation:</strong> Catch errors in JSON</li>
          <li><strong>Copy & Download:</strong> Save formatted code</li>
        </ul>
      </div>
    </div>

    <hr />

    <h3 className="text-xl font-bold">Use Cases</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">💻 Development</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Clean up messy or minified code</li>
          <li>Format code before committing</li>
          <li>Standardize code style</li>
          <li>Prepare code for documentation</li>
        </ul>
      </div>
    </div>
  </div>
)

export function CodeFormatterTool() {
  const [inputCode, setInputCode] = React.useState("")
  const [outputCode, setOutputCode] = React.useState("")
  const [language, setLanguage] = React.useState("javascript")
  const [minifyMode, setMinifyMode] = React.useState(false)
  const [isFormatting, setIsFormatting] = React.useState(false)
  const { toast } = useToast()

  const formatCode = React.useCallback(async (code: string, lang: string, minify: boolean) => {
    if (!code) {
      setOutputCode("")
      return
    }

    try {
      setIsFormatting(true)
      const formatter = formatters[lang]
      
      if (minify) {
        if (!formatter.minify) {
          toast({
            title: "Not Supported",
            description: "Minification is not supported for this language",
            variant: "destructive",
          })
          return
        }
        const result = formatter.minify(code)
        setOutputCode(result)
      } else {
        const result = await formatter.format(code, { indent: 2 })
        setOutputCode(result)
      }
    } catch (error) {
      toast({
        title: "Format Error",
        description: error instanceof Error ? error.message : "Failed to format code",
        variant: "destructive",
      })
    } finally {
      setIsFormatting(false)
    }
  }, [toast])

  React.useEffect(() => {
    formatCode(inputCode, language, minifyMode)
  }, [inputCode, language, minifyMode, formatCode])

  const handleCopy = async () => {
    if (!outputCode) return
    
    try {
      await navigator.clipboard.writeText(outputCode)
      toast({
        title: "Copied to clipboard",
        description: "Code has been copied to your clipboard",
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
    if (!outputCode) return

    const blob = new Blob([outputCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `formatted-code.${language}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded successfully",
      description: "Your code has been downloaded",
      duration: 2000,
    })
  }

  const handleReset = () => {
    setInputCode("")
    setOutputCode("")
    setLanguage("javascript")
    setMinifyMode(false)
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Code Formatter</h1>
          <p className="text-muted-foreground mt-2">
            Format and beautify code in multiple programming languages
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="css">CSS</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Textarea
                  placeholder="Enter code here..."
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="min-h-[400px] font-mono"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="minify-mode"
                      checked={minifyMode}
                      onCheckedChange={setMinifyMode}
                      disabled={language === 'python'}
                    />
                    <Label htmlFor="minify-mode">Minify Mode</Label>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopy}
                      disabled={!outputCode || isFormatting}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleDownload}
                      disabled={!outputCode || isFormatting}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      disabled={isFormatting}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>

                <Textarea
                  readOnly
                  value={isFormatting ? "Formatting..." : outputCode}
                  className="min-h-[400px] font-mono bg-secondary/20"
                  placeholder="Formatted code will appear here..."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <AboutSection
          title="About Code Formatter"
          content={aboutContent}
        />
      </div>
    </div>
  )
}
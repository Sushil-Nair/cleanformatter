"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { AboutSection } from "@/components/tools/about-section"
import { TextStatsDisplay } from "@/components/tools/text-stats"
import { TextStats } from "@/types/tools"
import { Copy, Download, RotateCcw } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { encodeURL, decodeURL, URLEncoderOptions } from "@/lib/utils/url"

const aboutContent = (
  <div className="space-y-6">
    <p>
      Encode and decode URLs with our <strong>URL Encoder/Decoder Tool</strong>. 
      Handle special characters, spaces, and Unicode in URLs safely and efficiently.
    </p>

    <hr />

    <h3 className="text-xl font-bold">Features</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">🔄 Conversion Options</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>URI Encoding:</strong> Full URL encoding (encodeURI)</li>
          <li><strong>Component Encoding:</strong> Parameter encoding (encodeURIComponent)</li>
          <li><strong>Space Handling:</strong> Choose between %20 and + for spaces</li>
          <li><strong>Full Encoding:</strong> Encode all characters, including reserved ones</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">⚡ Advanced Features</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Bulk Processing:</strong> Handle multiple URLs</li>
          <li><strong>Smart Detection:</strong> Skip already encoded sequences</li>
          <li><strong>Unicode Support:</strong> Handle international characters</li>
        </ul>
      </div>
    </div>

    <hr />

    <h3 className="text-xl font-bold">Use Cases</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">💻 Development</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Prepare URLs for API requests</li>
          <li>Handle query parameters</li>
          <li>Process form submissions</li>
          <li>Create safe file paths</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">🔒 Security</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Sanitize user input</li>
          <li>Prevent URL injection</li>
          <li>Handle special characters safely</li>
        </ul>
      </div>
    </div>
  </div>
)

export function URLEncoderTool() {
  const [inputText, setInputText] = React.useState("")
  const [outputText, setOutputText] = React.useState("")
  const [mode, setMode] = React.useState<"encode" | "decode">("encode")
  const [options, setOptions] = React.useState<URLEncoderOptions>({
    mode: 'uri',
    spaceAsPlus: false,
    encodeAll: false,
    skipEncoded: true
  })
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
    if (!text) {
      setOutputText("")
      return
    }

    try {
      const result = mode === "encode"
        ? encodeURL(text, options)
        : decodeURL(text, options)
      setOutputText(result)
    } catch (error) {
      toast({
        title: `Failed to ${mode} text`,
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    }
  }, [mode, options, toast])

  React.useEffect(() => {
    processText(inputText)
  }, [inputText, mode, options, processText])

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
    a.download = `${mode}d-urls.txt`
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

  const handleReset = () => {
    setInputText("")
    setOutputText("")
    setMode("encode")
    setOptions({
      mode: 'uri',
      spaceAsPlus: false,
      encodeAll: false,
      skipEncoded: true
    })
    setTextStats({
      words: 0,
      sentences: 0,
      characters: 0,
      paragraphs: 0
    })
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">URL Encoder/Decoder</h1>
          <p className="text-muted-foreground mt-2">
            Convert URLs and query parameters with proper encoding
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Select value={mode} onValueChange={(value: "encode" | "decode") => setMode(value)}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="encode">Encode URL</SelectItem>
                      <SelectItem value="decode">Decode URL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Textarea
                  placeholder={mode === "encode" ? "Enter URL to encode..." : "Enter encoded URL to decode..."}
                  value={inputText}
                  onChange={handleInputChange}
                  className="min-h-[400px] font-mono"
                />
                <TextStatsDisplay stats={textStats} />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    value={options.mode}
                    onValueChange={(value: URLEncoderOptions['mode']) => 
                      setOptions(prev => ({ ...prev, mode: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select encoding" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uri">URI Encoding</SelectItem>
                      <SelectItem value="component">Component Encoding</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="space-plus"
                      checked={options.spaceAsPlus}
                      onCheckedChange={(checked) => 
                        setOptions(prev => ({ ...prev, spaceAsPlus: checked }))
                      }
                    />
                    <Label htmlFor="space-plus">Use + for Spaces</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="encode-all"
                      checked={options.encodeAll}
                      onCheckedChange={(checked) => 
                        setOptions(prev => ({ ...prev, encodeAll: checked }))
                      }
                    />
                    <Label htmlFor="encode-all">Encode All Characters</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="skip-encoded"
                      checked={options.skipEncoded}
                      onCheckedChange={(checked) => 
                        setOptions(prev => ({ ...prev, skipEncoded: checked }))
                      }
                    />
                    <Label htmlFor="skip-encoded">Skip Encoded Parts</Label>
                  </div>
                </div>

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
                  <Button
                    variant="outline"
                    onClick={handleReset}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>

                <Textarea
                  readOnly
                  value={outputText}
                  className="min-h-[400px] font-mono bg-secondary/20"
                  placeholder={mode === "encode" ? "Encoded URL will appear here..." : "Decoded URL will appear here..."}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <AboutSection
          title="About URL Encoder/Decoder"
          content={aboutContent}
        />
      </div>
    </div>
  )
}
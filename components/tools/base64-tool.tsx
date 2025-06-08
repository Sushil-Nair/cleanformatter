"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { AboutSection } from "@/components/tools/about-section"
import { TextStatsDisplay } from "@/components/tools/text-stats"
import { TextStats } from "@/types/tools"
import { Copy, Download, RotateCcw, Upload } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { encodeBase64, decodeBase64, Base64Options } from "@/lib/utils/base64"

const aboutContent = (
  <div className="space-y-6">
    <p>
      Convert text to and from Base64 with our <strong>Base64 Encoder/Decoder Tool</strong>. 
      Support for multiple character sets, URL-safe encoding, and file handling.
    </p>

    <hr />

    <h3 className="text-xl font-bold">Features</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">🔄 Conversion Options</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Standard Base64:</strong> RFC 4648 compliant encoding</li>
          <li><strong>URL-safe Base64:</strong> Web-safe variant using "-" and "_"</li>
          <li><strong>Character Sets:</strong> UTF-8, ASCII, and ISO-8859-1 support</li>
          <li><strong>Line Wrapping:</strong> Optional wrapping at 76 characters</li>
          <li><strong>Padding Control:</strong> Optional "=" padding characters</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">📁 File Handling</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Drag & Drop:</strong> Upload files up to 200MB</li>
          <li><strong>Image Support:</strong> Convert images to/from Base64</li>
          <li><strong>Bulk Processing:</strong> Handle multiple files</li>
        </ul>
      </div>
    </div>

    <hr />

    <h3 className="text-xl font-bold">Use Cases</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">💻 Development</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Encode data for URLs</li>
          <li>Create data URIs</li>
          <li>Store binary data</li>
          <li>Process file uploads</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">🔒 Security</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Basic data obfuscation</li>
          <li>Safe data transmission</li>
          <li>Cookie/token encoding</li>
        </ul>
      </div>
    </div>
  </div>
)

export function Base64Tool() {
  const [inputText, setInputText] = React.useState("")
  const [outputText, setOutputText] = React.useState("")
  const [mode, setMode] = React.useState<"encode" | "decode">("encode")
  const [options, setOptions] = React.useState<Base64Options>({
    urlSafe: false,
    padding: true,
    lineWrap: false,
    lineLength: 76,
    charset: 'utf-8'
  })
  const [textStats, setTextStats] = React.useState<TextStats>({
    words: 0,
    sentences: 0,
    characters: 0,
    paragraphs: 0
  })
  const fileInputRef = React.useRef<HTMLInputElement>(null)
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
        ? encodeBase64(text, options)
        : decodeBase64(text, options)
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

  const handleFileUpload = async (files: FileList | null) => {
    if (!files?.length) return

    const file = files[0]
    if (file.size > 200 * 1024 * 1024) { // 200MB limit
      toast({
        title: "File too large",
        description: "Maximum file size is 200MB",
        variant: "destructive",
      })
      return
    }

    try {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        if (mode === "encode") {
          setInputText(result)
        } else {
          const base64 = result.split(',')[1] || result
          setInputText(base64)
        }
      }
      
      if (mode === "encode") {
        reader.readAsText(file)
      } else {
        reader.readAsDataURL(file)
      }
    } catch (error) {
      toast({
        title: "Failed to read file",
        description: "Please try again or use a different file",
        variant: "destructive",
      })
    }
  }

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
    a.download = `${mode}d-base64.txt`
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
      urlSafe: false,
      padding: true,
      lineWrap: false,
      lineLength: 76,
      charset: 'utf-8'
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
          <h1 className="text-3xl font-bold tracking-tight">Base64 Encoder/Decoder</h1>
          <p className="text-muted-foreground mt-2">
            Convert text to and from Base64 format with advanced options
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
                      <SelectItem value="encode">Encode to Base64</SelectItem>
                      <SelectItem value="decode">Decode from Base64</SelectItem>
                    </SelectContent>
                  </Select>

                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                </div>

                <Textarea
                  placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
                  value={inputText}
                  onChange={handleInputChange}
                  className="min-h-[400px] font-mono"
                />
                <TextStatsDisplay stats={textStats} />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="url-safe"
                      checked={options.urlSafe}
                      onCheckedChange={(checked) => 
                        setOptions(prev => ({ ...prev, urlSafe: checked }))
                      }
                    />
                    <Label htmlFor="url-safe">URL-safe Mode</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="padding"
                      checked={options.padding}
                      onCheckedChange={(checked) => 
                        setOptions(prev => ({ ...prev, padding: checked }))
                      }
                    />
                    <Label htmlFor="padding">Add Padding</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="line-wrap"
                      checked={options.lineWrap}
                      onCheckedChange={(checked) => 
                        setOptions(prev => ({ ...prev, lineWrap: checked }))
                      }
                    />
                    <Label htmlFor="line-wrap">Line Wrap</Label>
                  </div>
                  <Select
                    value={options.charset}
                    onValueChange={(value: Base64Options['charset']) => 
                      setOptions(prev => ({ ...prev, charset: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select charset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utf-8">UTF-8</SelectItem>
                      <SelectItem value="ascii">ASCII</SelectItem>
                      <SelectItem value="iso-8859-1">ISO-8859-1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {options.lineWrap && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Line Length ({options.lineLength} characters)</Label>
                    </div>
                    <Slider
                      value={[options.lineLength]}
                      min={20}
                      max={200}
                      step={4}
                      onValueChange={([value]) => 
                        setOptions(prev => ({ ...prev, lineLength: value }))
                      }
                    />
                  </div>
                )}

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
                  placeholder={mode === "encode" ? "Encoded Base64 will appear here..." : "Decoded text will appear here..."}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <AboutSection
          title="About Base64 Encoder/Decoder"
          content={aboutContent}
        />
      </div>
    </div>
  )
}
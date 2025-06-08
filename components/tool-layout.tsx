"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TextStatsDisplay } from "@/components/tools/text-stats"
import { AboutSection } from "@/components/tools/about-section"
import { useToast } from "@/hooks/use-toast"
import { TextStats } from "@/types/tools"
import { 
  ArrowDownUp,
  Copy,
  Download,
  History,
  Share2, 
  Wand2,
  X
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ToolLayoutProps {
  title: string
  description?: string
  functions: { name: string; description: string }[]
  onProcess: (text: string, functionName: string) => string
  aboutContent?: React.ReactNode
}

export function ToolLayout({
  title,
  description,
  functions,
  onProcess,
  aboutContent
}: ToolLayoutProps) {
  const [inputText, setInputText] = React.useState("")
  const [outputText, setOutputText] = React.useState("")
  const [selectedFunction, setSelectedFunction] = React.useState(functions[0]?.name || "")
  const [realtimePreview, setRealtimePreview] = React.useState(true)
  const [history, setHistory] = React.useState<{ input: string; output: string; function: string }[]>([])
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

  const processText = React.useCallback(() => {
    if (!inputText || !selectedFunction) return

    const result = onProcess(inputText, selectedFunction)
    setOutputText(result)

    // Add to history
    setHistory(prev => [{
      input: inputText,
      output: result,
      function: selectedFunction
    }, ...prev.slice(0, 9)])
  }, [inputText, selectedFunction, onProcess])

  React.useEffect(() => {
    if (realtimePreview) {
      processText()
    }
  }, [inputText, selectedFunction, realtimePreview, processText])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setInputText(newText)
    calculateStats(newText)
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
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-output.txt`
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

  const handleShare = async () => {
    if (!outputText) return

    try {
      await navigator.share({
        title: title,
        text: outputText,
      })
      
      toast({
        title: "Shared successfully",
        description: "Your text has been shared",
        duration: 2000,
      })
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        toast({
          title: "Couldn't share",
          description: "Your browser might not support sharing",
          variant: "destructive",
          duration: 3000,
        })
      }
    }
  }

  const detectFormat = () => {
    if (!inputText) return

    try {
      // Try parsing as JSON
      JSON.parse(inputText)
      setSelectedFunction("JSON")
      return
    } catch {}

    // Check for XML-like content
    if (/<[^>]+>/.test(inputText)) {
      setSelectedFunction("XML")
      return
    }

    // Check for URL-encoded content
    if (/%[0-9A-Fa-f]{2}/.test(inputText)) {
      setSelectedFunction("URL Decode")
      return
    }

    // Check for Base64
    if (/^[A-Za-z0-9+/=]+$/.test(inputText)) {
      setSelectedFunction("Base64 Decode")
      return
    }

    toast({
      title: "Format detection",
      description: "Could not detect a specific format",
      duration: 2000,
    })
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-2">{description}</p>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <History className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>History</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
                  <div className="space-y-4">
                    {history.map((item, index) => (
                      <Card key={index} className="cursor-pointer hover:bg-accent" onClick={() => {
                        setInputText(item.input)
                        setSelectedFunction(item.function)
                        calculateStats(item.input)
                      }}>
                        <CardContent className="p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{item.function}</span>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation()
                                setHistory(prev => prev.filter((_, i) => i !== index))
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{item.input}</p>
                        </CardContent>
                      </Card>
                    ))}
                    {history.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No history yet
                      </p>
                    )}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Select value={selectedFunction} onValueChange={setSelectedFunction}>
                    <SelectTrigger className="w-[200px]">
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
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={detectFormat}
                    disabled={!inputText}
                  >
                    <Wand2 className="h-4 w-4" />
                  </Button>
                </div>

                <Textarea
                  placeholder="Enter text here..."
                  value={inputText}
                  onChange={handleInputChange}
                  className="min-h-[300px] font-mono"
                />

                <TextStatsDisplay stats={textStats} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setRealtimePreview(!realtimePreview)}
                    >
                      {realtimePreview ? "Disable" : "Enable"} Real-time Preview
                    </Button>

                    {!realtimePreview && (
                      <Button
                        size="sm"
                        onClick={processText}
                        disabled={!inputText}
                      >
                        <ArrowDownUp className="h-4 w-4 mr-2" />
                        Process
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
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
                      size="icon"
                      onClick={handleShare}
                      disabled={!outputText}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={outputText}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Textarea
                      readOnly
                      value={outputText}
                      className="min-h-[300px] font-mono bg-secondary/20"
                      placeholder="Output will appear here..."
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </CardContent>
        </Card>

        {aboutContent && (
          <AboutSection
            title="About Case Converter"
            content={aboutContent}
          />
        )}
      </div>
    </div>
  )
}
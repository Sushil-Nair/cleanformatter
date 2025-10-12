// // Updated Find and Replace Tool with fixes

// "use client"

// import * as React from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
// import { useToast } from "@/hooks/use-toast"
// import { AboutSection } from "@/components/tools/about-section"
// import { TextStatsDisplay } from "@/components/tools/text-stats"
// import { TextStats } from "@/types/tools"
// import { Textarea } from "@/components/ui/textarea"
// import { findAll } from 'highlight-words-core'
// import { ArrowLeft, ArrowRight } from "lucide-react"
// import debounce from 'lodash/debounce'

// interface FindReplaceLayoutProps {
//   title: string
//   description?: string
// }

// interface MatchInfo {
//   index: number
//   length: number
// }

// const findReplaceAboutContent = (
//   <div className="space-y-6">
//     <p>Transform your text editing workflow with our powerful <strong>Find and Replace Tool</strong> – designed for developers, writers, and data professionals who need precise text manipulation capabilities.</p>

//     <hr />

//     <h3 className="text-xl font-bold">Key Features</h3>
//     <div className="space-y-4">
//       <div>
//         <h4 className="font-semibold">🔍 Advanced Search Options</h4>
//         <ul className="list-disc pl-6 space-y-2">
//           <li><strong>Regular Expressions:</strong> Use powerful regex patterns for complex search operations</li>
//           <li><strong>Case Sensitivity:</strong> Toggle case-matching for precise searches</li>
//           <li><strong>Whole Word Matching:</strong> Find exact word matches only</li>
//           <li><strong>Wildcard Support:</strong> Use * and ? for flexible matching</li>
//         </ul>
//       </div>

//       <div>
//         <h4 className="font-semibold">⚡ Real-time Preview</h4>
//         <ul className="list-disc pl-6 space-y-2">
//           <li><strong>Live Highlighting:</strong> See matches as you type</li>
//           <li><strong>Match Navigation:</strong> Jump between matches easily</li>
//           <li><strong>Match Counter:</strong> Track the number of matches found</li>
//         </ul>
//       </div>

//       <div>
//         <h4 className="font-semibold">🔄 Flexible Replacement</h4>
//         <ul className="list-disc pl-6 space-y-2">
//           <li><strong>Single Replace:</strong> Replace individual matches</li>
//           <li><strong>Replace All:</strong> Update all matches at once</li>
//           <li><strong>Regex Capture Groups:</strong> Use advanced replacement patterns</li>
//         </ul>
//       </div>
//     </div>

//     <hr />

//     <h3 className="text-xl font-bold">Use Cases</h3>
//     <div className="space-y-4">
//       <div>
//         <h4 className="font-semibold">📝 Text Editing</h4>
//         <ul className="list-disc pl-6 space-y-2">
//           <li><strong>Content Updates:</strong> Quickly update terms across documents</li>
//           <li><strong>Code Refactoring:</strong> Rename variables and functions</li>
//           <li><strong>Data Cleaning:</strong> Standardize formats and remove errors</li>
//         </ul>
//       </div>

//       <div>
//         <h4 className="font-semibold">🔧 Advanced Operations</h4>
//         <ul className="list-disc pl-6 space-y-2">
//           <li><strong>Format Conversion:</strong> Transform data between different formats</li>
//           <li><strong>Pattern Matching:</strong> Find specific text patterns</li>
//           <li><strong>Batch Processing:</strong> Make multiple changes simultaneously</li>
//         </ul>
//       </div>
//     </div>

//     <hr />

//     <h3 className="text-xl font-bold">Tips & Tricks</h3>
//     <div className="space-y-4">
//       <div>
//         <h4 className="font-semibold">🎯 Regular Expression Examples</h4>
//         <ul className="list-disc pl-6 space-y-2">
//           <li><code>\b\w+@\w+\.\w+\b</code> - Find email addresses</li>
//           <li><code>\b\d{3}[-.]?\d{3}[-.]?\d{4}\b</code> - Find phone numbers</li>
//           <li><code>\b[A-Z][a-z]+\b</code> - Find capitalized words</li>
//         </ul>
//       </div>

//       <div>
//         <h4 className="font-semibold">💡 Best Practices</h4>
//         <ul className="list-disc pl-6 space-y-2">
//           <li>Always preview changes before replacing</li>
//           <li>Use whole word matching to avoid partial matches</li>
//           <li>Back up important text before making bulk changes</li>
//         </ul>
//       </div>
//     </div>

//     <hr />

//     <h3 className="text-xl font-bold">Keyboard Shortcuts</h3>
//     <div className="space-y-2">
//       <ul className="list-disc pl-6 space-y-2">
//         <li><strong>Ctrl/Cmd + F:</strong> Focus search input</li>
//         <li><strong>Enter:</strong> Find next match</li>
//         <li><strong>Shift + Enter:</strong> Find previous match</li>
//         <li><strong>Ctrl/Cmd + Enter:</strong> Replace current match</li>
//         <li><strong>Ctrl/Cmd + Alt + Enter:</strong> Replace all matches</li>
//       </ul>
//     </div>

//     <div className="mt-8 p-4 bg-secondary/20 rounded-lg">
//       <h4 className="font-semibold mb-2">💪 Pro Tip</h4>
//       <p>
//         When using wildcards, use * to match any number of characters and ? to match a single character.
//         For example, "test*" matches "test", "testing", "tester", etc.
//       </p>
//     </div>
//   </div>
// )

// export function FindReplaceLayout({ title, description }: FindReplaceLayoutProps) {
//   const [inputText, setInputText] = React.useState("")
//   const [findText, setFindText] = React.useState("")
//   const [replaceText, setReplaceText] = React.useState("")
//   const [caseSensitive, setCaseSensitive] = React.useState(false)
//   const [useRegex, setUseRegex] = React.useState(false)
//   const [wholeWord, setWholeWord] = React.useState(false)
//   const [wildcard, setWildcard] = React.useState(false)
//   const [matches, setMatches] = React.useState<MatchInfo[]>([])
//   const [currentMatchIndex, setCurrentMatchIndex] = React.useState(0)
//   const [textStats, setTextStats] = React.useState<TextStats>({ words: 0, sentences: 0, characters: 0, paragraphs: 0 })

//   // Refs for scrolling sync
//   const textareaRef = React.useRef<HTMLTextAreaElement>(null)
//   const backdropRef = React.useRef<HTMLDivElement>(null)
//   const { toast } = useToast()

//   // Disable browser spellcheck to avoid strikethrough styling on transparent text
//   const textareaProps = {
//     spellCheck: false as const,
//     style: {
//       color: 'transparent',
//       caretColor: 'currentColor',
//       background: 'transparent',
//       position: 'absolute' as const,
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       zIndex: 1,
//       textDecoration: 'none'
//     }
//   }

//   // Utility to escape regex special chars
//   const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')

//   const findMatches = (text: string, searchText: string): MatchInfo[] => {
//     if (!searchText) return []
//     try {
//       const flags = caseSensitive ? 'g' : 'gi'
//       let pattern: RegExp
//       if (useRegex) {
//         pattern = new RegExp(searchText, flags)
//       } else {
//         let escaped = escapeRegex(searchText)
//         if (wildcard) escaped = escaped.replace(/\\\\\*/g, '.*').replace(/\\\\\?/g, '.')
//         pattern = wholeWord ? new RegExp(`\\b${escaped}\\b`, flags) : new RegExp(escaped, flags)
//       }
//       const result: MatchInfo[] = []
//       let m
//       while ((m = pattern.exec(text)) !== null) {
//         result.push({ index: m.index, length: m[0].length })
//       }
//       return result
//     } catch {
//       return []
//     }
//   }

//   // Debounced update of matches
//   const updateMatches = React.useCallback(
//     debounce((txt: string, term: string) => {
//       setMatches(findMatches(txt, term))
//       setCurrentMatchIndex(0)
//     }, 200),
//     [caseSensitive, useRegex, wholeWord, wildcard]
//   )

//   const calculateStats = (text: string) => {
//     setTextStats({
//       words: text.trim().split(/\s+/).filter(Boolean).length,
//       sentences: text.split(/[.!?]+/).filter(Boolean).length,
//       characters: text.length,
//       paragraphs: text.split(/\n\s*\n/).filter(Boolean).length
//     })
//   }

//   // Handlers
//   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const val = e.target.value
//     setInputText(val)
//     calculateStats(val)
//     updateMatches(val, findText)
//   }

//   const handleFindChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const term = e.target.value
//   setFindText(term)
//   // Immediately re-run match-finding so the UI stays in sync
//   updateMatches(inputText, term)
// }

//   // Effect to refresh matches on term/options change
//   React.useEffect(() => { updateMatches(inputText, findText) }, [findText, caseSensitive, useRegex, wholeWord, wildcard])

//   // Sync scrolling
//   React.useEffect(() => {
//     const ta = textareaRef.current
//     if (!ta) return
//     const sync = () => {
//       if (backdropRef.current) {
//         backdropRef.current.scrollTop = ta.scrollTop
//         backdropRef.current.scrollLeft = ta.scrollLeft
//       }
//     }
//     ta.addEventListener('scroll', sync)
//     return () => ta.removeEventListener('scroll', sync)
//   }, [])

//   // Render highlighted text
//   const renderHighlightedText = () => {
//     if (!findText) return inputText
//     try {
//       const words = useRegex ? [findText] : [useRegex ? findText : escapeRegex(findText)]
//       const chunks = findAll({ searchWords: words, textToHighlight: inputText, autoEscape: !useRegex, caseSensitive })
//       return chunks.map((chunk, idx) => {
//         if (!chunk.highlight) return chunk.text
//         const isCurrent = Math.floor(idx/2) === currentMatchIndex
//         return (
//           <mark key={idx} style={{ textDecoration: 'underline', backgroundColor: isCurrent ? undefined : undefined }}>
//             {chunk.text}
//           </mark>
//         )
//       })
//     } catch {
//       return inputText
//     }
//   }

//   return (
//     <div className="container max-w-6xl mx-auto px-4 py-8">
//       <div className="space-y-4">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
//           {description && (
//             <p className="text-muted-foreground mt-2">{description}</p>
//           )}
//         </div>

//         <Card>
//           <CardContent className="p-6">
//             <div className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="find">Find</Label>
//                   <Input
//                     id="find"
//                     value={findText}
//                     onChange={(e) => setFindText(e.target.value)}
//                     placeholder={useRegex ? "Regular expression..." : "Text to find..."}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="replace">Replace</Label>
//                   <Input
//                     id="replace"
//                     value={replaceText}
//                     onChange={(e) => setReplaceText(e.target.value)}
//                     placeholder={useRegex ? "Replacement pattern..." : "Replace with..."}
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-6">
//                 <div className="flex items-center space-x-2">
//                   <Switch
//                     id="wildcard"
//                     checked={wildcard}
//                     onCheckedChange={setWildcard}
//                     disabled={useRegex}
//                   />
//                   <Label htmlFor="wildcard">Use wildcards</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Switch
//                     id="case-sensitive"
//                     checked={caseSensitive}
//                     onCheckedChange={setCaseSensitive}
//                   />
//                   <Label htmlFor="case-sensitive">Case sensitive</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Switch
//                     id="regex"
//                     checked={useRegex}
//                     onCheckedChange={(checked) => {
//                       setUseRegex(checked)
//                       if (checked) setWildcard(false)
//                     }}
//                   />
//                   <Label htmlFor="regex">Use regex</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Switch
//                     id="whole-word"
//                     checked={wholeWord}
//                     onCheckedChange={setWholeWord}
//                     disabled={useRegex}
//                   />
//                   <Label htmlFor="whole-word">Whole words only</Label>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <p className="text-sm text-muted-foreground">
//                     {matches.length} {matches.length === 1 ? 'match' : 'matches'} found
//                   </p>
//                   {matches.length > 0 && (
//                     <div className="flex items-center gap-2">
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => setCurrentMatchIndex((i) => (i - 1 + matches.length) % matches.length)}
//                         disabled={matches.length <= 1}
//                       >
//                         <ArrowLeft className="h-4 w-4" />
//                       </Button>
//                       <span className="text-sm">
//                         {currentMatchIndex + 1} of {matches.length}
//                       </span>
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => setCurrentMatchIndex((i) => (i + 1) % matches.length)}
//                         disabled={matches.length <= 1}
//                       >
//                         <ArrowRight className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//                 <div className="space-x-2">
//                   <Button
//                     onClick={() => handleReplace(false)}
//                     disabled={!findText || matches.length === 0}
//                   >
//                     Replace
//                   </Button>
//                   <Button
//                     onClick={() => handleReplace(true)}
//                     disabled={!findText || matches.length === 0}
//                   >
//                     Replace All
//                   </Button>
//                 </div>
//               </div>

//               <div className="relative">
//                 <Textarea
//                   ref={textareaRef}
//                   value={inputText}
//                   onChange={handleInputChange}
//                   placeholder="Enter text here..."
//                   className="min-h-[300px] font-mono caret-foreground"
//                   style={{
//                     color: 'transparent',
//                     caretColor: 'currentColor',
//                     background: 'transparent',
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     zIndex: 1
//                   }}
//                 />
//                 <div
//                   ref={backdropRef}
//                   className="min-h-[300px] font-mono p-3 text-foreground overflow-auto whitespace-pre-wrap"
//                   style={{
//                     position: 'relative',
//                     zIndex: 0,
//                     pointerEvents: 'none'
//                   }}
//                 >
//                   {renderHighlightedText()}
//                 </div>
//               </div>

//               <TextStatsDisplay stats={textStats} />
//             </div>
//           </CardContent>
//         </Card>

//         <AboutSection
//           title="About Find and Replace"
//           content={findReplaceAboutContent}
//         />
//       </div>
//     </div>
//   )
// }

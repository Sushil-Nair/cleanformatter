"use client";

import { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";

import { useTextWrapperEngine } from "@/hooks/useTextWrapperEngine";
import { useScrollSync } from "@/hooks/useScrollSync";

import { WrapModeSelector } from "./text-wrapper/WrapModeSelector";
import { WidthSliderCard } from "./text-wrapper/WidthSliderCard";
import { WrapOptionsToggles } from "./text-wrapper/WrapOptionsToggles";
import { WrapPresetsBar } from "./text-wrapper/WrapPresetsBar";
import { WrapSummary } from "./text-wrapper/WrapSummary";
import { WrapToolbar } from "./text-wrapper/WrapToolbar";

export default function TextWrapperTool() {
  /**
   * Engine Hook
   */
  const {
    inputText,
    setInputText,
    wrappedText,
    options,
    updateOptions,
    statsInput,
    statsOutput,
    isProcessing,
  } = useTextWrapperEngine();

  /**
   * Scroll Sync
   */
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const outputRef = useRef<HTMLTextAreaElement | null>(null);
  useScrollSync(inputRef, outputRef);

  /**
   * Toolbar Handlers
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(wrappedText);
    } catch {
      console.error("Copy failed");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([wrappedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "wrapped-text.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInputText("");
    updateOptions({
      width: 72,
      mode: "word",
    });
  };

  return (
    <div className="w-full flex flex-col gap-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Text Wrapper</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Wrap text cleanly with word, character, smart, or code-friendly modes.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Mode Selector */}
        <WrapModeSelector
          value={options.mode}
          onChange={(mode) => updateOptions({ mode })}
        />

        {/* TOOLBAR */}
        <WrapToolbar
          onCopy={handleCopy}
          onDownload={handleDownload}
          onReset={handleReset}
          disabled={isProcessing || wrappedText.length === 0}
        />
      </div>

      {/* ================================
          INPUT / OUTPUT SECTION (TOP)
         ================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT — INPUT */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Input Text</label>
          <Textarea
            ref={inputRef}
            value={inputText}
            placeholder="Paste or type text here..."
            className="min-h-[340px] resize-none font-mono"
            onChange={(e) => setInputText(e.target.value)}
          />

          {/* Input Stats */}
          <div className="text-xs text-muted-foreground">
            {statsInput.words} words • {statsInput.chars} chars •{" "}
            {statsInput.lines} lines
          </div>
        </div>

        {/* RIGHT — OUTPUT */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Wrapped Output</label>
          <Textarea
            ref={outputRef}
            value={wrappedText}
            readOnly
            className="min-h-[340px] resize-none font-mono bg-muted"
          />

          {/* Output Stats */}
          <div className="text-xs text-muted-foreground">
            {statsOutput.words} words • {statsOutput.chars} chars •{" "}
            {statsOutput.lines} lines
          </div>
        </div>
      </div>

      {/* SUMMARY BELOW INPUT/OUTPUT */}
      <WrapSummary options={options} stats={statsOutput} />

      {/* ================================
          OPTIONS SECTION (BOTTOM)
         ================================ */}
      <div className="flex flex-col gap-6">
        {/* Width Slider */}
        <WidthSliderCard
          value={options.width}
          onChange={(width) => updateOptions({ width })}
        />

        {/* Presets */}
        <WrapPresetsBar currentWidth={options.width} onSelect={updateOptions} />

        {/* Toggles */}
        <WrapOptionsToggles options={options} onChange={updateOptions} />
      </div>
    </div>
  );
}

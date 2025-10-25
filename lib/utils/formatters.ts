/* eslint-disable @typescript-eslint/no-unused-vars */
import { js_beautify, css_beautify, html_beautify } from "js-beautify";
import { formatPythonCode } from "./pyodide";

export interface CodeFormatter {
  format(code: string, config?: FormatConfig): Promise<string> | string;
  minify?(code: string): string;
}

export interface FormatConfig {
  indent?: number | "tab";
  lineLength?: number;
  quotes?: "single" | "double";
}

const jsFormatter: CodeFormatter = {
  format(code, config = { indent: 2, lineLength: 80 }) {
    return js_beautify(code, {
      indent_size: config.indent === "tab" ? 1 : config.indent,
      indent_with_tabs: config.indent === "tab",
      max_preserve_newlines: 2,
      preserve_newlines: true,
      keep_array_indentation: true,
      break_chained_methods: false,
      wrap_line_length: config.lineLength,
      end_with_newline: true,
      indent_empty_lines: false,
      jslint_happy: false,
      space_after_anon_function: true,
      brace_style: "end-expand",
      unindent_chained_methods: false,
      space_in_empty_paren: false,
      space_in_paren: false,
      unescape_strings: false,
      e4x: false,
      comma_first: false,
      operator_position: "before-newline",
    });
  },

  minify(code) {
    return code
      .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, " ")
      .replace(/([{([:])\s+/g, "$1")
      .replace(/\s+([})\]])/g, "$1")
      .replace(/;\s+/g, ";")
      .replace(/,\s+/g, ",")
      .trim();
  },
};

const cssFormatter: CodeFormatter = {
  format(code, config = { indent: 2 }) {
    return css_beautify(code, {
      indent_size: config.indent === "tab" ? 1 : config.indent,
      indent_with_tabs: config.indent === "tab",
      end_with_newline: true,
      preserve_newlines: true,
      newline_between_rules: true,
      space_around_selector_separator: true,
      indent_empty_lines: false,
    });
  },

  minify(code) {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*([{}:;,])\s*/g, "$1")
      .replace(/;}/, "}")
      .trim();
  },
};

const htmlFormatter: CodeFormatter = {
  format(code, config = { indent: 2 }) {
    return html_beautify(code, {
      indent_size: config.indent === "tab" ? 1 : config.indent,
      indent_with_tabs: config.indent === "tab",
      max_preserve_newlines: 2,
      preserve_newlines: true,
      wrap_line_length: 0,
      end_with_newline: true,
      indent_empty_lines: false,
      extra_liners: ["head", "body", "/html"],
      inline: [],
      unformatted: ["code", "pre"],
      content_unformatted: ["pre", "textarea"],
      indent_scripts: "normal",
      wrap_attributes: "auto",
      wrap_attributes_indent_size: config.indent === "tab" ? 1 : config.indent,
      void_elements: [
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "keygen",
        "link",
        "menuitem",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
      ],
      unformatted_content_delimiter: "",
      indent_inner_html: true,
    });
  },
};

const jsonFormatter: CodeFormatter = {
  format(code, config = { indent: 2 }) {
    try {
      const parsed = JSON.parse(code);
      return JSON.stringify(
        parsed,
        null,
        config.indent === "tab" ? "\t" : config.indent
      );
    } catch (e) {
      throw new Error("Invalid JSON");
    }
  },

  minify(code) {
    try {
      return JSON.stringify(JSON.parse(code));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new Error("Invalid JSON");
    }
  },
};

const pythonFormatter: CodeFormatter = {
  async format(code) {
    return formatPythonCode(code);
  },
};

export const formatters: Record<string, CodeFormatter> = {
  javascript: jsFormatter,
  typescript: jsFormatter,
  css: cssFormatter,
  html: htmlFormatter,
  json: jsonFormatter,
  python: pythonFormatter,
};

import type { PyodideInterface } from "./types";

declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

let pyodide: PyodideInterface | null = null;

export async function initPyodide() {
  if (!pyodide) {
    if (typeof window === "undefined") {
      throw new Error("Pyodide can only be loaded in the browser");
    }

    // Load Pyodide script
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
    document.head.appendChild(script);

    // Wait for script to load
    await new Promise((resolve) => {
      script.onload = resolve;
    });

    pyodide = await window.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
    });

    // Install black formatter
    await pyodide.loadPackage("micropip");
    const micropip = (await pyodide.runPythonAsync(
      "import micropip; micropip"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    )) as any;
    await micropip.install("black");
  }
  return pyodide;
}

export async function formatPythonCode(code: string): Promise<string> {
  try {
    const py = await initPyodide();
    await py.runPythonAsync(`
      import black
      def format_code(source):
          try:
              return black.format_str(source, mode=black.FileMode())
          except Exception as e:
              return str(e)
    `);

    const result = await py.runPythonAsync(`format_code('''${code}''')`);
    return result as string;
  } catch (error) {
    throw new Error("Failed to format Python code: " + error);
  }
}

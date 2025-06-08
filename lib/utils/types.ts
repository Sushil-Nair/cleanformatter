export interface PyodideInterface {
  loadPackage(packageName: string): Promise<void>;
  runPythonAsync(code: string): Promise<unknown>;
  pyimport(name: string): any;
}
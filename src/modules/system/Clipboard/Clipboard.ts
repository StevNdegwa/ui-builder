export class Clipboard {
  static async copyText(text: string): Promise<void> {
    try {
      return await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  static async pasteText(): Promise<string> {
    try {
      return await navigator.clipboard.readText();
    } catch (err) {
      console.error("Failed to read: ", err);
      return "";
    }
  }
}

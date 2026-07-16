import fs from "fs";
import mammoth from "mammoth";

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export async function extractResumeText(
  filePath: string
): Promise<string> {
  if (filePath.endsWith(".txt")) {
    return fs.readFileSync(
      filePath,
      "utf8"
    );
  }

  if (filePath.endsWith(".docx")) {
    const result =
      await mammoth.extractRawText({
        path: filePath,
      });

    return result.value;
  }

  if (filePath.endsWith(".pdf")) {
    const data =
      new Uint8Array(
        fs.readFileSync(filePath)
      );

    const pdf =
      await pdfjsLib.getDocument({
        data,
      }).promise;

    let text = "";

    for (
      let i = 1;
      i <= pdf.numPages;
      i++
    ) {
      const page =
        await pdf.getPage(i);

      const content =
        await page.getTextContent();

      text +=
        content.items
          .map((item: any) => item.str)
          .join(" ") + "\n";
    }

    return text;
  }

  throw new Error(
    "Unsupported file type."
  );
}
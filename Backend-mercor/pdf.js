const pdfjs = require('pdfjs-dist');

const extractTextFromPDF = async (pdfData) => {
  const loadingTask = pdfjs.getDocument({ data: pdfData });
  const pdfDocument = await loadingTask.promise;
  const numPages = pdfDocument.numPages;
  const textContent = [];

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const pageText = await page.getTextContent();
    const pageContent = pageText.items.map((item) => item.str);
    textContent.push(pageContent.join(' '));
  }
  return textContent.join(' ');
};

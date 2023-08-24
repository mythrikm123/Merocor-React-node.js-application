import { PDFDocument } from 'pdf-lib';

export const createSamplePDF = async () => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([500, 500]);
  page.drawText('This is a sample PDF content.');
  return await pdfDoc.save();
};

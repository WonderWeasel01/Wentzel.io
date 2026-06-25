import type { ApplicationLanguage } from './application-prompt';

const CONTACT = {
  name: 'Alexander Wentzel',
  email: 'alex@wentzel.io',
  phone: '+45 52 39 12 48',
  website: 'https://wentzel.io',
  linkedin: 'https://www.linkedin.com/in/wentzel01',
};

export function buildApplicationPdfFilename(
  companyName: string,
  language: ApplicationLanguage
): string {
  const safe = companyName
    .trim()
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const fallback = language === 'da' ? 'Virksomhed' : 'Company';
  const prefix = language === 'da' ? 'Ansøgning' : 'Application';
  return `${prefix} - ${safe || fallback} - Alexander Wentzel.pdf`;
}

function formatDate(language: ApplicationLanguage): string {
  return new Date().toLocaleDateString(language === 'da' ? 'da-DK' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const PT_TO_MM = 0.352778;

export async function downloadApplicationPdf(options: {
  companyName: string;
  jobTitle?: string;
  finishedText: string;
  language: ApplicationLanguage;
}): Promise<void> {
  const { companyName, jobTitle, finishedText, language } = options;
  const filename = buildApplicationPdfFilename(companyName, language);
  const date = formatDate(language);
  const recipientLabel = language === 'da' ? 'Til' : 'To';
  const jobLabel = language === 'da' ? 'Vedr. stilling' : 'Re';
  const roleLabel = language === 'da' ? 'Full Stack Udvikler' : 'Full Stack Developer';

  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const ensureSpace = (lineHeight: number) => {
    if (y + lineHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const writeParagraph = (
    text: string,
    {
      fontSize,
      fontStyle = 'normal',
      color = [28, 25, 23],
      lineSpacing = 1.5,
      gapAfter = 0,
      align = 'left',
    }: {
      fontSize: number;
      fontStyle?: 'normal' | 'bold' | 'italic';
      color?: [number, number, number];
      lineSpacing?: number;
      gapAfter?: number;
      align?: 'left' | 'justify';
    }
  ) => {
    doc.setFont('times', fontStyle);
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);
    const lineHeight = fontSize * PT_TO_MM * lineSpacing;
    const lines = doc.splitTextToSize(text, contentWidth) as string[];
    for (const line of lines) {
      ensureSpace(lineHeight);
      doc.text(line, margin, y, align === 'justify' ? { maxWidth: contentWidth, align: 'justify' } : undefined);
      y += lineHeight;
    }
    y += gapAfter;
  };

  // Header
  writeParagraph(CONTACT.name, { fontSize: 18, fontStyle: 'bold', color: [28, 25, 23], lineSpacing: 1.2 });
  writeParagraph(roleLabel, { fontSize: 11, color: [87, 83, 78], lineSpacing: 1.3, gapAfter: 1 });
  writeParagraph(`${CONTACT.email}  ·  ${CONTACT.phone}`, {
    fontSize: 9.5,
    color: [120, 113, 108],
    lineSpacing: 1.4,
  });
  writeParagraph(`${CONTACT.website}  ·  ${CONTACT.linkedin}`, {
    fontSize: 9.5,
    color: [120, 113, 108],
    lineSpacing: 1.4,
    gapAfter: 4,
  });

  // Divider
  doc.setDrawColor(214, 211, 209);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Date
  writeParagraph(date, { fontSize: 9.5, color: [120, 113, 108], lineSpacing: 1.4, gapAfter: 6 });

  // Recipient block
  if (companyName.trim()) {
    writeParagraph(`${recipientLabel}: ${companyName.trim()}`, {
      fontSize: 11,
      color: [68, 68, 68],
      lineSpacing: 1.4,
    });
  }
  if (jobTitle?.trim()) {
    writeParagraph(`${jobLabel}: ${jobTitle.trim()}`, {
      fontSize: 11,
      color: [68, 68, 68],
      lineSpacing: 1.4,
    });
  }
  if (companyName.trim() || jobTitle?.trim()) {
    y += 6;
  }

  // Body — keep paragraph breaks intact
  const paragraphs = finishedText.trim().split(/\n\s*\n/);
  paragraphs.forEach((paragraph, index) => {
    const clean = paragraph.replace(/\n/g, ' ').trim();
    if (!clean) return;
    writeParagraph(clean, {
      fontSize: 11,
      color: [28, 25, 23],
      lineSpacing: 1.6,
      gapAfter: index < paragraphs.length - 1 ? 4 : 0,
    });
  });

  doc.save(filename);
}

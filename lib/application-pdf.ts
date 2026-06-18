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

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br />');
}

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

  const recipientBlock =
    companyName.trim() || jobTitle?.trim()
      ? `<div style="margin-bottom: 24px; color: #444;">
          ${companyName.trim() ? `<div><strong>${recipientLabel}:</strong> ${escapeHtml(companyName.trim())}</div>` : ''}
          ${jobTitle?.trim() ? `<div><strong>${jobLabel}:</strong> ${escapeHtml(jobTitle.trim())}</div>` : ''}
        </div>`
      : '';

  const html = `
    <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 11pt; line-height: 1.6; color: #1c1917; width: 170mm;">
      <div style="margin-bottom: 28px; border-bottom: 1px solid #d6d3d1; padding-bottom: 16px;">
        <div style="font-size: 16pt; font-weight: bold; margin-bottom: 4px;">${CONTACT.name}</div>
        <div style="font-size: 10pt; color: #57534e; margin-bottom: 8px;">${roleLabel}</div>
        <div style="font-size: 9pt; color: #78716c; line-height: 1.5;">
          ${CONTACT.email} · ${CONTACT.phone}<br />
          ${CONTACT.website} · ${CONTACT.linkedin}
        </div>
      </div>
      <div style="font-size: 9pt; color: #78716c; margin-bottom: 20px;">${date}</div>
      ${recipientBlock}
      <div style="text-align: justify;">${escapeHtml(finishedText.trim())}</div>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);

  try {
    const html2pdf = (await import('html2pdf.js')).default;
    await html2pdf()
      .set({
        margin: [20, 20, 20, 20],
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(container)
      .save();
  } finally {
    document.body.removeChild(container);
  }
}

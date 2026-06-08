/**
 * Markdown utilities for parsing and rendering blog content
 */

interface BlogFrontmatter {
  title: string;
  slug: string;
  date: string;
  author: string;
  description: string;
  image?: string;
  category: string;
  published: boolean;
}

interface BlogPost {
  frontmatter: BlogFrontmatter;
  content: string;
}

export async function parseBlogPost(markdown: string): Promise<BlogPost> {
  const lines = markdown.split('\n');

  let frontmatterEnd = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      frontmatterEnd = i;
      break;
    }
  }

  if (frontmatterEnd === -1) {
    throw new Error('Invalid markdown format - missing frontmatter');
  }

  const frontmatterLines = lines.slice(1, frontmatterEnd);
  const frontmatter = parseFrontmatter(frontmatterLines.join('\n'));
  const content = lines.slice(frontmatterEnd + 1).join('\n').trim();

  return { frontmatter, content };
}

function parseFrontmatter(yaml: string): BlogFrontmatter {
  const obj: any = {};

  const lines = yaml.split('\n').filter(line => line.trim());
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');

    if (key.trim() === 'published') {
      obj[key.trim()] = value === 'true';
    } else {
      obj[key.trim()] = value;
    }
  }

  return {
    title: obj.title || 'Untitled',
    slug: obj.slug || '',
    date: obj.date || new Date().toISOString().split('T')[0],
    author: obj.author || 'EasyH Team',
    description: obj.description || '',
    image: obj.image || '',
    category: obj.category || 'General',
    published: obj.published !== false,
  };
}

export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*?)$/gm, '<h3 style="font-size: 18px; font-weight: 600; color: var(--black); margin-top: 24px; margin-bottom: 16px;">$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2 style="font-size: 24px; font-weight: 700; color: var(--black); margin-top: 32px; margin-bottom: 20px;">$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1 style="font-size: 32px; font-weight: 700; color: var(--black); margin-bottom: 20px;">$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 600;">$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color: var(--black); font-weight: 500; text-decoration: underline;">$1</a>');

  // Paragraphs
  const paragraphs = html.split('\n\n').map(p => {
    p = p.trim();
    if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<ol') || p.startsWith('<blockquote')) {
      return p;
    }
    return p ? `<p style="font-size: 16px; color: var(--muted); line-height: 1.75; margin-bottom: 20px;">${p}</p>` : '';
  }).join('\n');

  // Blockquotes
  html = paragraphs.replace(/^&gt; (.*?)$/gm, '<blockquote style="border-left: 4px solid var(--border); padding-left: 20px; margin: 24px 0; font-style: italic; color: var(--dim);">$1</blockquote>');

  // Lists
  html = html.replace(/^\* (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*?<\/li>)/s, '<ul style="margin: 20px 0 20px 20px; font-size: 16px; color: var(--muted); line-height: 1.75;">$1</ul>');

  return html;
}

export function convertMarkdownToHtml(markdown) {
    let html = markdown
        // Convert headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Convert bold text
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        // Convert italic text
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        // Convert blockquotes
        .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
        // Convert unordered lists
        .replace(/^\s*\n\*/gm, '<ul>\n*')
        .replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2')
        .replace(/^\*(.+)/gm, '<li>$1</li>')
        // Convert ordered lists
        .replace(/^\s*\n\d\./gm, '<ol>\n1.')
        .replace(/^(\d\..+)\s*\n([^\d\.])/gm, '$1\n</ol>\n\n$2')
        .replace(/^\d\.(.+)/gm, '<li>$1</li>')
        // Convert horizontal rules
        .replace(/^---$/gm, '<hr>')
        // Convert links
        .replace(/\[([^\[]+)\]\(([^\)]+)\)/gim, '<a href="$2">$1</a>')
        // Convert images
        .replace(/\!\[([^\[]+)\]\(([^\)]+)\)/gim, '<img src="$2" alt="$1" />')
        // Convert inline code
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Convert code blocks
        .replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>')
        // Convert line breaks
        .replace(/\n$/gim, '<br>');

    return html.trim();
}

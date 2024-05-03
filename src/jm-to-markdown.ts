export function convertJiraMarkdownToRegularMarkdown(jiraMarkdown: string): string {
    // Replace Jira-specific headers with regular markdown headers
    let markdown = jiraMarkdown.replace(/^h(\d)?\. /gm, (match, level) => {
      level = level || '1';
      return '#'.repeat(parseInt(level)) + ' ';
    });
  
    // Replace Jira-specific bold text
    markdown = markdown.replace(/\*(\S[^*]*?\S?)\*/g, (match, text) => {
      return '**' + text + '**';
    });
  
    // Replace Jira-specific italics
    markdown = markdown.replace(/\_(\S[^_]*?\S?)\_/g, (match, text) => {
      return '*' + text + '*';
    });
  
    // Replace Jira-specific monospace
    markdown = markdown.replace(/{{([^}]+?)}}/g, (match, text) => {
      return '`' + text + '`';
    });
  
    // Replace Jira-specific links
    markdown = markdown.replace(/\[(.+?)\|(.+?)\]/g, (match, text, link) => {
      return '[' + text + '](' + link + ')';
    });

    // remove smart links 
    markdown = markdown.replace('|smart-link)', ')');
  
    // Replace Jira-specific quotes
    markdown = markdown.replace(/\{quote\}/g, '> ');
    markdown = markdown.replace(/\{quote\}/g, '');
  
    // Replace Jira-specific line breaks
    markdown = markdown.replace(/\\\\/, '  \n');
  
    // Replace Jira-specific color syntax
    markdown = markdown.replace(/\{color:(.+?)\}/g, (match, color) => {
      return '';
    });
  
    return markdown;
}
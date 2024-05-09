import {marked} from 'marked';

export function convertJiraMarkdownToRegularMarkdown(jiraMarkdown: string): string {
  // Replace Jira-specific headers with regular markdown headers
  return jiraMarkdown.replace(/^[ \t]*(\*+)\s+/gm, (match, stars) => {
    return `${Array(stars.length).join('  ')}* `;
  })
  // Ordered lists
  .replace(/^[ \t]*(#+)\s+/gm, (match, nums) => {
    console.log('match');
    console.log(match);
    return `${Array(nums.length).join('   ')}1. `;
  })
  // Headers 1-6
  .replace(/^h([0-6])\.(.*)$/gm, (match, level, content) => {
    return Array(parseInt(level, 10) + 1).join('#') + content;
  })
  // Replace Jira-specific bold text
  .replace(/\*(\S[^*]*?\S?)\*/g, (match, text) => {
    return '**' + text + '**';
  })
  
  // Replace Jira-specific italics
  .replace(/\_(\S[^_]*?\S?)\_/g, (match, text) => {
      return '*' + text + '*';
  })
  
  // Replace Jira-specific monospace
  .replace(/{{([^}]+?)}}/g, (match, text) => {
    return '`' + text + '`';
  })
  
  // Replace Jira-specific links
  .replace(/\[(.+?)\|(.+?)\]/g, (match, text, link) => {
    return '[' + text + '](' + link + ')';
  })

  // remove smart links 
  .replace('|smart-link', '')
  
  // Replace Jira-specific quotes
  .replace(/\{quote\}/g, '> ')
  .replace(/\{quote\}/g, '')
  
  .replace(/\\\\/, '  \n')
  
  // Replace Jira-specific color syntax
  .replace(/\{color:(.+?)\}/g, (match, color) => {
    return '';
  })
  // Code Block
  .replace(
    /\{code(:([a-z]+))?([:|]?(title|borderStyle|borderColor|borderWidth|bgColor|titleBGColor)=.+?)*\}([^]*?)\n?\{code\}/gm,
    '```$2$5\n```'
  )
  .replace('{noformat}', '```')
}

export async function convertJiraMarkdownToHtml(jiraMarkdown: string): Promise<string> {
  const markdown = convertJiraMarkdownToRegularMarkdown(jiraMarkdown);
  return await marked(markdown);
}
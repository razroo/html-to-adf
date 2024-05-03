export function convertJiraMarkdownToRegularMarkdown(jiraMarkdown: string): string {
    // Replace headings
    jiraMarkdown = jiraMarkdown.replace(/^h(\d+)\.(.*)$/gm, (match, level, content) => {
      return "#".repeat(parseInt(level)) + " " + content.trim();
    });
  
    // Replace bold text
    jiraMarkdown = jiraMarkdown.replace(/\*(.*?)\*/g, "**$1**");
  
    // Replace italic text
    jiraMarkdown = jiraMarkdown.replace(/_(.*?)_/g, "_$1_");
  
    // Replace strikethrough
    jiraMarkdown = jiraMarkdown.replace(/~~(.*?)~~/g, "~~$1~~");
  
    // Replace monospaced text
    jiraMarkdown = jiraMarkdown.replace(/`(.*?)`/g, "`$1`");
  
    // Replace unordered lists
    jiraMarkdown = jiraMarkdown.replace(/^\s+\* (.*)$/gm, "- $1");
  
    // Replace ordered lists (basic handling)
    jiraMarkdown = jiraMarkdown.replace(/^\s+\d+\. (.*)$/gm, "- $1");
  
    // Replace links (basic handling)
    jiraMarkdown = jiraMarkdown.replace(/\[(.*?)\]\((.*?)\)/g, "[$1]($2)");
  
    // You can add more conversion rules here for other Jira markdown features
  
    return jiraMarkdown;
  }
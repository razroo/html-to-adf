interface TextNode {
    type: string;
    text: string;
    marks?: Mark[];
  }
  
  interface Mark {
    type: string;
  }
  
  // Function to handle escaping of special characters in text
  const escapeHtml = (text: string): string => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
    };
    return text.replace(/[&<>"']/g, (char) => map[char]);
  };
  
  const processNode = (node: any): string => {
    let html = "";
  
    if (node.type === "text") {
      html += escapeHtml(node.text);
    } else if (node.type === "hardBreak") {
      html += "<br>";
    } else if (node.type === "paragraph") {
      html += `<p>${processNodes(node.content)}</p>`;
    } else if (node.type === "codeBlock") {
      if (node.attrs && node.attrs.language) {
        html += `<pre class="remark-highlight" data-language="${node.attrs.language}">`;
      } else {
        html += "<code>";
      }
      html += processNodes(node.content);
      html += node.attrs && node.attrs.language ? `</pre>` : "</code>";
    } else if (node.type === "heading") {
      html += `<h${node.attrs.level}>${processNodes(node.content)}</h${node.attrs.level}>`;
    } else if (node.type === "bulletList" || node.type === "orderedList") {
      const listType = node.type === "bulletList" ? "ul" : "ol";
      html += `<${listType}>`;
      html += node.content.map(processNode).join("");
      html += `</${listType}>`;
    } else if (node.type === "listItem") {
      html += "<li>" + processNodes(node.content[0]) + "</li>";
    } else if (node.type === "blockquote") {
      html += "<blockquote>" + processNodes(node.content[0]) + "</blockquote>";
    } else if (node.type === "link") {
      html += `<a href="${node.attrs.href}" title="${node.attrs.title}">`;
      html += processNodes(node.content);
      html += "</a>";
    } else if (node.marks) {  // Handle nodes with marks
      const innerHtml = processNodes(node.content);
      html += innerHtml;
    }
  
    return html;
  };
  
  const processNodes = (nodes: TextNode[]): string => {
    return nodes.map(processNode).join("");
  };
  
  export function convertADFToHtml(adf: { type: string; content: any[]; version?: number }): string {
    if (!adf || !adf.content) {
      return "";
    }
    return processNodes(adf.content);
  }
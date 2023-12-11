import { TextNode } from "./interfaces/text-node";

const processNode = (node, marks = [])=> {
    let textNode: TextNode = {
      type: "text",
      text: node.textContent,
      marks: marks,
    };
  
    if (node.nodeName === "CODE") {
      textNode.marks.push({ type: "code" });
    } else {
      if (node.nodeName === "STRONG") {
        textNode.marks.push({ type: "strong" });
      }
      if (node.nodeName === "DEL") {
        textNode.marks.push({ type: "strike" });
      }
      if (node.nodeName === "EM") {
        textNode.marks.push({ type: "em" });
      }
      if (node.nodeName === "U") {
        textNode.marks.push({ type: "underline" });
      }
      if (node.nodeName === "A") {
        textNode.marks.push({
          type: "link",
          attrs: {
            href: node.getAttribute("href"),
            title: node.textContent,
          },
        });
      }
      if (node.nodeName === "BR") {
        textNode = { type: "text", text: "  ", marks: [] };
      }
      if (node.childNodes.length > 0) {
        Array.from(node.childNodes)
          .map((childNode) => processNode(childNode, textNode.marks))
          .flat();
      }
    }
  
    return textNode;
};
  
const convertToADF = (htmlString) =>{
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const adf = {
      version: 1,
      type: "doc",
      content: [],
    };
  
    doc.body.childNodes.forEach((node) => {
      const textNodes = Array.from(node.childNodes).map((childNode) =>
        processNode(childNode, []),
      );
  
      if (node.nodeName === "P") {
        adf.content.push({
          type: "paragraph",
          content: textNodes.filter(Boolean),
        });
      } else if (node.nodeName.startsWith("H")) {
        const level = parseInt(node.nodeName.substring(1));
        adf.content.push({
          type: "heading",
          attrs: {
            level: level,
          },
          content: textNodes.filter(Boolean),
        });
      } else if (node.nodeName === "UL") {
        const items = Array.from(node.getElementsByTagName("LI")).map((li) => {
          const liTextNodes = Array.from(li.childNodes).map((liChildNode) =>
            processNode(liChildNode, []),
          );
          return {
            type: "listItem",
            content: [
              { type: "paragraph", content: liTextNodes.filter(Boolean) },
            ],
          };
        });
        adf.content.push({
          type: "bulletList",
          content: items,
        });
      } else if (node.nodeName === "OL") {
        const items = Array.from(node.getElementsByTagName("LI")).map((li) => {
          const liTextNodes = Array.from(li.childNodes).map((liChildNode) =>
            processNode(liChildNode, []),
          );
          return {
            type: "listItem",
            content: [
              { type: "paragraph", content: liTextNodes.filter(Boolean) },
            ],
          };
        });
        adf.content.push({
          type: "orderedList",
          content: items,
        });
      } else if (node.nodeName === "BLOCKQUOTE") {
        const blockquoteTextNodes = Array.from(node.childNodes).map(
          (blockquoteChildNode) => processNode(blockquoteChildNode, []),
        );
        adf.content.push({
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              content: blockquoteTextNodes.filter(Boolean),
            },
          ],
          // content: blockquoteTextNodes.filter(Boolean),
        });
      }
    });
    return adf;
};

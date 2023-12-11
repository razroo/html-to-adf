import { TextNode } from "./interfaces/text-node";
import parse from 'html-dom-parser';

const processNode = (node, marks = [] as any) => {
  let textNodes: TextNode[] = [];

  if (node.type === 'text') {
    textNodes.push({
      type: "text",
      text: node.data,
      marks: marks,
    });
  }

  if (node.type === 'tag') {
    if (node.name === "b") {
      marks.push({ type: "strong" });
    } else if (node.name === "del") {
      marks.push({ type: "strike" });
    } else if (node.name === "em") {
      marks.push({ type: "em" });
    } else if (node.name === "u") {
      marks.push({ type: "underline" });
    } else if (node.name === "a") {
      marks.push({
        type: "link",
        attrs: {
          href: node.attributes.href,
          title: node.text || node.textContent,
        },
      });
    } else if (node.name === "br") {
      textNodes.push({ type: "text", text: "  ", marks: [] });
    }
  }

  const children = node.children || [];

  if (children.length > 0) {
    children.forEach((childNode) => {
      const childTextNodes = processNode(childNode, marks.slice());
      textNodes = textNodes.concat(childTextNodes);
    });
  }

  return textNodes;
};

const convertToADF = (htmlString: string) => {
  const nodes = parse(htmlString);

  const adf = {
    version: 1,
    type: "doc",
    content: [],
  } as any;

  nodes.forEach((node: any) => {
    const textNodes = processNode(node, []);
    if (node.type === 'tag') {
      if (node.name === "p") {
        adf.content.push({
          type: "paragraph",
          content: textNodes,
        });
      } else if (node.name.startsWith("h")) {
        const level = parseInt(node.name.substring(1));
        adf.content.push({
          type: "heading",
          attrs: {
            level: level,
          },
          content: textNodes,
        });
      } else if (node.name === "ul" || node.name === "ol") {
        const listType = node.name === "ul" ? "bulletList" : "orderedList";
        const items = (node.children || []).map((li: any) => {
          const liTextNodes = processNode(li, []);
          return {
            type: "listItem",
            content: [{ type: "paragraph", content: liTextNodes }],
          };
        });
        adf.content.push({
          type: listType,
          content: items,
        });
      } else if (node.name === "blockquote") {
        const blockquoteTextNodes = (node.children || []).map((blockquoteChildNode: any) =>
          processNode(blockquoteChildNode, [])
        );
        adf.content.push({
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              content: blockquoteTextNodes,
            },
          ],
        });
      }
    }
  });

  return adf;
};
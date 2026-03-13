import { Node, mergeAttributes } from "@tiptap/core";

/**
 * Callout — a block-level alert/regulatory notice.
 * Stored in the JSON as: { type: "callout", attrs: { variant: "warning" | "critical" }, content: [...] }
 * Rendered by ContentRenderer with a coloured left border.
 */
export const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "block+",
  defining: true,

  addAttributes() {
    return {
      variant: {
        default: "warning",
        parseHTML: (el) => el.getAttribute("data-variant") ?? "warning",
        renderHTML: (attrs) => ({ "data-variant": attrs.variant }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-callout]" }];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-callout": "",
        "data-variant": node.attrs.variant,
      }),
      0,
    ];
  },
});

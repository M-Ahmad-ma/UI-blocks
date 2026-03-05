export interface Category {
  name: string;
  components: string[];
}

export const categories: Category[] = [
  {
    name: "Forms",
    components: [
      "input",
      "textarea",
      "select",
      "checkbox",
      "radiogroup",
      "slider",
      "field",
      "label",
    ],
  },
  {
    name: "Overlays",
    components: [
      "dialog",
      "drawer",
      "sheet",
      "alertdialog",
      "tooltip",
      "hovercard",
    ],
  },
  {
    name: "Navigation",
    components: ["breadcrumb", "tabs"],
  },
  {
    name: "Data Display",
    components: [
      "badge",
      "card",
      "skeleton",
      "separator",
      "aspectratio",
    ],
  },
  {
    name: "Feedback",
    components: ["alert", "toast", "spinner", "empty"],
  },
  {
    name: "Actions",
    components: ["button", "buttongroup", "dropdown", "command"],
  },
];

export const componentCategories: Record<string, string> = {};
categories.forEach((cat) => {
  cat.components.forEach((comp) => {
    componentCategories[comp] = cat.name;
  });
});

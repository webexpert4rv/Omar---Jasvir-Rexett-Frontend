export const accordionContent = {
  model: {
    defaults: {
      script: function () {
        const headers = this.querySelectorAll(".accordion-header");
        headers.forEach((header) => {
          header.addEventListener("click", function () {
            const content = this.nextElementSibling;
            content.style.display =
              content.style.display === "block" ? "none" : "block";
          });
        });
      },
      tagName: "div",
      attributes: { class: "accordion" },
      components: [
        {
          tagName: "div",
          attributes: { class: "accordion-item" },
          components: [
            {
              tagName: "div",
              attributes: { class: "accordion-header" },
              content: "Section 1",
            },
            {
              tagName: "div",
              attributes: { class: "accordion-content" },
              content: "Content 1",
              style: { display: "none" },
            },
          ],
        },
        {
          tagName: "div",
          attributes: { class: "accordion-item" },
          components: [
            {
              tagName: "div",
              attributes: { class: "accordion-header" },
              content: "Section 2",
            },
            {
              tagName: "div",
              attributes: { class: "accordion-content" },
              content: "Content 2",
              style: { display: "none" },
            },
          ],
        },
      ],
    },
  },
};

export const headerContent = {
  model: {
    defaults: {
      tagName: "header",
      draggable: true,
      droppable: true,
      components: [
        {
          tagName: "div",
          attributes: { class: "header-logo" },
          components: [
            {
              // Use the built-in image component
              type: "image",
              attributes: {
                src: "https://via.placeholder.com/100",
                alt: "Logo",
              },
            },
          ],
        },
        {
          tagName: "nav",
          components: [
            {
              tagName: "ul",
              components: [
                {
                  tagName: "li",
                  components: [
                    {
                      tagName: "a",
                      attributes: { href: "#home" },
                      content: "Home",
                      traits: [
                        {
                          type: "text",
                          label: "URL",
                          name: "href",
                        },
                        {
                          type: "text",
                          label: "Text",
                          name: "content",
                        },
                        {
                          type: "select",
                          label: "Target",
                          name: "target",
                          options: [
                            { value: "_self", name: "Same Window" },
                            { value: "_blank", name: "New Window" },
                            { value: "_parent", name: "Parent Frame" },
                            { value: "_top", name: "Full Window" },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  tagName: "li",
                  components: [
                    {
                      tagName: "a",
                      attributes: { href: "#about" },
                      content: "About",
                      traits: [
                        {
                          type: "text",
                          label: "URL",
                          name: "href",
                        },
                        {
                          type: "text",
                          label: "Text",
                          name: "content",
                        },
                        {
                          type: "select",
                          label: "Target",
                          name: "target",
                          options: [
                            { value: "_self", name: "Same Window" },
                            { value: "_blank", name: "New Window" },
                            { value: "_parent", name: "Parent Frame" },
                            { value: "_top", name: "Full Window" },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  tagName: "li",
                  components: [
                    {
                      tagName: "a",
                      attributes: { href: "#services" },
                      content: "Services",
                      traits: [
                        {
                          type: "text",
                          label: "URL",
                          name: "href",
                        },
                        {
                          type: "text",
                          label: "Text",
                          name: "content",
                        },
                        {
                          type: "select",
                          label: "Target",
                          name: "target",
                          options: [
                            { value: "_self", name: "Same Window" },
                            { value: "_blank", name: "New Window" },
                            { value: "_parent", name: "Parent Frame" },
                            { value: "_top", name: "Full Window" },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  tagName: "li",
                  components: [
                    {
                      tagName: "a",
                      attributes: { href: "#contact" },
                      content: "Contact",
                      traits: [
                        {
                          type: "text",
                          label: "URL",
                          name: "href",
                        },
                        {
                          type: "text",
                          label: "Text",
                          name: "content",
                        },
                        {
                          type: "select",
                          label: "Target",
                          name: "target",
                          options: [
                            { value: "_self", name: "Same Window" },
                            { value: "_blank", name: "New Window" },
                            { value: "_parent", name: "Parent Frame" },
                            { value: "_top", name: "Full Window" },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      attributes: { class: "header-builder" },
      styles: `
            .header-builder {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 10px 20px;
              color: #fff;
            }
            .header-builder .header-logo img {
              max-width: 80px;
              height: auto;
            }
            .header-builder nav ul {
              list-style: none;
              display: flex;
              margin: 0;
              padding: 0;
            }
            .header-builder nav ul li {
              margin: 0 10px;
            }
            .header-builder nav ul li a {
              color: #000;
              text-decoration: none;
            }
            @media (max-width: 768px) {
              .header-builder nav ul {
                flex-direction: column;
                display: none;
              }
              .header-builder nav ul.active {
                display: flex;
              }
            }
          `,
    },
  },
};

const featuredDev = "https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg"

export const sliderContent = {
  model: {
    defaults: {
      tagName: "div",
      draggable: true,
      droppable: true,
      attributes: { class: "slider" },
      components: [
        {
          tagName: "div",
          attributes: { class: "slider-track" },
          components: [
            {
              tagName: "div",
              attributes: { class: "card" },
              components: [
                {
                  type: "image",
                  attributes: { src: featuredDev, alt: "Image" },
                },
                { tagName: "h4", content: "Name 1" },
                { tagName: "p", content: "Description 1" },
                { tagName: "p", content: "Location 1" },
                {
                  tagName: "div",
                  components: [
                    {
                      tagName: "a",
                      attributes: { href: "#link1" },
                      content: "Link 1",
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
                    {
                      tagName: "a",
                      attributes: { href: "#link2" },
                      content: "Link 2",
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
            {
              tagName: "div",
              attributes: { class: "card" },
              components: [
                {
                  type: "image",
                  attributes: { src: featuredDev, alt: "Image 2" },
                },
                { tagName: "h4", content: "Name 2" },
                { tagName: "p", content: "Description 2" },
                { tagName: "p", content: "Location 2" },
                {
                  tagName: "div",
                  components: [
                    {
                      tagName: "a",
                      attributes: { href: "#link1" },
                      content: "Link 1",
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
                    {
                      tagName: "a",
                      attributes: { href: "#link2" },
                      content: "Link 2",
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
            // Add more cards as needed
          ],
        },
      ],
      styles: `
                    .slider {
                        overflow: hidden;
                        position: relative;
                        width: 100%;
                    }
                    .slider-track {
                        display: flex;
                        transition: transform 0.5s ease;
                    }
                    .card {
                        flex: 0 0 auto;
                        width: 300px;
                        margin: 10px;
                        border: 1px solid #ccc;
                        padding: 20px;
                        text-align: center;
                    }
                    .card img {
                        max-width: 100%;
                        height: auto;
                    }
                `,
      script: `
                    // Add slider functionality
                    let index = 0;
                    const track = document.querySelector('.slider-track');
                    const nextSlide = () => {
                        index = (index + 1) % track.children.length;
                        track.style.transform = \`translateX(-\${index * 100}%)\`;
                    };
                `,
    },
  },
};

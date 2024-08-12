import "grapesjs/dist/css/grapes.min.css";
import websitePlugin from "grapesjs-preset-webpage";
import basicBlockPlugin from "grapesjs-blocks-basic";
import formPlugin from "grapesjs-plugin-forms";
import { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import featuredDev from "../../assets/img/demo-img.jpg";
import { useParams } from "react-router-dom";
import webSiteBuilderInstance from "../../services/webSiteBuilderInstance";
import { toast } from "react-toastify";
import ScreenLoader from "../../components/atomic/ScreenLoader";

export const WebsiteBuilder = () => {
  const { pageId } = useParams();
  const editorRef = useRef(null);
  const editorInstance = useRef(null);
  const [screenLoader, setScreenLoader] = useState(true);
  useEffect(() => {
    const editor = grapesjs.init({
      container: editorRef.current,
      height: "100vh",
      width: "100%",
      plugins: [websitePlugin, basicBlockPlugin, formPlugin],
      storageManager: {
        type: null, // Disable local storage
      },
      // assetManager: {
      //   upload: false,
      //   uploadFile: (e) => {
      //     const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
      //     const formData = new FormData();
      //     for (let i = 0; i < files.length; i++) {
      //       formData.append('files', files[i]);
      //     }
      //     console.log("uploaded");
      //     // axios.post('http://localhost:8090/api/upload', formData)
      //     //   .then(response => {
      //     //     const { data } = response;
      //     //     // Assuming the response contains an array of uploaded image URLs
      //     //     const images = data.map(url => ({ src: url }));
      //     //     editor.AssetManager.add(images);
      //     //   })
      //     //   .catch(error => {
      //     //     console.error('Error uploading image:', error);
      //     //   });
      //   },
      //   uploadText: 'Drop files here or click to upload',
      // },
      styleManager: {
        sectors: [
          {
            name: "General",
            open: false,
            buildProps: [
              "float",
              "display",
              "justify-content",
              "align-items",
              "flex-direction",
              "position",
              "top",
              "right",
              "left",
              "bottom",
            ],
          },
          {
            name: "Dimension",
            open: false,
            buildProps: [
              "width",
              "height",
              "max-width",
              "min-height",
              "margin",
              "padding",
            ],
          },
          {
            name: "Typography",
            open: false,
            buildProps: [
              "font-family",
              "font-size",
              "font-weight",
              "letter-spacing",
              "color",
              "line-height",
              "text-shadow",
              "text-align",
            ],
            properties: [
              {
                name: "Font Family",
                property: "font-family",
                type: "select",
                defaults: "Arial, Helvetica, sans-serif",
                options: [
                  { value: "Arial, Helvetica, sans-serif", name: "Arial" },
                  { value: "Georgia, serif", name: "Georgia" },
                  { value: "Impact, Charcoal, sans-serif", name: "Impact" },
                  { value: "Tahoma, Geneva, sans-serif", name: "Tahoma" },
                  {
                    value: "'Times New Roman', Times, serif",
                    name: "Times New Roman",
                  },
                  { value: "Verdana, Geneva, sans-serif", name: "Verdana" },
                  { value: "'Poppins', sans-serif", name: "Poppins" },
                ],
              },
            ],
          },
          {
            name: "Decorations",
            open: false,
            buildProps: [
              "opacity",
              "border-radius",
              "border",
              "box-shadow",
              "background",
            ],
          },
          {
            name: "Extra",
            open: false,
            buildProps: [
              "transition",
              "perspective",
              "transform",
              "object-fit",
            ],
            properties: [
              {
                type: "integer",
                name: "Duration",
                property: "transition-duration",
                units: ["s", "ms"],
                defaults: "0s",
                min: 0,
              },
            ],
          },
          {
            name: "Background Overlay",
            open: true,
            buildProps: ["background-color", "background-opacity"],
            properties: [
              {
                name: "Background Color",
                property: "background-color",
                type: "color",
                defaults: "rgba(0,0,0,0)",
                fixedValues: [
                  "rgba(0,0,0,0)",
                  "rgba(0,0,0,0.1)",
                  "rgba(0,0,0,0.2)",
                  "rgba(0,0,0,0.3)",
                  "rgba(0,0,0,0.4)",
                  "rgba(0,0,0,0.5)",
                  "rgba(0,0,0,0.6)",
                  "rgba(0,0,0,0.7)",
                  "rgba(0,0,0,0.8)",
                  "rgba(0,0,0,0.9)",
                  "rgba(0,0,0,1)",
                ],
              },
              {
                name: "Background Opacity",
                property: "background-opacity",
                type: "slider",
                defaults: 1,
                step: 0.1,
                max: 1,
                min: 0,
              },
            ],
          },
        ],
      },
      canvas: {
        styles: ["https://unpkg.com/grapesjs/dist/css/grapes.min.css"],
      },
      pageManager: {
        pages: [
          {
            id: "page-id",
            styles: `.my-class { color: red }`, // or a JSON of styles
            component: '<div class="my-class">My element</div>', // or a JSON of components
          },
        ],
      },
    });

    // Add custom header component
    editor.DomComponents.addType("header", {
      model: {
        defaults: {
          tagName: "header",
          draggable: true,
          droppable: true,
          components: [
            {
              ttagName: "div",
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
    });

    // Add custom block for header
    editor.BlockManager.add("header", {
      label: "Header",
      content: {
        type: "header",
      },
      category: "Custom",
    });

    editor.DomComponents.addType("accordion", {
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
    });

    // Add custom block for accordion
    editor.BlockManager.add("accordion", {
      label: "Accordion",
      content: {
        type: "accordion",
      },
      category: "Custom",
    });
    // Add custom footer component
    editor.DomComponents.addType("footer", {
      model: {
        defaults: {
          tagName: "footer",
          draggable: true,
          droppable: true,
          components: [
            {
              tagName: "div",
              attributes: { class: "footer-column" },
              components: [
                {
                  tagName: "h4",
                  content: "About Us",
                },
                {
                  tagName: "p",
                  content: "Description about the company.",
                },
              ],
            },
            {
              tagName: "div",
              attributes: { class: "footer-column" },
              components: [
                {
                  tagName: "h4",
                  content: "Quick Links",
                },
                {
                  tagName: "ul",
                  components: [
                    {
                      tagName: "li",
                      components: [{ type: "text", content: "Home" }],
                    },
                    {
                      tagName: "li",
                      components: [{ type: "text", content: "About" }],
                    },
                    {
                      tagName: "li",
                      components: [{ type: "text", content: "Services" }],
                    },
                    {
                      tagName: "li",
                      components: [{ type: "text", content: "Contact" }],
                    },
                  ],
                },
              ],
            },
            {
              tagName: "div",
              attributes: { class: "footer-column" },
              components: [
                {
                  tagName: "h4",
                  content: "Contact Info",
                },
                {
                  tagName: "p",
                  content: "Phone: 123-456-7890",
                },
                {
                  tagName: "p",
                  content: "Email: info@company.com",
                },
              ],
            },
          ],
          attributes: { class: "footer" },
          styles: `
                        .footer {
                            display: flex;
                            justify-content: space-between;
                            padding: 20px;
                            background-color: #333;
                            color: #fff;
                        }
                        .footer-column {
                            flex: 1;
                            margin: 0 10px;
                        }
                        .footer-column h4 {
                            margin-bottom: 10px;
                        }
                        .footer-column ul {
                            list-style: none;
                            padding: 0;
                        }
                        .footer-column ul li {
                            margin-bottom: 5px;
                        }
                        @media (max-width: 768px) {
                            .footer {
                                flex-direction: column;
                                align-items: center;
                            }
                            .footer-column {
                                margin: 10px 0;
                                text-align: center;
                            }
                        }
                    `,
        },
      },
    });

    // Add custom block for footer
    editor.BlockManager.add("footer", {
      label: "Footer",
      content: {
        type: "footer",
      },
      category: "Custom",
    });
    // Add custom slider component
    editor.DomComponents.addType("slider", {
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
    });

    // Add custom block for slider
    editor.BlockManager.add("slider", {
      label: "Slider",
      content: {
        type: "slider",
      },
      category: "Custom",
    });

    editorInstance.current = editor;

    const loadPageContent = async () => {
      setScreenLoader(true);
      webSiteBuilderInstance
        .get(`/api/pages/${pageId}/content`)
        .then((response) => {
          if (response?.data?.data && Object.keys(response.data.data).length) {
            const {
              "mycustom-html": html,
              "mycustom-components": components,
              "mycustom-assets": assets,
              "mycustom-css": css,
              "mycustom-styles": styles,
            } = response?.data?.data;
            if (editorInstance.current) {
              editorInstance.current.setComponents(JSON.parse(components));
              editorInstance.current.Css.add(css);
              editorInstance.current.setStyle(JSON.parse(styles));
              //   editorInstance.current.setComponents(html);
              editorInstance.current.AssetManager.add(JSON.parse(assets));
            }
          }
          setScreenLoader(false);
        })
        .catch((err) => {
          const message =
            err?.response?.data?.message || "Something went wrong";
          toast.error(message, { position: "top-center" });
          setScreenLoader(false);
        });
    };

    loadPageContent();
  }, []);

  const handleSave = async () => {
    setScreenLoader(true);
    const editor = editorInstance.current;
    if (editor) {
      const html = editor.getHtml();
      const css = editor.getCss();
      const components = JSON.stringify(editor.getComponents());
      const styles = JSON.stringify(editor.getStyle());
      const assets = JSON.stringify(
        editor.AssetManager.getAll().map((asset) => asset.attributes)
      );
      webSiteBuilderInstance
        .post(`/api/pages/${pageId}/content`, {
          "mycustom-html": html,
          "mycustom-css": css,
          "mycustom-components": components,
          "mycustom-styles": styles,
          "mycustom-assets": assets,
        })
        .then((response) => {
          const message = "Page saved successfully!";
          toast.success(message, { position: "top-center" });
          setScreenLoader(false);
        })
        .catch((err) => {
          const message =
            err?.response?.data?.message || "Something went wrong";
          toast.error(message, { position: "top-center" });
          setScreenLoader(false);
        });
    }
  };

  return (
    <>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
      <div ref={editorRef}></div>
      {screenLoader && <ScreenLoader />}
    </>
  );
};

export default WebsiteBuilder;

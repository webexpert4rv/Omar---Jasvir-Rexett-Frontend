import "grapesjs/dist/css/grapes.min.css";
import websitePlugin from "grapesjs-preset-webpage";
import basicBlockPlugin from "grapesjs-blocks-basic";
import formPlugin from "grapesjs-plugin-forms";
import { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
// import featuredDev from "../../assets/img/demo-img.jpg";
import { useNavigate, useParams } from "react-router-dom";
import webSiteBuilderInstance from "../../services/webSiteBuilderInstance";
import { toast } from "react-toastify";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { Button } from "react-bootstrap";
import { WEBSITE_BUILDER_JOB_LISTING_URL } from "../../services/urlConfig";
import {
  JOB_LISTING_STYLE,
  jobFilter,
  jobListingContent,
  singleJobContent,
} from "./Config/Style";
import { sliderContent } from "./Config/SliderComponent";
import { headerContent } from "./Config/HeaderContet";
import { accordionContent } from "./Config/AccordionContent";
import { JOB_LIST } from "./Constant/Constant";

const featuredDev =
  "https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg";

export const WebsiteBuilder = () => {
  const { pageId } = useParams();
  const editorRef = useRef(null);
  const editorInstance = useRef(null);
  const [screenLoader, setScreenLoader] = useState(true);
  const navigate = useNavigate();
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
    });

    // Add custom header component
    editor.DomComponents.addType("header", headerContent);

    // Add custom block for header
    editor.BlockManager.add("header", {
      label: "Header",
      content: {
        type: "header",
      },
      category: "Custom",
    });

    editor.DomComponents.addType("accordion", accordionContent);

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
    editor.DomComponents.addType("slider", sliderContent);

    // Add custom block for slider
    editor.BlockManager.add("slider", {
      label: "Slider",
      content: {
        type: "slider",
      },
      category: "Custom",
    });

    editor.BlockManager.add("job-list-block", {
      label: "Job List",
      content: { type: "job-list" },
      category: "Custom",
    });

    // editor.DomComponents.addType("job-list", {
    //   model: {
    //     defaults: {
    //       tagName: "div",
    //       draggable: true,
    //       droppable: false,
    //       attributes: { class: "job-list" },
    //       jobsList: [], // This will store the job data
    //       url: WEBSITE_BUILDER_JOB_LISTING_URL,
    //       editable: false, // Attempt to prevent content editing
    //       removable: false,
    //     },
    //     init() {
    //       console.log(
    //         "Local hook: model.init",
    //         this.attributes.jobsList,
    //         this.attributes.url
    //       );
    //       fetch(this.attributes.url)
    //         .then((response) => response.json())
    //         .then((data) => {
    //           this.set("jobsList", data.data.jobs);
    //         })
    //         .catch((error) => {
    //           console.error("Failed to fetch jobs:", error);
    //         });

    //       this.listenTo(this, "change:jobsList", this.handlePropChange);
    //       this.on("component:update", this.preventContentChange);
    //     },
    //     updated(property, value, prevValue) {
    //       console.log(
    //         "Local hook: model.updated",
    //         "property",
    //         property,
    //         "value",
    //         value,
    //         "prevValue",
    //         prevValue
    //       );
    //     },
    //     removed() {
    //       console.log("Local hook: model.removed");
    //     },
    //     handlePropChange() {
    //       let jobs = this.get("jobsList");
    //       let htmlContent = "";

    //       jobs.forEach((job) => {
    //         let skillsHtml = "";
    //         if (job.job_skills && job.job_skills.length > 0) {
    //           skillsHtml =
    //             "<ul data-gjs-editable='false' data-gjs-removable='false' >";
    //           job.job_skills.forEach((skill) => {
    //             skillsHtml += `<li data-gjs-editable='false' data-gjs-removable='false'>${skill.skill_name} (${skill.weight})</li>`;
    //           });
    //           skillsHtml += "</ul>";
    //         }

    //         htmlContent += `
    //           <div class="job-item" data-gjs-editable="false" data-gjs-removable="false">
    //             <h3 data-gjs-editable="false" data-gjs-removable="false">${job.title}</h3>
    //             <p data-gjs-editable="false" data-gjs-removable="false">${job.description}</p>
    //             <p data-gjs-editable="false" data-gjs-removable="false"><strong data-gjs-editable="false" data-gjs-removable="false">Location:</strong> ${job.job_location}</p>
    //             <p data-gjs-editable="false" data-gjs-removable="false"><strong data-gjs-editable="false" data-gjs-removable="false">Skills Required:</strong> ${skillsHtml}</p>
    //             <button data-gjs-removable="false" class="apply-job-btn" data-job-id="${job.id}">Apply</button>
    //             </div>
    //         `;
    //       });

    //       const component = editor.addComponents(htmlContent);
    //       return component;
    //     },
    //     preventContentChange() {
    //       // This function can be used to revert changes or prevent modifications
    //       const el = this.view.el;
    //       const originalHtml = el.innerHTML;

    //       // Revert content changes
    //       el.innerHTML = originalHtml;

    //       // Optionally, you can display a message or log a warning
    //       console.log("Content changes are not allowed for this component.");
    //     },
    //   },
    // });

    editor.DomComponents.addType("job-list", {
      model: {
        defaults: {
          tagName: "div",
          draggable: true,
          droppable: false,
          attributes: { class: "job-list", id: "job-list" },
          components: jobListingContent(JOB_LIST),
          // jobsList: [], // This will store the job data
          // url: WEBSITE_BUILDER_JOB_LISTING_URL,
          // editable: false, // Prevent content editing
          // removable: false,
          styles: JOB_LISTING_STYLE,
        },
        // init() {
        //   // remove it and open the blow code if need to use the api ***start***
        //   this.set("jobsList", JOB_LIST);
        //   this.handlePropChange();
        //   // ***End***
        //   // setScreenLoader(true);
        //   // fetch(this.attributes.url)
        //   //   .then((response) => response.json())
        //   //   .then((data) => {
        //   //     setScreenLoader(false);
        //   //     this.set("jobsList", data.data.jobs);
        //   //   })
        //   //   .catch((error) => {
        //   //     setScreenLoader(false);
        //   //     console.error("Failed to fetch jobs:", error);
        //   //   });

        //   this.listenTo(this, "change:jobsList", this.handlePropChange);
        //   this.on("component:update", this.preventContentChange);
        // },
        // handlePropChange() {
        //   let jobs = this.get("jobsList");
        //   let htmlContent = jobListingContent(jobs);

        //   const component = editor.addComponents(htmlContent);
        //   return component;
        // },
        // preventContentChange() {
        //   const el = this.view.el;
        //   const originalHtml = el.innerHTML;
        //   el.innerHTML = originalHtml;
        //   console.log("Content changes are not allowed for this component.");
        // },
      },
    });

    // job filter

    editor.BlockManager.add("job-filter", {
      label: "Job-filter",
      content: {
        type: "job-filter",
      },
      category: "Custom",
    });

    editor.DomComponents.addType("job-filter", {
      model: {
        defaults: {
          tagName: "div",
          draggable: true,
          droppable: false,
          attributes: { class: "job-list", id: "job-list" },
          components: jobFilter
        }
      },
    });

    // Job Details block
    if (pageId === "job-details" || pageId === "Job-details") {
      editor.BlockManager.add("job-detail-block", {
        label: "Job Details",
        content: { type: "job-details" },
        category: "Custom",
      });
      editor.DomComponents.addType("job-details", {
        model: {
          defaults: {
            tagName: "div",
            draggable: true,
            droppable: false,
            attributes: { class: "job-details" },
            jobsList: [], // This will store the job data
            url: WEBSITE_BUILDER_JOB_LISTING_URL,
            editable: false, // Prevent content editing
            removable: false,
            styles: JOB_LISTING_STYLE,
          },
          init() {
            fetch(this.attributes.url)
              .then((response) => response.json())
              .then((data) => {
                this.set("jobsList", data.data.jobs);
              })
              .catch((error) => {
                console.error("Failed to fetch jobs:", error);
              });

            this.listenTo(this, "change:jobsList", this.handlePropChange);
            this.on("component:update", this.preventContentChange);
          },
          handlePropChange() {
            let jobs = this.get("jobsList");
            let htmlContent = singleJobContent([jobs[0]]);

            const component = editor.addComponents(htmlContent);
            return component;
          },
          preventContentChange() {
            const el = this.view.el;
            const originalHtml = el.innerHTML;
            el.innerHTML = originalHtml;
            console.log("Content changes are not allowed for this component.");
          },
        },
      });
    }

    // Job Details block

    // New changes

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
              const rootComponents = editorInstance.current.getComponents();
              addTraitsToLinks(rootComponents);
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

  function addTraitsToLinks(components) {
    components.forEach((component) => {
      // Check if the current component is an <a> tag
      if (component.get("tagName") === "a") {
        // Example: Adding a trait
        const traits = component.get("traits") || [];
        const attributes = component.get("attributes") || {};
        const hrefValue = attributes.href || ""; // Retrieve href value
        const targetValue = attributes.target || ""; // Retrieve target value

        traits.push({
          name: "href",
          label: "Href",
          type: "text",
          value: component.get("attributes").href, // Set the value to the href
        });
        traits.push({
          name: "target", // Trait name for target
          label: "Target",
          type: "select",
          options: [
            { value: "_self", name: "Self" },
            { value: "_blank", name: "Blank" },
            { value: "_parent", name: "Parent" },
            { value: "_top", name: "Top" },
          ],
          value: targetValue, // Set the value to the target
        });

        component.set("traits", traits);
      }

      // Check if this component has children and recurse
      const childComponents = component.components();
      if (childComponents.length > 0) {
        addTraitsToLinks(childComponents);
      }
    });
  }

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

  const handleBack = () => {
    navigate("/admin/website-pages");
  };

  return (
    <>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
      <Button
        variant="transparent"
        className="font-14 main-btn px-5"
        onClick={handleBack}
      >
        Back
      </Button>
      <div ref={editorRef}></div>
      {screenLoader && <ScreenLoader />}
    </>
  );
};

export default WebsiteBuilder;

// export const EMAIL_CONTACT = `<div data-gjs-droppable='false' data-gjs-editable='false' data-gjs-removable='false' data-gjs-copyable='false'>
//             <input data-gjs-droppable='false' data-gjs-editable='false' data-gjs-removable='false' data-gjs-copyable='false' type="email" id="emailInput" placeholder="Enter your email" required>
//             <button id="contact-email" data-gjs-droppable='false' data-gjs-editable='false' data-gjs-removable='false' data-gjs-copyable='false'>Contact Me</button>
//         </div>`;

// export const EMAIL_CONTACT_STYLE = `body {
//     font-family: Arial, sans-serif;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 100vh;
//     margin: 0;
//     background-color: #f4f4f4;
// }

// .contact-form {
//     background-color: #fff;
//     padding: 20px;
//     border-radius: 10px;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//     text-align: center;
// }

// .contact-form h2 {
//     margin-bottom: 20px;
// }

// input[type="email"] {
//     width: 100%;
//     padding: 10px;
//     margin-bottom: 15px;
//     border: 1px solid #ccc;
//     border-radius: 5px;
// }

// button {
//     padding: 10px 20px;
//     background-color: #007bff;
//     color: white;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
// }

// button:hover {
//     background-color: #0056b3;
// }
// `;

export const EMAIL_CONTACT = {
  model: {
    defaults: {
      tagName: "header",
      draggable: true,
      droppable: true,
      components: `<div data-gjs-droppable='false' data-gjs-editable='false' data-gjs-removable='false' data-gjs-copyable='false'>
            <input data-gjs-droppable='false' data-gjs-editable='false' data-gjs-removable='false' data-gjs-copyable='false' type="email" id="emailInput" placeholder="Enter your email" required>
            <button id="contact-email" data-gjs-droppable='false' data-gjs-editable='false' data-gjs-removable='false' data-gjs-copyable='false'>Contact Us</button>
        </div>`,
      attributes: { class: "header-builder" },
      styles: `body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f4f4f4;
}

.contact-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.contact-form h2 {
    margin-bottom: 20px;
}

input[type="email"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
`,
    },
  },
};

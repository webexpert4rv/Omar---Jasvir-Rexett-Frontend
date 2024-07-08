import 'grapesjs/dist/css/grapes.min.css';
import websitePlugin from 'grapesjs-preset-webpage';
import basicBlockPlugin from 'grapesjs-blocks-basic';
import formPlugin from 'grapesjs-plugin-forms';
import { useEffect } from 'react';
import grapesjs from 'grapesjs';

export const WebsiteBuilder = () => {
    useEffect(() => {
        const editor = grapesjs.init({
            container: '#gjs',
            width: '100%',
            plugins: [websitePlugin, basicBlockPlugin, formPlugin],
            styleManager: {
                sectors: [
                    {
                        name: 'General',
                        open: false,
                        buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom'],
                    },
                    {
                        name: 'Dimension',
                        open: false,
                        buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
                    },
                    {
                        name: 'Typography',
                        open: false,
                        buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-shadow', 'text-align'],
                        properties: [
                            {
                                name: 'Font Family',
                                property: 'font-family',
                                type: 'select',
                                defaults: 'Arial, Helvetica, sans-serif',
                                options: [
                                    { value: 'Arial, Helvetica, sans-serif', name: 'Arial' },
                                    { value: 'Georgia, serif', name: 'Georgia' },
                                    { value: 'Impact, Charcoal, sans-serif', name: 'Impact' },
                                    { value: 'Tahoma, Geneva, sans-serif', name: 'Tahoma' },
                                    { value: "'Times New Roman', Times, serif", name: 'Times New Roman' },
                                    { value: 'Verdana, Geneva, sans-serif', name: 'Verdana' },
                                    { value: "'Poppins', sans-serif", name: 'Poppins' },
                                ]
                            },
                        ]
                    },
                    {
                        name: 'Decorations',
                        open: false,
                        buildProps: ['opacity', 'border-radius', 'border', 'box-shadow', 'background'],
                    },
                    {
                        name: 'Extra',
                        open: false,
                        buildProps: ['transition', 'perspective', 'transform'],
                        properties: [{
                            type: 'integer',
                            name: 'Duration',
                            property: 'transition-duration',
                            units: ['s', 'ms'],
                            defaults: '0s',
                            min: 0,
                        }]
                    },
                    {
                        name: 'Background Overlay',
                        open: true,
                        buildProps: ['background-color', 'background-opacity'],
                        properties: [
                            {
                                name: 'Background Color',
                                property: 'background-color',
                                type: 'color',
                                defaults: 'rgba(0,0,0,0)',
                                fixedValues: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.9)', 'rgba(0,0,0,1)'],
                            },
                            {
                                name: 'Background Opacity',
                                property: 'background-opacity',
                                type: 'slider',
                                defaults: 1,
                                step: 0.1,
                                max: 1,
                                min: 0,
                            },
                        ],
                    }
                ]
            },
            canvas: {
                styles: [
                    'https://unpkg.com/grapesjs/dist/css/grapes.min.css'
                ],
            },
            pageManager: {
                pages: [
                    {
                        id: 'page-id',
                        styles: `.my-class { color: red }`, // or a JSON of styles
                        component: '<div class="my-class">My element</div>', // or a JSON of components
                    }
                ]
            }
        });

        // Add custom header component
        editor.DomComponents.addType('header', {
            model: {
                defaults: {
                    tagName: 'header',
                    draggable: true,
                    droppable: true,
                    components: [
                        {
                            tagName: 'nav',
                            components: [
                                {
                                    tagName: 'ul',
                                    components: [
                                        { tagName: 'li', components: [{ type: 'text', content: 'Home' }] },
                                        { tagName: 'li', components: [{ type: 'text', content: 'About' }] },
                                        { tagName: 'li', components: [{ type: 'text', content: 'Services' }] },
                                        { tagName: 'li', components: [{ type: 'text', content: 'Contact' }] },
                                    ],
                                },
                            ],
                        },
                    ],
                    attributes: { class: 'header-builder' },
                    styles: `
                        .header-builder {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 10px 20px;
                            background-color: #333;
                            color: #fff;
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
                            color: #fff;
                            text-decoration: none;
                        }
                        @media (max-width: 768px) {
                            .header nav ul {
                                flex-direction: column;
                                display: none;
                            }
                            .header nav ul.active {
                                display: flex;
                            }
                        }
                    `,
                    // script: function () {
                    //     const header = this;
                    //     const nav = header.querySelector('nav ul');
                    //     const toggleButton = document.createElement('button');
                    //     toggleButton.innerHTML = '☰';
                    //     toggleButton.className = 'nav-toggle';
                    //     toggleButton.onclick = () => nav.classList.toggle('active');
                    //     header.prepend(toggleButton);
                    // },
                },
            },
        });

        // Add custom block for header
        editor.BlockManager.add('header', {
            label: 'Header',
            content: {
                type: 'header',
            },
            category: 'Custom',
        });

        editor.DomComponents.addType('accordion', {
            model: {
                defaults: {
                    script: function () {
                        const headers = this.querySelectorAll('.accordion-header');
                        headers.forEach(header => {
                            header.addEventListener('click', function () {
                                const content = this.nextElementSibling;
                                content.style.display = content.style.display === 'block' ? 'none' : 'block';
                            });
                        });
                    },
                    tagName: 'div',
                    attributes: { class: 'accordion' },
                    components: [
                        {
                            tagName: 'div',
                            attributes: { class: 'accordion-item' },
                            components: [
                                { tagName: 'div', attributes: { class: 'accordion-header' }, content: 'Section 1' },
                                { tagName: 'div', attributes: { class: 'accordion-content' }, content: 'Content 1', style: { display: 'none' } },
                            ],
                        },
                        {
                            tagName: 'div',
                            attributes: { class: 'accordion-item' },
                            components: [
                                { tagName: 'div', attributes: { class: 'accordion-header' }, content: 'Section 2' },
                                { tagName: 'div', attributes: { class: 'accordion-content' }, content: 'Content 2', style: { display: 'none' } },
                            ],
                        },
                    ],
                },
            },
        });

        // Add custom block for accordion
        editor.BlockManager.add('accordion', {
            label: 'Accordion',
            content: {
                type: 'accordion',
            },
            category: 'Custom',
        });

    }, []);

    return (
        <div id="gjs"></div>
    );
};

export default WebsiteBuilder;

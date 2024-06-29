import 'grapesjs/dist/css/grapes.min.css';
import gjspresetwebpage from 'grapesjs-preset-webpage';
import gjsblockbasic from 'grapesjs-blocks-basic';
import gjspresetnewsletter from 'grapesjs-preset-newsletter';
import { GrapesjsReact } from 'grapesjs-react';
import { useEffect } from 'react';
import grapesjs from "grapesjs";
// import 'grapesjs/dist/css/grapes.min.css'
import websitePlugin from 'grapesjs-preset-webpage';
import basicBlockPlugin from 'grapesjs-blocks-basic'
import formPlugin from 'grapesjs-plugin-forms'

export const WebsiteBuilder = () => {
    return <GrapesjsReact
        id='grapesjs-react'
        plugins={[
            gjspresetwebpage,
            gjsblockbasic,
            // gjspresetnewsletter,
            formPlugin
        ]}
    />;

    // useEffect(() => {
    //     const editor = grapesjs.init({
    //       container: '#gjs',
    //       width: '100%',
    //       plugins: [websitePlugin,basicBlockPlugin,formPlugin],
    //       styleManager: {
    //        sectors: [{
    //            name: 'General',
    //            open: false,
    //            buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom'],
    //          },{
    //            name: 'Dimension',
    //            open: false,
    //            buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
    //          },{
    //            name: 'Typography',
    //            open: false,
    //            buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-shadow'],
    //          },{
    //            name: 'Decorations',
    //            open: false,
    //            buildProps: ['opacity', 'border-radius', 'border', 'box-shadow', 'background'],
    //          },{
    //            name: 'Extra',
    //            open: false,
    //            buildProps: ['transition', 'perspective', 'transform'],
    //            properties: [{
    //              type: 'integer',
    //              name: 'Duration',
    //              property: 'transition-duration',
    //              units: ['s', 'ms'],
    //              defaults: '0s',
    //              min: 0,
    //            }]
    //          }]
    //      },
    //      canvas: {
    //        styles: [
    //          'https://unpkg.com/grapesjs/dist/css/grapes.min.css'
    //        ],
    //      },
    //      pageManager: {
    //        pages: [
    //          {
    //            id: 'page-id',
    //            styles: `.my-class { color: red }`, // or a JSON of styles
    //            component: '<div class="my-class">My element</div>', // or a JSON of components
    //          }
    //       ]
    //      }
    //     })
    //     editor.BlockManager.add('my-block', {
    //      label: 'My Block',
    //      content: '<div class="my-block">This is a custom block</div>',
    //      category: 'Custom',
    //      attributes: { class: 'fa fa-square' },
    //    });
    //    const pageManager = editor.Pages;
    //  },[])
 
    //  return (
    //    // <GrapsEditor />
    //      <div id="gjs"></div>
    //  );
};
export default WebsiteBuilder
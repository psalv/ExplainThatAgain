
import React from 'react';
import ReactDOM from 'react-dom';
import { Example } from './example';


/*
Example of how to render element to the DOM.
The StatusSearch object is being created in a separate js file
*/

ReactDOM.render(
    <div>
         <Example/>
    </div>, document.getElementById('example')
);


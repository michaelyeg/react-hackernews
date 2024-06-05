import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { isHTMLElement } from "@popperjs/core/lib/dom-utils/instanceOf";

const rootElement = document.getElementById('root')!;
if (isHTMLElement(rootElement)) {
    const root = createRoot(rootElement);
    root.render(<App />);
}



import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';

import WordRelay from './WordRelay';
const Hot = hot(WordRelay);
ReactDom.render(<Hot />, document.querySelector('#root'));

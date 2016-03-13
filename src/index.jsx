import ReactDOM from 'react-dom';
import {Routes} from './Routes.jsx';

if (module.hot) {
  module.hot.decline('./Routes.jsx');
}

ReactDOM.render(Routes, document.getElementById('root'));

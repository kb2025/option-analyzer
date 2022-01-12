import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { OptionDataProvider } from './Providers/OptionDataProvider'
import { SelectedDateProvider } from './Providers/SelectedDateProvider'
import reportWebVitals from './reportWebVitals';
import { ResultsDataProvider } from './Providers/ResultsDataProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'

ReactDOM.render(
  <React.StrictMode>
    <OptionDataProvider>
      <SelectedDateProvider>
        <ResultsDataProvider>
          <App />
        </ResultsDataProvider>
      </SelectedDateProvider>
    </OptionDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

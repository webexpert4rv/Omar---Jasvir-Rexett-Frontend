import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './redux/slices/store.js';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.js';
import { TourProvider } from '@reactour/tour';
import { TourProviderWrapper } from './crmTour/TourContext.js';
import { steps } from './crmTour/Step.js';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from './services/msalConfig.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
     <Provider store={store}>
     <I18nextProvider i18n={i18n}>

     <TourProvider steps={steps}
     badgeContent={({ totalSteps, currentStep }) => currentStep + 1 + "/" + totalSteps}
     >
      <TourProviderWrapper>
      <MsalProvider instance={msalInstance}>
        <App />
        </MsalProvider>
      </TourProviderWrapper>

    </TourProvider>

     </I18nextProvider>
     </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

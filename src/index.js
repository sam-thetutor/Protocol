import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { IdentityKitProvider } from '@nfid/identitykit/react';
import "@nfid/identitykit/react/styles.css"
import { InternetIdentity, NFIDW } from '@nfid/identitykit';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <IdentityKitProvider signers={[NFIDW, InternetIdentity]} featuredSigner={[InternetIdentity]}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</IdentityKitProvider>
);


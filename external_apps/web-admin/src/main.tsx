import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.css';
import './locales';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1677ff',
            borderRadius: 4,
          },
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);

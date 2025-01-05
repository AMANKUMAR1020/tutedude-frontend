import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import './Components/Style.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistStore(store)}>
				<BrowserRouter>
					<Routes>
						<Route path="/*" element={<App />} />
					</Routes>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
//reportWebVitals();
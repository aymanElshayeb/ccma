import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';
import SimpleReactLightbox from "simple-react-lightbox";
import  ThemeContext  from "./context/ThemeContext";

ReactDOM.render(
	<React.StrictMode>
		<Provider store = {store}>

            <SimpleReactLightbox>
                <BrowserRouter basename='/ccma'>
                    <ThemeContext>
                        <App />
                    </ThemeContext>  
                </BrowserRouter>    
            </SimpleReactLightbox>
        </Provider>	
	</React.StrictMode>,
  document.getElementById("root")
);

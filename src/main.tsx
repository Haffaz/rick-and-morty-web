import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import MyApolloProvider from "./graphql/MyApolloProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MyApolloProvider>
      <App/>
    </MyApolloProvider>
  </StrictMode>,
)

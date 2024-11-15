import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { QueryClient,  QueryClientProvider } from 'react-query'
import { ThemeProvider } from "@material-tailwind/react";
const queryclient  = new QueryClient();
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ThemeProvider>
        <QueryClientProvider client={queryclient}>
          <App/>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
)

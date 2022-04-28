
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from 'react-query';

//to use react-query in the applcation

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
    
);
    

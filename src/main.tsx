import  ReactDOM from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { QueryProvider } from './lib/react-query/QueryProvider';
// ReactDOM.createRoot para renderizar o app
ReactDOM.createRoot(document.getElementById('root')!).render(
//  BrowserRotuer para envolver toda a aplicacao em roteamento
// QueryProvider para fornecer contexto de consulta
// AuthProvider para fornecer contexto de autenticacao
// App para renderizar o componente principal do app
 <BrowserRouter>
  <QueryProvider>
      <AuthProvider>
          <App/>
      </AuthProvider>
  </QueryProvider>
 </BrowserRouter>   
)
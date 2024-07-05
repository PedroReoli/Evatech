import { Routes, Route } from 'react-router-dom';
import './globals.css';
// Autenticação 
import SigninForm  from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';

// TOAST component 
import { Toaster } from '@/components/ui/toaster';

// Páginas 
// Devido ao index.ts ,agora dá para importar mais facil 
// fica assim agora {pagina1,pagina2,pagina3} from  './_root/pages/'
import { Home } from './_root/pages/';
import RootLayout from './_root/RootLayout';
const App = () => {
  return (
    <main className='flex h-screen'>
        <Routes>
            {/* Rotas Públicas  - Sem login */}
            <Route element={<AuthLayout />}>    {/* Páginas Sobrepostas */}
                <Route path="/sign-in" element={<SigninForm/>}/>   
                <Route path="/sign-up" element={<SignupForm/>}/>  
            </Route>
            {/* Rotas Privadas  - Com Login */}
            <Route element={<RootLayout />}>    {/* Páginas Sobrepostas */}
                 <Route index element={<Home/>}/>    
            </Route>
        </Routes>
        <Toaster/>
    </main>    

)
}

export default App
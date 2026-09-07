import {Outlet} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function Layout(){
    return(
        <div id="layout" className="flex flex-col min-h-screen">
            <Header />
            <main className="max-w-[1280px] w-full m-auto flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout;
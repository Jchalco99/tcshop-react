import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

function Layout({ children }) {
    return (
        <div className="flex min-h-screen flex-col">
            <HeaderComponent />
            <main className="flex-grow">{children}</main>
            <FooterComponent />
        </div>
    )
}

export default Layout;

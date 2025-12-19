import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

interface Props {
    children: React.ReactNode
}

export default function LandingLayout({ children }: Props) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}

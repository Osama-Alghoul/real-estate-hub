import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";

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

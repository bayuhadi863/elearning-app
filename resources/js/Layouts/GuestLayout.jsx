import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function Guest({ children, page }) {
  return (
    <>
      <Header page={page}/>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        {children}
      </div>
      <Footer />
    </>
  );
}

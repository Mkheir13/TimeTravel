import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Destinations from './components/Destinations';
import Quiz from './components/Quiz';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <Hero />
        <About />
        <Quiz />
        <Destinations />
        <BookingForm />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;

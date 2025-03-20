import CookieConsent from 'react-cookie-consent';
import './App.css';
import BookList from './BookList';
import Fingerprint from './fingerprint';

function App() {
  return (
    <>
      <BookList />
      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <Fingerprint />
    </>
  );
}

export default App;

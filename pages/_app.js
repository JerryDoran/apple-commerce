import '../styles/globals.css';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Toaster />
        <Header />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;

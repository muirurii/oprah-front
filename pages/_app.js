import '../styles/globals.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
  <Layout>
    <div className="text-black overflow-x-hidden">
       <Component {...pageProps} />
     </div>
  </Layout>
  )
}

export default MyApp


import './App.css';
import Container from './components/Container';
import { ChatProvider } from './context/ChatContext';

function App() {
  return <ChatProvider>
    selam
    <Container/>
    </ChatProvider>


}

export default App;


//ilk olarak backend için redis ve nodemon kurduk
//redis i bir veritabanı oalrak kullanıp mesajları tutmasını sağlayacağız ayrıca redisin port ve host tanımlamalarını .env altında yaptık

//ardından client altına reacti oluşturduk
//ardından chat applikasyonu için gerekli dosyaları ve bağlantıları yapmaya başladık ilk olarak:
//chatcontext i oluşturduk burda klasik olarak bir context provider yapısı var ve bu provider a yine value yöntemiyle values i bağladık
//values içerisine message ve set message tanımlamalarını yaptık ve bu provider yapsıını app e çağırdık
//ardından component kısımlarımızı oluşturduk ve 2 adet component ortaya çıkardık 
//yani aslında stratejik gidiş için ilk olarak dosyaları oluşturup import ve çağırmaları yaptık ardından geliştirmeleri yapacağız

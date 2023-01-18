ilk olark .env de host tanımlarının olduğu bir dosya oluşturduk
 backendi npm install ve bpm audit fix--force yaparak güncelledik ve bağımlılıkları yükledik
 ardından mongodb nodemon mongoose kurumları yaptık 
 sonrasında npm run dev ile backendi ayağa kaldırdık ve localhost:4000 hostundan kontrol ettik
 ve terminalde nodemon ve mongodb ayağa kaltı mı diye kontrol ettik
 ardından client tarafı için react app i kurduk
 burdan sonra ise ilk oalrak router işlemlerine başladık 
 router v6.4.3 de ilk olarak yaptığımız şey routerimizi gerekli importları yaptıktan sonra app.jsde BrowserRouter ile sarmalamak
ardından ilk olarka navbar componentine başaldık ve buna ilişkin bir dizin açtık 
navbarın içerisinde ise left ve right buttons olarka 2 ye ayırdık ve bu bölgelerin css tanımlarını yaptık
varsayılan css tanımlamalarını silmek için ise reset css adında bir klasör açtık ve browserden bulduğumuz reset css i yapıştırdık.
   ardından chakra ui i yükledik
   bu eklenti altında login ve register butonlarını import ettik ve bu butonlara bir path ataması yaptık link ile beraber
   link ile bu butonları signin ve signup pathlerine yönlendirdik
   ve bu page leri dosyada tanımladık
   ardından app.js altında bu buton yani linklere basıldığında route un hangi pathe yönlendireceğini ayarlaadık yai bunu routes altında kurguladık.
   Routes içerisinde element ve path ile hangi componentin getirileceğini ve gösterileceğini kurgulayabiliyoruz.

   -- şimdi ise products ekranını kurgulayacağız ilk olarak products a bir path verdik routes altından ardından products ı page olarak atadık
   bu page in içerisine bir card componenti yerleştireceğiz 
   bu nedenle bir card componneti oluşturduk
   card componentini tasarlarken chakra ui kullanıyoruz 
  ***** chakra ui altında bize aynı div gibi olan Box tagi altında borderWidth borderRadius gibi stillendirme tanımlamaları da otomatik olarak geliyor***
  ayrıcakarta tıklandığında bir yönlendirme de sağlamamız lazım bunu da yine link ile yapacağız yani react router dom altında yapacağız
  ör:
  import { Box, Image, Button } from "@chakra-ui/react";

function Card() {
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3px">
            <Link to="#/">
                <Image src="https://picsum.photos/400/200" alt="product" />

                <Box p="6">
                    <Box d="flex" alignItems="baseline">
                        12/12/2022
                    </Box>
                    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                        Macbook Pro
                    </Box>
                    <Box>100TL</Box>
                </Box>
            </Link>
            <Button colorScheme="pink">Add To Basket</Button>
        </Box>
    )
}
burada box bir div olarak çalışır box altında display alignitems vb gibi birçok tanım vardır bu stillendirme tanımları otomatik olarak geliyor button altında ise istersek sepete atıldığında farklı bir renk şemasına dönüşmesini sağlayabiliriz.
ardından burdaa oluturduğumuz yapıyı products sayfasında 
function Products() {
    return (
        <div>
            <Grid templateColumns='repeat(4, 1fr)' gap={5}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
              
            </Grid>
        </div>
    )
}grid yapısı altında kurguladık 
şimdi de veriyi çekebilmek için react query kullanacağız Rest API ile uyumlu çalışan bir uygulama ilk olarka client tarafına kurduk bir fetch veya axios ile çektikten sonra bunu setstate vb yapmamız gerekiyor 
bua araç ile bunu daha kısa bir şekilde kullanarak yapabiliyoruz
bunun için index js e importu yaptık
importtan sonra
 const queryClient = new QueryClient()
tanımladık ve  <QueryClientProvider client={queryClient}>
       <Example />
     </QueryClientProvider> sarmaladık

     sonrasında sadece useQuery ile herhangi bir veri kaynağına gidip veri çekmek mümkün olacak
useQuery ile products da bir api call işlemi yapacağız
kendi oluştuduğumuz backend e verilerimizi bağlamıştık 
react query ile http://localost:4000/product bağlantısına istek attık ve bu isteği logladk 
12 adet productı log olarka yazdırmış olduk
ardından bu ürünleri products sayfasında gridin altında mapledik ve her birini Card componenti altında yazdırdık
   <div>
            <Grid templateColumns='repeat(4, 1fr)' gap={5}>
            {
                data.map((item,id) => <Card key={id} item={item} />)
            }
            </Grid>
        </div>

burda yazdırdığımız Card içerisine bir item propu geçtik ve bu item zaten datanın kendisi içeriği bu içeriği prop ile Card componentine iletmiş olduk 
bu iletimden sonra ise Car componenti içerisinde {item.istenilenveri} ile istediğimiz içeriği tasarımın altında yazdırabiliyoruz. tabi prop olarak item ı da function altında verdik

function Card({item} ) {
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3px">
            <Link to="#/">
                <Image src="https://picsum.photos/500/300" alt="product" />

                <Box p="6">
                    <Box d="flex" alignItems="baseline">
                        12/12/2022
                    </Box>
                    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                        ***{item.title}***
                    </Box>
                    <Box>100TL</Box>
                </Box>
            </Link>
            <Button colorScheme="pink">Add To Basket</Button>
        </Box>
    )
}
price vbayarladıktan sonra oluşturulma tarihi de girmiştik bunu da **moment** eklentisi aracılığıyla yapacağız
güncel örnek bkz **card/index.js**

react query genel bakış ilk olarak useQuery i kullanabilmek için react Query i index.js dosyamızda tanımladık
sonra herhangi bir veri kaynağına gidip veri almamız için gerekli olan tek ifade useQuery ifadesi
 
  const { isLoading, error, data } = useQuery('products', () =>
     fetch('http://localhost:4000/product').then(res =>
       res.json()
     )
   )
   useQuery dedikten sonraki ilk ifade ise bir key aslında Bu key il cashlenmiş çektiğimiz veriyi manipüle etmek istediğimizde kullanıyoruz 
   useQuery ile bize 3 veri daha sunuyor bize burada state güncellememize gerek kalmadan loading ve error proplarını da otomatik olarak veriyor

   ekstra olarka api call u src içerisinde farklı bir dosyada tanımlandı.

   **react query dev tools**

   const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <ChakraProvider>
    <App />
    </ChakraProvider>
    <ReactQueryDevtools initialIsOpen={false} />*******
    </QueryClientProvider>
  </React.StrictMode>
);
şekildeki gibi import ettikten sonra ekranda sol altta bir react query amblemi olan ibare geliyor
bunu içerisinde kullanmış olduğumuz api a ait olan products keyli bir yapı var
producktstan dönen sonuç burada listeleniyor 
bu listeleme esnasında baktığımızda sayfa yenilediğimizde sekme değiştirdiğimizde hatta component değiştirdiğimizde biel tekrar tekrar fetch isteği atıyor
biz sadece sayfa yenilendiğinde bunu yapmasını isteyebiliriz
bu durumda 
index.js dosyasındaki queryclient altında 

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnMount:false, login e basıp tekrar products a geldiğimizde 
      refetchOnWindowFocus:false, sekme değiştirdiğimizde 
    }
  }
})
yapabiliriz.

şimdi de ürünlerin detay sayfasını oluşturuyoruz bunun için bir route tanımladık ve bu route u 
<Route path="/product/:product_id" element={<ProductDetail />} /> şeklinde oluşturduk yani product/:product_id sayfasında gittiğimizde product detail componentiyle karşılaşacağız bunun için de tıklanan ürünün üzerine link verimiştik 
function Card({item} ) {
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3px">
            <Link to={`/product/${item._id}`} >
                <Image src={item.photos[0]} alt="product" loading="lazy"/>

                <Box p="6">
                    <Box d="flex" alignItems="baseline">
                    {moment(item.createdAt).format("DD/MM/YYYY")}
                    </Box>
                    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                    {item.title}
                    </Box>
                    <Box>{item.price} TL </Box>
                </Box>
            </Link>
            <Button colorScheme="pink">Add To Basket</Button>
        </Box>
    )
}
burda belirlemiş olduğumuz link içerisine product/product id yazıdırıyoruz 

ardından productDetail sayfasında usePArams kullanıyoruz bunu kullnamamızın sebebi ise route a bir parametre gönderiyoruz ve b parametre bir id bunu parametre oalrka geçip alıp tekrar backende gönderip istek oluşturacağız.
productDetail sayfasında isteği ve api çağrısını yine products taki gibi yaptık 
ve yine chakra ui ile tasarımı oluşturmuş olduk
ayrıca ımage gallery ile de bir image kısmı oluşturduk 


import React from 'react'
import {useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Text, Button } from '@chakra-ui/react';
import moment from 'moment';
import  ImageGallery  from 'react-image-gallery';

function ProductDetail() {
    const {product_id} = useParams();

    const {isLoading, error, data} = useQuery("product", () => fetch(`http://localhost:4000/product/${product_id}`)
    .then(res => res.json()))

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error.</div>
    }

    const images = data.photos.map((url) => ({ original: url }) )
    
  return (
    <div>
            <Button colorScheme="pink">
                Add To Basket
            </Button>
            <Text as="h2" fontSize="2xl">{data.title}</Text> 
            <Text>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>
            <p>{data.description}</p>
            
                <ImageGallery items={images} />
            
    </div>
  )
}

export default ProductDetail

bu kısımda yapılan en önemli olay useParams kullanımıydı yani veriden bir aprametre çektik ve bu parametre id idi bu idyi de pathe yapıştırıp böyle bir sayfa oluşturmuş olduk

 şimdi de use infity query ile page işlemini gerçekleştireceğiz
  useInfiniteQuery altında ilk olarak pageParamsı aldık
   
   useInfiniteQuery('products', ({ pageParam = 0 }) =>
     fetch('http://localhost:4000/product?page=' + pageParam).then(res =>
       res.json()
     ),
normalde bu kısmı useQuery ile alıyorduk ve fetch deki page kısmına başta 0 verdiğimiz page paramsı ekledik
const {  data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status, } = useInfiniteQuery('products', ({ pageParam = 0 }) =>
     fetch('http://localhost:4000/product?page=' + pageParam).then(res =>
       res.json()
     ),
     {
        getNextPageParam: (lastGroup, allGroups) => {
            const morePagesExist = lastGroup?.length ===12 ;
            if (!morePagesExist) {
                return
            }
            return allGroups.length +1;
        },
      }
   )
 
   if (status === "loading") return 'Loading...'
 
   if (status === "error") return 'An error has occurred: ' + error.message
 ardından getNextPageParam ile grupları tanımlamış olduk eğer 12den fazlaysa bu kısma +1 sayfa daha atmasını sağladık
 getNextPageParam ile daha fazla sayfa var mı yok mu onu dönüyoruz aslında 
 ardından useInfintyQuery ile gelecek olan diğer parametreleri aldık  
 data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status, 
        bu parametreleri alınca loading ve erroru status altında tanmılamamız gerekti
        ardından datayı logladığımızda data artık pageParam ve pages öğleriyle erbaer geldi
        
        yani database aslında page 2 yi de içeriyor 
        bu nedenle iki kez mapleme işlemi yapmamız gerekiyor çünkü ilk olarka page i mapleyip ikinci olarak da içerisindeki öğleri mapleyerek gidecğiz 
        datayı logladığımızda artık data pages parametresini de queryden dolayı içermeye başlıyor bu nedenle ilk başta yaptığımız tek mapleme işlemi yeterli olmuyor. yani herbir pages group olarak geliyor bu nedenle 2 kez mapleme dönüyoruz!!!!!!

        <Grid templateColumns='repeat(4, 1fr)' gap={5}>
            
            {/* {
                data.map((item,id) => <Card key={id} item={item} />) **eski mapleme**
            } */}

            {
                data.pages.map((group,i) => (
                    <React.Fragment key={i}>
                        {
                            group.map((item) => (
                                <Box w="%100" key={item._id}>        **yeni mapleme**
                                    <Card item={item}/>
                                </Box>
                            ))
                        }
                    </React.Fragment>
                ))
            }
            </Grid>
            açıklamalı oalrak ise bize her defasında page olarak bir grup ve bunun indisi gelecek 
            vebunu bir react fragment içerisinde döneüyoruz ardından gelen her grubu tekrar mapleyip bunlardan da bize birer item geleceğini biliyoruz. ve bu gelen itemları bir box içerisinde tanımlıyoruz ilk mapdeki gibi
            ardından bunları card öğesine prop olarak geçip gönderiyoruz card componentinde de zaten carı işlemiştik.
            bir sonraki sayfayı getirmek için ise bir buton eklemiş ve fetching diyte bir tanımı getirmiş
            <div>
         <button
           onClick={() => fetchNextPage()}
           disabled={!hasNextPage || isFetchingNextPage}
         >
           {isFetchingNextPage
             ? 'Loading more...'
             : hasNextPage
             ? 'Load More'
             : 'Nothing more to load'}
         </button>
       </div>
       <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div> bu yapıyı kullanmış örnekte 

       şimdi de kullanıcı kayıt işlemlerini yapıyoruz 
       sign up için ilk olarak sign up page i yaptık burada tasarımı chakra ui ile oluşturduk
       bir flex altında kurguladık ilk olarak header verdik  heading ile
       ardından bir box içerisinde formcontrol ve formlabel ve ınput kullanarak oluşturduk 
       bunun üzerine formik ve yup tanımlarını yapıp form kontrolü tamamlayacağız

       ilk olarak yup ve formiki kurduk 
       ardından useformik hookuyla formikin set edip göndereceği parametreleri girdik
       
        const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    onSubmit: async (values,bag) => {
      console.log(values);
    }
  })

  ve burada bir onSubmit de tanımladık bize onSubmit üzeinde values altında formdaki datalar bag de de form üzerinde yapabileceğimiz bir takım işlemler geliyor

  bu form tagindeki on submit kısmına onSubmit={form.onSubmit} verdik
  ardından input vb değerlerine de parametreler igirmeli ve burdaki verileri almalıyız 
  bunun için de 
  <Input name='email' onChange={formik.handleChange}  onBlur={formik.handleBlur} value={formik.values.email} />
  gibi formik altında gelen handlechange ve handleblr u kullanıyoruz. value olarak da girdiğimiz değeri data olarak yazdırmak için value veriyoruz.
  bunu bütün inputlar için uyguladıktan sonra şimdi de validasyon işlemleri için yup u kullandık ve validations.js adında bir dosya açtık
  bu dosyanın içine 
  
  import * as yup from "yup";

const validations = yup.object().shape({
    email: yup.string().email("Geçerli Bir E-mail Giriniz.").required("Zorunlu Alan."),
    password: yup.string().min(8, "Parolanız En Az 8 Karakter Olmalıdır.").required(),
    passwordConfirm: yup.string().notOneOf([yup.ref("password")], "Parolalar Uyuşmuyor.").required()
});
export default validations

validayon ayarlarını yaptık  ve validationSchema olarak import ettik

şimdi de formumuzda bir hata varsa o hataların gösterilmesi işlmelerini yapacağız
bunu da inputlarda isInvalid ile ypacağız eğer o alana önceden touched olunmuşsa ve uyuşmuyorsa hata atacak

<Input name='email' onChange={formik.handleChange}  onBlur={formik.handleBlur} value={formik.values.email} isInvalid={formik.touched.email && formik.errors.email} /> gibi

ardından sign up edilen veriyi database ve backend e göndermemiz gerekiyor. bunun için de ilk olarak api.js de bir istek atacağız
axios üzeinden 
import axios from "axios";

export const fetchRegister = async (input) => {
    const  {data} = await axios.post(
        `http://localhost:4000/auth/register`, input
    )

    return data;
}
şeklinde bir istek bağlantısı oluşturduk burada input değerimizi value olarak geçtik fetchRegister a 
ardından bunu sign up sayfasında 


 onSubmit: async (values,bag) => {
      try {
        const registerResponse = await fetchRegister({email: values.email, password:values.password});
        console.log(registerResponse);
      }catch(e){}
    },
  })
  onsubmit altında kullnadık yani form submit edildiğinde bir try ve catch bloğuna düşer
  bu blokta eğer error yoksa doğruysa fetchRegister altında tanımladığımız parametreler yani email: values.email, password:values.password direk olarak backende gider 
  email: values.email, password:values.password yerine direkt values de yazabilirdik ama passwordConfirm de backende gidiyor ve error alıyoruz
  ve bu bloğun responsunu da console a yazdırdık
    onSubmit: async (values,bag) => {
      try {
        const registerResponse = await fetchRegister({email: values.email, password:values.password});
        console.log(registerResponse);
      }catch(e){ 
        bag.setErrors({general: e.response.data.message});
      }
    },
  })
ardından catch bloğunda da bir hata ayıklama tanımladık burada buna general propu geçtik ve error altındaki response altındaki datanın hata mesajını verdik ve bu tanımı bir alert olarak yazacağız

 <Box my={5}>
            {
              formik.errors.general && (
                <Alert status='error'>
                  {formik.errors.general}
                </Alert>
              )
            }
          </Box>
          bu hatayı da bir boxın içerisinde alert olarka tanımladık.

kullanıcı kayıt ilemleri 3 
şimdiki aşamada ise kullanıcı login olduktan sonra signin signup gibi alanları kaldırıp bir login formatı tasarlayacağız
bunun için context kullanıyoruz  ve bunu AuthContext te yapacağız
ilk olarak useState createContext useEffect ve useContext i import ediyoruz ardından bir context create ediyotuz ve bunun provider ını tanımlıyoruz
ardından 2 adet state tanımladık 
birincisi user stateini tanımaladık burada user kayıt olduğunda veya login olduğunda userın detay bilgilerini tutacağız örneğin mail adı soyadı vs
ikincisi loggedin state i o anda log in mi değilmi olduğunu tutan bir state bu da 
burdaa ise log in mi değil mi onu tutacak ifade
ardından bunları set edecek bir fonksiyon tanımladık 
bu fonksiyonu birazdan signup da kullanacağız 
fonksiyon data adında bir parametre alır ve ilk olarak bu fonksiyon aktif olduğunda setLoggedIn i true ya çeker 
ardından setUser a da bu data adındaki parametreyi işler bu parametre kullanıcı bilgileri içermektedir.
ardından values i tanımladık 
burada values üzerinde loggedIn i user ı ve login fonksiyonunu dışarı aktarıyoruz.
ardından bir provider içerisinde bunu return edip dışarıda kullanacağız.
 return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
 ardından usecontexti de burada geçip direkt kullanıyoruz 
 const useAuth = () => useContext(AuthContext)

 ardından kullanacağımız öğeleri dışarı aktarıyoruz
 export {AuthProvider, useAuth}

 ve bu AuthProvider ile componentleri sarmalamamız gerekiyor.
 bu nedenle src index.js içerisinde app componentini sarmaladık 
 ardından signup içerisinde useAuth u kullnacağız ve bunun içerisinde de zaten login fonksiyonu geliyor.
 bu nedenle importtan sonra 
 const {login} = useAuth();
 olarak aldık
 ve bu login fonksiyonunu eğer işlemler doğruysa çalışması için try catch bloğunda çalıştıracağız
 catch in içerisinde bir access token response u dönüyorduk
 
 {user: {…}, accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkI…wcCJ9.GB72HPUTTrVkEcHdPHW3L3jyP2FZk4yUHwUrsBDlE-Y', refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkI…HAifQ.O5xoanLf9-KnnEPPlWlEbdt46iGfm6WYQqtOiJ8a1QM'}
accessToken
: 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNhMmMwMWU2MGQxMzIwNzA0M2U4OTZhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NzE2MTAzOTgsImV4cCI6MTY3MjQ3NDM5OCwiaXNzIjoiZWNvbW1lcmNlLmFwcCJ9.GB72HPUTTrVkEcHdPHW3L3jyP2FZk4yUHwUrsBDlE-Y"
refreshToken
: 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNhMmMwMWU2MGQxMzIwNzA0M2U4OTZhIiwiaWF0IjoxNjcxNjEwMzk4LCJleHAiOjE2ODcxNjIzOTgsImlzcyI6ImVjb21tZXJjZS5hcHAifQ.O5xoanLf9-KnnEPPlWlEbdt46iGfm6WYQqtOiJ8a1QM"
user
: 
{role: 'user', _id: '63a2c01e60d13207043e896a', email: 'asdf@asdf.com'}
[[Prototype]]
: 
Object
 login(registerResponse)

bu şekilde birresponse bu response u login e parametre olarak verdik ve setUser da da data.user dedik çünkü response altında user objesine ihtiyacımız var

bu sayede login çalıştığında isloggedin ve setUser verileri işlenir ve biz bu veriyi navbarda kullanabiliriz.
ve navbara loggedIn verisini aldık şimdi ise şu şekilde bir blok yazacağız 
eğer loggedIn yoksa butonları göster
loggedIn varsa kullancı ismi vs
ardından login olduktan sonra sayfayı yenilediğimizde login kısmı gidiyor yani client tarafı log in mi değil mi bilemiyoruz 
bu nedenle bunun kalıcı olması için access tokeni kullanmamız gerekiyor backend tarafında atamıştık ve bunu me 4000 portunda auth/me adında bir endpoint vardı ve burada her sign up ve login de bir header açıyorduk backend e ve o da bize bir access token atıyordu bunu kullanarak login in devamlılığını sağlayacağız
bunun için ilk olarak o yazılan isteği oluşturuyoruz ve bunu api üzerindenaxios la çekiyoruz

fakat burda isteği oluştururken bizim bu access token ı da linke vb yerleştirmemiz lazım ve her defasında bunu yerleştirmek de zor olabiliyor
o nedenle axios üzerinden yeni bir tanımla bunu yapacağız

axios bize burada interceptors adı altında bir yapı sunuyor 

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

bunu set etmemiz için ilk olarka access tokenımızı ve refresh tokenımızı local Storage a yazdık 
localStorage.setItem("access-token", data.accessToken)

şimdi axios da işlem yapılmadan önce ilk olarak 4000 portunda me altındaki oluşturulan header a local storage da tuttuğumuz token i ekliyoruz 

axios.interceptors.request.use(function (config) {
   const {origin} = new URL(config.url)
   const allowedOrigins = ["http://localhost:4000/"]
   const token = localStorage.getItem("access-token")
   if (allowedOrigins.includes(origin)) {
    config.headers.authorization = token;
   }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 

bu yapı içerisinde ilk önce bir origin altında url i tanımladık 
ardından
  const allowedOrigins = ["http://localhost:4000/"] burada hangi endpointlere istek yapılırken bu eklenmeli yi aslında belirliyoruz
  ardından token ı çekiyoruz 
  sonra eğer allovedorigins içinde origin varsa bu confige bir header ekle bu da authorization headeri olsun 
  token ı eklemiş olduk

  ardından eğer authcontext çalıştığı anda useEffect i kullanarak fetchMe yi çalıştıracağız 
  fakat fetchMe async olduğu için useEffect içerisinde direkt çalıştırılamıyor bu nedenle bir müddet bekletmemiz gerektiği için useEffect içerisinde ya direkt bir async tanım oluşturacağız ya da anonim ir async fonksiyon çalıştıracğız
  useEffect(() => {
        (async ()=> {
            
        })()
    }) 
    yani bu bloğun içerisinde bu şekilde çalıştırabiliriz

    
    useEffect(() => {
        (async () => {
            try{
                const me = await fetchMe();
            }catch(e){

            }
        })()
    })

    burada try catch blokları içerisinde fetchMe yi çalıştırdık
    şuan logladığımzıda me içerisinde 
    me 
{role: 'user', _id: '63a2ca1860d13207043e896d', email: 'asdfe@asdef.com'}
email
: 
"asdfe@asdef.com"
role
: 
"user"
_id
: 
"63a2ca1860d13207043e896d"
[[Prototype]]
: 
Object
şeklinde bir log görürüz 

yani mantıksal olarak şuanda çalıştırmış olduğumuz axios get isteği backend de me altındaki verileri çekiyor ve bunu biz useEffectin içerisinde logluyoruz yani bundan sonra bu veri üzerinde işlemler ypabiliriz
yani sayfa her yenilendiğinde setLoggedIn i true ya çekeriz
setUser a me yi veririz ve böyle her yenilediğimizde login olarka davranacaktır

ardından birde loading tanımladık context in içerisinde 
const [loading, setLoading] = useState(true)

 useEffect(() => {
        (async () => {
            try{
                const me = await fetchMe();
                setLoggedIn(true)
                setUser(me)
                setLoading(false)
            }catch(e){
                setLoading(false)
            }
        })()
    },[])

     if (loading) {
        return(
            <Flex justifyContent="center" alignItems="center" height="100vh">
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" color="red.500"/>
        </Flex>
        )
    }
    şeklinde bir tanımla yaptık

    şimdi de log out tanımlamalarını yapıyoruz 
    bir buton tanımladık ve bu butona basıldığında context içerisinde bir logout fonksiyonu olmalı ve o çalışmalı
    backende baktığımızda log out olmak için refresh tokeni göndermemiz gerekiyor
    gerekli logout fonksiyonubu AuthContext içerisinde tanımladık 

     const logout = async (callback) => {
        setLoggedIn(false)
        setUser(null);
        
        await fetchLogout();

        localStorage.removeItem("access-token")
        localStorage.removeItem("refresh-token")
        callback();
    }
asenkron bir tanım verdik ve setlogged in i false e çektik
setuser ı boşaltıık 
ardindan fetchLogoutu çalıştırdık 
ardından local storage i temizledik 

fetch logout ta ise 
export const fetchLogout = async () => {
  const {data} = await axios.post("http://localhost:4000/auth/logout", {
    refresh_token: localStorage.getItem("refresh-token"),
  }
  )
  return data;
}
şeklinde bir tanıma sahiptik yani refresh tokeni gönderiyorduk 
ardından 
AuthContext te ki values e logoutu da ekledik ve bunu profil sayfasında kullandık 
ordaki click i de asnkron bir fonksiyon olarak verdik
 
 const handleLogout = async () => {
        logout(); 
    }

    <Button mt="20px" colorScheme="pink" variant="solid" onClick={handleLogout}>
            Logout
        </Button>

ardındna AuthContext e bir callback geçip bu callback ile de bizi logout olduktan sonra ana sayfaya yönlendirmesini çalıştıracağız

admin ekranına yetkimiz yoksa giremiyor olmamız lazım bunun için de bir protectedRoute oluşturacağız
app.js de oradaki route lar gibi çalışan kendimize özel bir route oluşturacağız.
burda bir protectedroute kısmı oluşturduk ve 
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

function ProtectedRoute() {
    const {loggedIn} = useAuth()
  return (
    <div>
        {
            loggedIn ? <Outlet/> : <Navigate to="/"/>
        }
    </div>
  )
}

export default ProtectedRoute
use auth un altından loggedIn i aldık 
eğer logged in varsa sayfaya devam et eğer yoksa anasayfaya yönlendri dedik ve bunu uygulayacağımız route u app js de kullandık ve routeu tekrar sarmaladık 
<Route element={<ProtectedRoute/>}>
            <Route path="/profile" element={<Profile />} />
          </Route>

ardından sign in page i tamamladık sign up page in aynısı olarka sadece confirm ve isim farklılıklarını düzeltip ekstra olarak backende api üzerinden bir istek attık . 

şimdi ise sepete ürünekleme işlemlerini gerçekleştireceğiz ve bu işlemleri BasketContext üzerinden yapacağız.
const BasketContext = createContext()

const BasketProvider = ({children}) => {
    const [items,setItems] = useState([])

    const addToBasket = (data) => {
        setItems((prev) => [...prev,data]);
    }
    }
basket context i oluşturduk 

yine state imizi tanımlıyoruz stateimiz bir array 
ve sepete ekleme işlemlerinde statei önceki veriyi koruyarak güncelliyoruz 
bunu bir provider ve provider values olarka geçeceğiz

  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
    );

    bu yapı aslında basket context ile provider yapsını birbirine bağlıyor 
    ardından Context içerisinde  

    const addToBasket = (data, findBasketItem) => {
        if(!findBasketItem){
            return setItems((items) => [...items,data]);
        }
        const filtered = items.filter((item) => item._id !== findBasketItem._id)
        setItems(filtered)
    };

    yapısını kurduk 
    bu yapı sepepte ekleme ve sepetten çıkarma işlemlerini yapıyor
    ve bunu da 

    const {addToBasket, items} = useBasket();
  ....
  const findBasketItem = items.find((item) => item._id === product_id)

  <Button colorScheme={findBasketItem ? "pink" : "green"} onClick={() => addToBasket(data, findBasketItem)}>
                
                {findBasketItem ? "Remove from basket" : "Add to basket"}
            </Button>

          ProductDetail sayfasındaki yapılarla yapıyor.
          bu yapılarda ilk olarak add to basket ve items öğelerini context ten çektik

          ardından sepet içerisinde item ı bulmak istedik ve items.find diyerek gelen item id si ile ürün item id si bir mi ona baktık 
          eğer bu veri varsa 
          ilk olarak butondaki color ı ve yazıyı dizayn ettik yoksa pembe Add to basket varsa yeşil Remove from basket olarak 
          sonradan tuşa bastığımızda FindbasketItem ve Veriyi add to basket a gönderdik 

          addToBasket context func a gelen veriler burda eğer findBasketItem false dönmüşse state i set edip ürünü ekler 
          
          eğer findBasketItem true dönmüşse items ı filtreler ve burada product id ve item id si aynı olanı almaz çıkartır.
          ve bu işlemin aynısını card sayfasında da uyguladık

şimdi de basket sayfasını yani sepet sayfasını yaptık burada yine context ten çekmiş olduğumuz items ın içeriğini kullanarak oluşturduk

function Basket() {
    const { items } = useBasket()

    const total = items.reduce((acc, obj) => acc + obj.price, 0)
    return (
        <div>
            {
                items.length < 1 && (
                    <Alert status='warning'>You Have Not Any Items In Your Basket.</Alert>
                )
            }
            {
                items.length > 0 && <>
                    <ul>
                        {
                            items.map((item) => (
                                <li key={item._id}>
                                    <Link to={`Products/${item._id}`}>
                                        {item.title} - {item.price} TL
                                        <Image htmlWidth={200} src={item.photos[0]} alt="basket item" />
                                    </Link>
                                    <Button mt="2" size="sm" colorScheme="pink" onClick={() => { }}>
                                        Remove from basket
                                    </Button>
                                </li>
                            ))
                        }
                    </ul>
                    <Box mt="10">
                        <Text fontSize="22"> Total : {total} TL</Text>
                    </Box>
                </>
            }

        </div>
    )
}

item yoksa alert tanımladık varsa bir yapı tanımladık 

diğer yapılardan farklı olarak 
    const total = items.reduce((acc, obj) => acc + obj.price, 0)
bir total hesapalttık yani bütün sepetteki ürünlerin toplamını 

ayrıca yine aynı sşekilde filtered ı kullanarak bir removeFromBasket fonksiyonunu context te kullandık

sayfayı yenilediğimizde ürünlerin kaybolmaması için bu ürünleri ayrıca localstorage datutacağız bir cookie veya backend tarafında da tutabilirdik.

şimdi de ürünler için bir sipariş isteği oluşturacağız bunun için ilk oalrka backende baktık ve burda bizden items ve adress istiyor.bizde bunun için ilk olarak basket sayfasına bir buton tanımladık
ardından chakra altında Modal adında bir olay var orda modal a bastığımızda adress ve name girilebilecek bir ekran çıkıyor bir textarea ortaya çıkıyor onu kullanacağız.
bu model için ilk oalrak bağımlılıkları import ettik
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

ardından fonksiyona gerekeli tanımlarıı tanımladık
 const { isOpen, onOpen, onClose } = useDisclosure()
 
  const initialRef = React.useRef(null)

sonra modal kısmını ekledik return altına
   <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      şkelinde import ettik ve
            <Button mt="2" size="sm" colorScheme="green" onClick={onOpen}>Order</Button>

                    <Modal
                        initialFocusRef={initialRef}
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Order</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormControl>
                                    <FormLabel>Address</FormLabel>
                                    <Textarea ref={initialRef} placeholder='Adress' />
                                </FormControl>


                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3}>
                                    Save
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>

şeklinde düzenledik 
ardından bu textarea içerisine girilen adresi bizim almamız lazım
bu nedenle bir state oluşturacağız
oluştuduğumuz bu state i address olarak tanımladık çünkü backende bu parametreyi göndermemiz gerekiyor.
ardından bu address state ini textarea da onchange ile set ediyoruz 
ardından save butonuna bir handleChanceForm adında fonksiyon tanımladık 
burada ilk olarak sepetteki ürünlerin idlerini ayrıştırıyoruz bunu da contextten gelen useBasket ile yaptık 
oradan gelen ve elimizde hala bulunan sepet ürünlerinin idlerini oradan çekip kullanabiliyoruz.

 const handleSubmitForm = async() => {
        const itemIds = items.map((item) => item._id)
    }

ardından burada bir obje tanımladık ve artık bu objeyi backend e göndericez 

  const handleSubmitForm = async() => {
        const itemIds = items.map((item) => item._id);
        
        const input = {
            address,
            items: JSON.stringify(itemIds)
        }
    }
    input objesi 
    ve buradan alacağımız objeyi api üzerinde bir istek oluşturarag post ile göndereceğiz

    export const postOrder = async(input) => {
  const {data} = await axios.post("http://localhost:4000/order",input);
  return data;
}
şkelinde bir api yolu açtık 

  const handleSubmitForm = async() => {
        const itemIds = items.map((item) => item._id);
        
        const input = {
            address,
            items: JSON.stringify(itemIds)
        }

        ****const response = await postOrder(input);*****
    }

    ardından bu yolu fonkisyon içerisinde çağırdık 
    ve isteğimizi oluşturup postladık parametre olarak geçtiğimiz input zaten direkt api dan çektiği ve aynı parametreyi girdiğimiz için göndermiş oldu 

    ardından admin işlerini yapmaya başladık 
    ilk olarak admin rolünde bir kullanıcı tanımladık 
    ardından useAuth un içerisine authContext te zaten var olan user ı çektik
    ve bu userın rolü eğer admin ise bir buton göstermesini istedik 

      {
                            user?.role === "admin" && (
                                <Link to="/admin">
                                    <Button colorScheme="pink" variant="ghost">Admin</Button>
                                </Link>
                            )
                        }

ve bu butona bir path tanımladık 
artık o route a geçip route u güncelleyeceğiz
ilk olarak admin sayfaları için bir pages adı altında admin dosyası açtık sayfalarımızı burada yazacağız 
ardından bunu ilk olarak app.js de gösterdik protected routes altında gösterdik fakat direkt gösterdiğimizde admin olmayan kullanıcılar da bu sayfaya devam edebildi 
bunun önüne geçmek için AdminProtectedRoute altında bir dizin daha açtık orada kullancı rolü admin ise sayfaya Admin sayfasını göstermesini değilse anasayfaya yönlendirmesini istedik.
function AdminProtectedRoute() {
    const {user} = useAuth()
  return user.role === "admin" ? <Admin/> : <Navigate to="/"/>
}

export default AdminProtectedRoute
ve bunu app js de direkt tanımladık
<Route path="/admin/*" element={<AdminProtectedRoute/>}/>

ardından admin index.js içerisinde yine aynı mantıkla bir routes ve link yapısı kurduk
function Admin() {
  return (
    <div>
        <nav>
            <ul className={styles.admin}>
                <li>
                    <Link to="/admin">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/admin/orders">
                        Orders
                    </Link>
                </li>
                <li>
                    <Link to="/admin/products">
                        Products
                    </Link>
                </li>
            </ul>
        </nav>

    <Box mt="10">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/products" element={<Products/>}/>
        </Routes>
    </Box>
    </div>
  )
}

export default Admin

şimdi de siparişleri görüntüleyeceğiz bunun için ilk oalrak api da o çağrımızı yapalım
siparişler için ilk olarka api de orders altında bir axios isteği attık ve bu aqios isteğini orders sayfasında jQuery ile bağladık ardından çektiğimiz datayı chakra uı altındaki bir table ile aldık


şimdi de products safasını geliştireceğiz burada table ı ise antdesign dan geliştireceğiz 
ant design da sadece 1 hook geçip sonra array ve obje tanımlayarak table ı oluşturabiliriz
bu table ı oluştururken bizde hangi başlıklar ve veriler olacağını geçtik ve bunları title createdat ve price olarak geçtik 
bundan sonra ise ürübleri editlememiz gerekecek çünkü admin sayfasındayız ve bir edit kısmı yapacağız 
bu nedenle bir Link oluşturduk ve bu linkin pathine yine id yi verdik 


const columns = [
    {
        title:"Title",
        dataIndex: "title",
        key:"title"
    },{
        title:"Price",
        dataIndex:"price",
        key:"price",
    },{
        title:"created At",
        dataIndex:"createdAt",
        key:"createdAt"
    },{
        title:"Action",
        key:"action",
        render: (text,record) => (
            <>
            <Link to={`/admin/products/${record._id}`}>Edit</Link>
            </>
        )
    } 
]

  <Table dataSource={data} columns={columns} rowKey="_id"/>

  bu id yi verirkende render kısmı bize text ve record adı altında hooklar sunuyor böylece id yi çekebiliyoruz.

  ayrıca popconfirm de de ant design da silme işlemini gerçekleştirebiliriz. onu da oradan yapacağız

   <Link to={`/admin/products/${record._id}`}>Edit</Link>
            <Popconfirm title="Are you sure?"
            onConfirm={()=> {
                alert("silindi");
            }}
            onCancel={() => console.log("iptal edildi")}
            okText="Yes"
            cancelText="No"
            placement='left'>
                <a href='/#'>Delete</a>
            </Popconfirm>
            </>

şeklnide bir yapı kurguladık burada title geçtik onaylandığında alert verdik ital edildiğinde console a yazdırdık 
buton textleri belirledik ve şimdi de silme işlemi yaptığımızda sildireceğiz. bunda önce de sürekli table ı çekmeye çalışmaması ve değişiklikleri de tutabilmesi için bütün columns yapısını useMemo içerisine aldık 

silmek için ise ilk önce backend de ne gibi bir istek yapmamız gerektiğine baktık bu isteği delete tarafındaki onay ile gönderip sildireceğiz

ürünü silerken useMutation adında yine query ile gelen bir hooku kullanıyoruz bu hooku 

const deleteMutation = useMutation(deleteProduct)
 şeklinde import ettik deleteproduct bizim api isteğimizdi 

   <Popconfirm title="Are you sure?"
                     onConfirm={()=> {
                         deleteMutation.mutate(record._id, {
                            onSuccess: () => {
                                console.log("success")
                            }
                         })
                     }}
                     onCancel={() => console.log("iptal edildi")}
                     okText="Yes"
                     cancelText="No"
                     placement='left'>
                         <a href='/#' style={{marginLeft:10}}>Delete</a>
                     </Popconfirm>

burada confirm olduğunda deletemutation u çalıştırıyoruz ve ona mutate altında parametre olarak record un id si yani ürünün id sini gönderiyoruz. ve ikinci parametrede de bu fonksiyon eğer tamamlanırsa bize console a success yazmasını istiyoruz.
ardından biz ürünü sildiğimizde ürün backendden siliniyor ama o anda sayfadan silinmiyor bunu sağlamamız için ise 


const deleteMutation = useMutation(deleteProduct)

 const deleteMutation = useMutation(deleteProduct, {
        onSuccess: () => queryClient.invalidateQueries("admin:products")
    })

    ve on success olduğunda buradan çektik çünkü queryClient kullanmamız gerekli imiş 
    buraya da  queryClient.invalidateQueries("admin:products") ilk olarak verdiğmiz keyi geçtik 
    bu şekilde ekran yenilemeden silmeyi başardık

    <Popconfirm title="Are you sure?"
                     onConfirm={()=> {
                         deleteMutation.mutate(record._id)
                     }}
                     onCancel={() => console.log("iptal edildi")}
                     okText="Yes"
                     cancelText="No"
                     placement='left'>
                         <a href='/#' style={{marginLeft:10}}>Delete</a>
                     </Popconfirm>

                     yani popcofirm buna döndü

şimdi bir product editleme sayfası oluşturuyoruz bunun için ilk aolarka routerı tanmıladık yani 1 route daha ekledik ve route ve linkin arkasına id yi verdik  bu sayede her ürün kendi edit sayfasına da sahip olmuş oluyor 
ardından edip page de bir takım düzenlemeler yaptık ilk başta formik kullandık ve formikin içerisinde initialValues leri tanımladık bu initial valueslere de api den çektiğimiz verileri işledik 

   <Formik
                initialValues={{
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    photos: data.photos
                }}
                // validationSchema
                onSubmit={handleSubmit}
            >

            burda data. olarak vediklerimiz useQuery den çektiğimiz veriler 

            ardından formikin altında gelen hookları tek tek yukarıda import etmek yerine bu şekilde import edip bir
            ({hooks}) => (<>code</>) olarak tanımladık 

            ({ handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting }) =>
 
 ardından code yapısının içerisine bir Box açmışız Div de olurdu.

 ardından bir box daha açmışız 

 ve bunları bir html form içerisine almışız form a da yine submit olduğunda handleSubmiti vermişiz 


 ardından içerisinde bulunan taglerde FormControl altında gerekli inputları doldurduk 


  <FormControl>
                     <FormLabel>Title</FormLabel>
                      <Input
                        name="title" onChange={handleChange} onBlur={handleBlur} value={values.title}
                      disabled={isSubmitting}
                 />
         </FormControl>

burada ınputun içerisine değer olarak formik ile gelen initial values i yazdık her birinin kategorsiine göre
blur verdik değişiklikleri yazmak için handleChange verdik 
ve submit olurken disabled ettik

bunu price ve desc için de yaptık 
ardından fotoğraflar için ise 

<FormControl mt="4">
                                            <FormLabel>Photos</FormLabel>
                                            <FieldArray
                                            name="photos"
                                            render={(arrayHelpers) => (
                                                <div>
                                                    {
                                                        values.photos && values.photos.map((photo,index) => (
                                                            <div key={index}>
                                                                <Input 
                                                                name={`photos.${index}`}
                                                                value={photo}
                                                                disabled={isSubmitting}
                                                                onChange={handleChange} 
                                                                width="3xl" />
                                                                <Button 
                                                                type="button" 
                                                                colorScheme="red" 
                                                                ml="4"
                                                                onClick={()=> arrayHelpers.remove(index)}
                                                                >Remove</Button>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )} />

                                        </FormControl>

şeklinde bir form kontrol oluşturduk burada ise 
Formik altındaki FieldArrayi çalıştırdık çünkü bize dönen data yı console a yazdırdığımızda fotoğraflar bir array içerisinde ve link olarka dönüyordu 
ardından field array altında render özelliğini çalıştırdık ve arrayHelpers adında bir parametre geçtik 
ve bu parametrenin ardından photos altındaki verileri mapleyerek her bir link için 

values.photos && values.photos.map((photo,index) => (
                                                            <div key={index}>
                                                                <Input 
                                                                name={`photos.${index}`}
                                                                value={photo}
                                                                disabled={isSubmitting}
                                                                onChange={handleChange} 
                                                                width="3xl" />
                                                                <Button 
                                                                type="button" 
                                                                colorScheme="red" 
                                                                ml="4"
                                                                onClick={()=> arrayHelpers.remove(index)}
                                                                >Remove</Button>
                                                            </div>

etiketlerini yazdık 
burada index girdisiyle her bir etiketin de farklı indexi ve namelerinin farklı olmasını sağladık çünkü 1 foto gelmiyor 
yine blur disbled onchange li bir input tanımladık 
ardından bunlara bir buton ekledik ve bub buton ile arrayhelpers girdisi ile beraber ilgili index numaralı fotonun silinmesini sağladık 
fakat bunu şimdilik sadece client tarafında sildik onClick={()=> arrayHelpers.remove(index)}

<Button mt="5" onClick={() => arrayHelpers.push()}>Add a photo</Button>
ve bu tagle de arrayhelpers altına bir input açıp foto yükletebiliyoruz

son olarak da 
  <Button mt="4" width="full" type='submit' isLoading={isSubmitting}>
                                            Update
                                        </Button>


yapısını koyduk ve bu buton type ı submit olduğu için submitting i çalıştırdı bununla beraber bir loading de koyduk ve bunu da Submit olana kadar beklettik 
zaten submit olurken diğer inputlarımızı da disabled a almıştık.
şimdi geriye buradaki verilerin hepsini backendde oluşturulmuş olan put opsiyonuna yazarak backend e kaydedeceğiz.


export const updateProduct = async (input, product_id) => {
  const {data} = await axios.put(`http://localhost:4000/product/${product_id}`, input)
  return data;
}
şeklinde diğerlerinen tek farkı sadece put opsiyonu ve inputgirdileri olan bir istek atıyoruz 
bu fonksiyona parametre olarak input verilerini göndereceğiz onu da handlesubmit ve submitlerde yapacağız 
ardıdan verilerimiz yazılmış olacak 

bu arada validasyonları da yup üzerinden ayrı bir dosyada tanımladık 
ardından HandleSubmit e geldik ve submit olduğu zaman gerçekleşecek fonksiyonları yazdık 
ilk olarak ant design dan bir message import ettik 
bu message a loading i verdik ve bir key geçtik çünkü loading bittinğinde yine yeni bir mesaj göndermesi gerekiyor.
key:"product_update keyini verdik
ardından try ve catch blokları arasında 
await updateProduct(values, product_id) tanımladık ve gönderdik 
bu ürünümüzü güncelledi 
ve success mesajını gösterdi

 const handleSubmit = async (values,bag) => {
        console.log(values);
        message.loading({content:"Loading...", key:"product_update"})
        try{
            await updateProduct(values, product_id)
            message.success({
                content:"The product successfully updated.",
                key:"product_update",
                duration:2,
            })
        }catch(e){
            message.error("The produck does not updated!")
        }
    }

    son olarak new product ekleyeceğiz 
    products sayfasında bir buton tanımladık new adı altında 
    bunun için yine route oluşturduk ve sayfayı tanımladık ardından edit sayfasını olduğu gibi aldık 
    birtakım değişiklikler yaptık örneğin orada api den veri çekme istedi bulunmamakta 
   fakat api dosyamızda bir de post isteği yapacağız 
   bu nedenle yeniden bir api tanımlıyoruz şimdi post api mizi oluşturacağız 

   export const postProduct = async (input) => {
  const {data} = await axios.post(`http://localhost:4000/product/`, input)
  return data;
}








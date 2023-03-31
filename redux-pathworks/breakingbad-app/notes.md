ilk olarak router redux toolkit react redux axios kurduk 
ardından index.js i redux provider ile sarmaladık ve store u tanımladık tanımlamış olduğumuzz redux store u  provider store tanımına verdik 

ayrıca react router ile yine borwserRouter routes ve route ile yönlendirme işlemleri yapacağız 
bunun için app.js i browserrouter ile sarmaladık 
ve routes zaten switch di 
route a ise elementleri paylaşıyoruz
bunun için bir de link tanımı yapacağız

ardından sliceımızı tanımladık burada breaking bad api dan veri çekeceğiz fakat veri çemedik çünkü 504 bad gateaway aldık
 bu nedenle devam edeceğiz slice yapımızda axios ile response aldıktan sonra bu response u state altında yine items a action payload eşitleyerek gönderdik 
 ardından home sayfamızda bu karakterleri göstereceğimiz için bir mapleme işlemi yaptık bu maplemeyi ise masonry altında gerçekleştirdik bu yapı bize hazır css tanımlı kart yapıları verdi bunu ise 
 ## npm install react-masonry-css 
 altında yaptık 
 home page 
 
 
 import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCharacters } from '../../redux/characterSlice'
function Home() {
    const data = useSelector((state) => state.characters.items)
    const dispatch = useDispatch()
    
    useEffect(() => {
   dispatch(fetchCharacters())
 },[dispatch])

  return (
    <div>
       <h1>Characters</h1>
       <Masonry
  breakpointCols={3}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column">
   {
           data.map((item) => (
            <div key={item.char_id}>
                <img alt={item.name} src={item.img}/>
                </div>
           )) 
       }
</Masonry>
      
    </div>
  )
}

export default Home


burada dispatch i yine useeffecet içerisinde çağırdık sürekli istek atmasın diye 

ardından loading ve error tanımları yaptık ve bunu home page e çektik 


şimdi ise load more kısmını yapacağız yani sonsuz page oluşturacağız 
 bunun için ilk olarak slice da bir page değişkeni tutuacağız 

 offset mantığı 12 karakterse 12 den sonra gösteriyor 
 bu nedenle page * char_limit olarak kullanacağız

 const res = await axios(`https://www.breakingbadapi.com/api/characterslimit=${char_limit}?offset=${page * char_limit}`); 
 şeklinde düzenledik bunu bir butona bağlayacağız 

 bu şekilde bir tanımın ardından home page de bir butona basıp sayfayı artırıyoruz 
 bu page kısmını 
 const page = useSelector((state) => state.characters.page)
 alıp 

 <div style={{padding:"20px 0 40px 0", textAlign:"center"}}>
<button onClick={() => dispatch(fetchCharacters(page))}> Load More {page} </button>
</div> 
ile manipüle ediyoruz buradaki manipülasyonu ise her fulfilled olduğunda page sayısını 1 arttır olarak tanımlıyoruz 

 [fetchCharacters.fulfilled]: (state,action) => {
           state.items = [...state.items ,action.payload];
           state.isLoading = false;
           state.page =+ 1;
        },
        burada page kısmını maniüle etmeyi sadece butona verdiğimiz için buton manipüle ettiğinde çalışmış oluyor 
        diğer türlü page ksımını başka bir yerde parametreolarak verseydik orası çalışırdı
        ardından state.items da eski array elemanlarını koruyarak yenisini ekliyoeuz .
        şimdi çağırıdğımızda sayfa komple gidip yeni veriyle geliyor
        biz bunun yerine loading i tanımlayıp sayfayı yenilemeden loading gösterip sonra ekleteceğiz 

        </Masonry>
{isLoading && <Loading/>}
<div style={{padding:"20px 0 40px 0", textAlign:"center"}}>
<button onClick={() => dispatch(fetchCharacters(page))}> Load More {page} </button>
</div>
      

      böyle kullanınca loading varsa burada gösteriyor

next page yoksa 
  {
    hasNextPage && !isLoading &&
<button onClick={() => dispatch(fetchCharacters(page))}> Load More {page} </button>
    }
    bu tanımla onu sağladık 

      [fetchCharacters.fulfilled]: (state,action) => {
           state.items = [...state.items ,action.payload];
           state.isLoading = false;
           state.page =+ 1;
           if(action.payload.length < 12){
            state.hasNextPage =false;
           }
        },
        burada ise item yoksa butonu kaldırıyoruz.

 status: "idle", isloading kavramını false ve true yaptığımızda kullanıcı detay sayfasına gidip geldiğinde tekrar 12 tane aynı karakterleri gönderdi bunun nedeni ise status u idle olarak kullnamamamızdı 
 şimdi isloading yerine status ü idle yapacağız 
 bunu ise 
 export const characterSlice = createSlice({
    name: "characters",
    initialState: {
        items: [],
        status: "idle",
        page: 0,
        hasNextPage: true,
    },
    reducers: {},

    extraReducers: {
        [fetchCharacters.fulfilled]: (state,action) => {
           state.items = [...state.items ,action.payload];
           state.status = "succeeded";
           state.page =+ 1;
           if(action.payload.length < 12){
            state.hasNextPage =false;
           }
        },
        [fetchCharacters.pending]: (state,action) => {
            state.status = "loading";
        },
        [fetchCharacters.rejected]: (state,action) => {
            state.status = "failed";
            state.error = action.error.message;
        }
    },
    bu şekilde oldu şimdi bütün isloadingler status e çekilecek 

    useEffect(() => {
    if(status === "idle"){
   dispatch(fetchCharacters())
 }},[dispatch])
 
 use effectte buna dönüştü 


 routerda linkleme işlemi ile her idli kişi için page oluşturduk 
  {
           data.map((item) => (
            <Link to={`/char/${item.char_id}`}>
            <div key={item.char_id}>
                <img alt={item.name} src={item.img} className="character" />
                <p>{item.name}</p>
                </div>
            </Link>
           )) 
       }
       ve şimdi burdan gelen id yi use PArams ile yakalayacağız 


       şimdi de buna bağlı oalra kdetail sayfasını yapıyoruz 
       import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

function Detail() {
    const [char, setChar] = useState(null);

    const {char_id} = useParams();

    useEffect(() => {
        axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/characters/${char_id}`)
        .then((res) => res.data)
        .then((data) => setChar(data))
    },[char_id])
  return (
    <div>
        {
            char && <div>
                <h1>{char.name[0]}</h1>
                <img src={char.img} alt="" style={{width:"50%"}}/>
            </div>
        }
    </div>
  )
}

export default Detail
burada tekrar bir axios ile veri çektik çünkü data direkt linke girince kayboluyor bizde burada tekrardan veri çekerek yaptık 
char_id den gelen parametreyi axios a gönderip bir karakter çektik
bu karakteri tanımladığımız useState e attık 
ve bu datayı sayfada kullanacağız 


şimdi sevilen sözleri direkt yazdıracağız ve navigate edebilmek için navigasyo yapacağız 

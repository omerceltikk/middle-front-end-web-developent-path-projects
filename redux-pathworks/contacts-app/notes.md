data normalleştirme denen yapıyı yapacağız bizim önceki çalışmalarımızda items altında direkt olarak bir obje oluşturuyorduk slice içinde 
bu örnekte örneğin find metodunu kullandığımızda arrayi baştan sonra arıyor
örneğin binlerce data var ve aradığımız kayıt en sonda bu da performans kaybına sebebiyet verebilecek bir durum 

şimdi ise yeni örnekte datayı normalleştirip devam edeceğiz
burda kullanacağımız tavsiye edilen yöntem ise bizim itemsı el ile oluşturmak yerine bizim yerimize entities ile oluşturup bütün elemanlara uniq id verecek
yani items yerine entities gelecek 
ve bu entitiy i kullanırken createEntitiyAdapter i redux toolkit ile kullanacağız ve bu bize ekstra avantajlar sağlayacak 
ve bunun altında bazı opsiyonlar verilecek örneğin 

addOne addMany setAll removeOne removemany removeAll gibi birçok tanımı veriyor bunlarla otomatik olarak fonksiyonları tanımlıyoruz

export const contactAdaptor = createEntityAdapter();

şeklinde adaptörü tanımladık 
    initialState:contactAdaptor.getInitialState(),

initial state i bağladık 

  reducers:{
        addContact: contactAdaptor.addOne,
    }
})

şeklinde verilen hazır fonksiyonlarla bir reducer tanımladık ve bu reducer ı artık her yerde kullanabiliriz 
bu hazır fonksiyonlarda id tanımı vermediğimizde undifined altında veri dönüyor 
burada entities altında kayıtlar toplanıyor
 bundan sonra entities altındaki x idli elemanı çekebileceğiz 

 birden fazla kayıt eklemek için ise adaptör altında farklı bir tanım kullanmak gerekecek split ile bölüp forEach ile kullanmak veya addMany ile daha kolay bir biçimde yapabiliriz

addContact: contactAdaptor.addMany,

entitiyp adaptor kullandığımız için selectoru biraz daha farklı yazacağız

export const contactSelectors = contactAdaptor.getSelectors(state => state.contacts)

ile export ettik ve uselector ile kulandık 
const contacts = useSelector(contactSelectors.selectEntities)
burada selectEntities dışında bir çok hazır selector var all ve ya by id ile de alabilrdik selectAll dediğimizde bize hepkullandığımız gibi bir arrray prepare edip hazırlıyor

selectTotal içerisinde ise nek dar kayıt varsa o kadar number olarak dönüyor 

reducers:{
        addContact: contactAdaptor.addOne,
        deleteContact: contactAdaptor.removeOne,
    }
    removeone ile silme işlemi yapacağız 

    removeAllContacts: contactAdaptor.removeAll,
    ile ise hepsini sildik onclicke verdik 

ardından router ile her id ye bir edit sayfası oluşturduk 


edit için gelen id yi alıp o id ile inputu doldurtup veriyi editleyeceğiz 


edit ve edit form ile edit işlemlerini tamamladık 
burada dikkat edilecek tek şey edit yaparken update i çağırdık 
  reducers:{
        addContact: contactAdaptor.addOne,
        deleteContact: contactAdaptor.removeOne,
        removeAllContacts: contactAdaptor.removeAll,
        updateContact: contactAdaptor.updateOne,
    }
})
ve bu update i kullanırken 

 dispatch(updateContact({
            id: contact.id,
            changes:{
                name,
                phone_number
            }
        }))
changes altında bir propda update edilecek kısmı geçmemiz gerekti 




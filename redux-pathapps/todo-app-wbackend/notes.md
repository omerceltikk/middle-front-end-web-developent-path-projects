backend le veri çekerken actionlarla pi arasında bir middleware e ihtiyacımız var
çünkü api call ile actions aynı anda çalışmayabilir asenkron çalışmaları gerekebilir.
bize hazır verilen bir middleware olan thunk var 

api ile bağlantı için fetch ile veriyi çekmemiz lazım 
export const getTodosAsync = createAsyncThunk("todos/getTodosAsync", async () => {
    const res = await fetch("http//localhost:7000/todos");
    return await res.json();
})
bunu yaparken ise createAsyncThunk hookunu react reduz altında çağırıp kullanıyoruz 
ve burada fetch işlemini başlatıyoruz

ardından extraREducers olarak tanımladığımız alanda 
extraReducers: {
        [getTodosAsync.pending]: (state,action) => {
            state.isLoading =true;
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [getTodosAsync.rejected]: (state,action) => {
            state.isLoading = false;
            state.error = action.error.message;
        }
    }
    getTodosAsync ismini verdiğimiz yapının pdurumlarını tanımlıyoruz buna ekstra olarak initialSatate e loading ve error tanımı da yaptık 

    ardından todo listte bu useEffecti
     useEffect(() => {
        dispatch(getTodosAsync())
    }, [dispatch])

    çağırarak direkt yazdırdık 
    items içerisine ver i göndermemizi sağlayan yapı extraReducers dı
    yani extraReducers action payoad altına todos1 2 3 4 ü falan getirdi 
    ardında nloading i çağırdık ve loading yazdırdık farklı bir component olutorduk

    ***api den çektiğimiz verinin items içerisine yerleşebilmesinin nedeni items içerisinde obje tanımlıyor olmamız ve statik objeyi kaldırıp yerine yine json formatında bir ver igetiriyor olmamızdı.***

    şimdi girilen todoyu backende ekleyeceğiz 
    post isteği ile yapacağız ve post body de sadece title var 
    bunun için yine slice dosyasında asyncThunkı kulanacağız aslında pi dosyasını todoSlice da yazıyoruz sadece post olarak göndereceğiz 
    backend tarafında nanoid olduğu için prepare altındaki id tanımına ihtiyacımız kalmadı 
    bu nedenle addtodoyu tamamen kaldırdık 

    export const addTodoAsync = createAsyncThunk("todos/AddTodoAsync", async () => {
    const res = await axios.post("http://localhost:7000/todos", data);
    return res.data;
})
axios data işlemi

extra reducer işlemi
 // add todo 
        [addTodoAsync.fulfilled]: (state,action) => {
            state.items.push(action.payload);
        },
    }

    buradaki export ettiğimiz addTodoAsync işlemini fullfilled olunca array içerisine yazıyor 
      const handleSubmit = async (e) => {
        if(!title) return;
        e.preventDefault();

       await dispatch(addTodoAsync({ title}))
        setTitle("");
    }form.js deki fonksiyonu da async olarak güncelledil

    şimdi ise toggle işlemini backende geçireceğiz completed durumunu
    bunun için id ve completed durumuna ihtiyacımız var 
    export const toggleTodoAsync = createAsyncThunk("todos/toggleAsyncThunk", async ({id,data}) => {
    const res = await axios.patch(`http://localhost:7000/todos${id}`, data);
    return res.data;
})
bir tanım yaptık 
    toggle reducer ını açıklama satırına aldık ve extra reducersda

[toggleTodoAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
        }
    }
    şimdilik sadece logluyoruz 

    ardından checkbox inputuna 
    
    <input className="toggle" 
                type="checkbox" 
                onChange={()=> handleToggle(item.id, !item.completed)} 
                checked={item.completed}/>
                hadnle toggle ı yaptık
                
                burda handle toggle a item id si ve completed durmunun tam tersini gönderiyoruz çünkü basındca değişecek 

               
                const handleToggle = async (id,completed) => {
        await dispatch(toggleTodoAsync({id,data:{completed}}))
    }
    ardından bu fonksiyonda bu verileri id ve completed olark yazıyoruz toggletodoAsync de data tanımladığımız için datanın içerisine completed durumunu obje olarak gönderiyoruz 

    [toggleTodoAsync.fulfilled]: (state, action) => {
            const {id ,completed} = action.payload
            const index = state.items.findIndex(item => item.id == id);
            state.items[index].completed = completed;
        }
    }
    şimdi burada ilk olarak todolistten toggleTodoAsync altında gelen veriyi karşıladık  

 const {id ,completed} = action.payload

 ardından bu verideki id action altında gelen id deki elemanın itemsdaki yerini bulmak 
 bunu ise state altında items içindeki elemanları findIndex ile bulancağız buradan bize bir item gelecek ve bunun id si action altında gelen id ye eşitse find çalışacak 

const index = state.items.findIndex(item => item.id == id);

 findIndex methodu belirli bir koşulu sağlama şeklinde çalışır bu bir elemana bir idye eşit olabilir veya belirlenen bir değerin büyüklük küçüklük eşitliği olarak da dönebilir 
 dönen eleman koşulu sağlayan ilk elemandır

state.items[index].completed = completed;
sonra da bu item ın completed durumunu backend de değiştiriyoruz 

şimdi de silme işlemini gerçekleştireceğiz

bunun için ilk oolarak delete i tanımladık 

export const deleteTodoAsync = createAsyncThunk("todos/deleteTodoAsync", async (id) => {
    const res = await axios.delete(`http://localhost:7000/todos/${id}`);
    return id;
})
ve burada id return ettik yani silinen item ın idsini return ettik ve bu idli elemanı bu fonksiyon backendden siliyor
bunu arayüzden de sileceğiz 

arayüzde sadece     
const handleDestroy = async (id) => {
        if(window.confirm("Are You Sure?")){
           await dispatch(deleteTodoAsync(id))
        }
    }
dispacthin içerisine deleteTodoAsync i yazdık 
id gönderiyorduk orada zaten 

şimdi ise arayüzden bir önceki gibi filter işlemi yapabiliriz yani bu idli elemanı gösterme filtrele ve diğerlerini göster diyebiliriz 

 [deleteTodoAsync.fulfilled]: (state, action) => {
            const {id} = action.payload;
            const filtered = state.items.filter((item) => item.id !== id);
            state.items =filtered;
        }

        yani normal destroydakinin aynısını yaptık 

        bir diğer yöntemde ise findIndex ile bu id li item ı array de bulur ve arrayden çıkarırız



[deleteTodoAsync.fulfilled]: (state, action) => {
            const {id} = action.payload;
            const index = state.items.findIndex((item) => item.id !== id);
            state.items.splice(index,1)
        }

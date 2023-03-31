ilk olarka tasarımı geçirdik 

ardından redux klasörü altında bir store tanımladık 
bu store u index js dosyasında provider altında store propu olarak geçtik

import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todos/todosSlice";

export const store = configureStore({
    reducer:{
        todos: todosSlice,
    },
});
store a todos slice ı tanımladık

todosSlcie içinde ise güncelleyeceğimiz todos stateini verdik 
import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
    name: todos,
    initialState: {
        items:[],
    },
    reducers:{},
})
export default todosSlice.reducer;
ve bunu items adı altında bir arrayde tuttuk
ardından bunu todo list adlı component altında çağırdık çünkü listelerimiz orda 
import { useSelector } from 'react-redux'

function ToDoList() {
const items = useSelector(state => state.todos.items); 
şeklinde çağırdık 
bu arkadaş statelerin altında name i todos olan state i bulup içersindeki items arrayini alıyor


     {
        items.map((item) => (
            <li key={item.id}>
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label>{item.title}</label>
                <button className="destroy"></button>
            </div>
        </li>
        ))
     }

     ardından b şekilde map ile dönerek state içindeki verilerle yapımızı kurduk

     **store dizini sadece reducerlarımızı tanımladığımız alan alsında 

     şimdi ise input ile todo ekleyeceğiz 

     yeni todo eklemek için ilk olarak bir reducer altında action ve state tanımlarını yaptık bunlar react redux ile gelen hooklar 

     reducers:{
        addNewTodo:(state,action) => {
            state.items.push(action.payload)
        }
    },
    ardından formun submit eileceği form.js e geçtik ve

    import React, { useState } from 'react';
import useDispatch from "react-redux";
import { addNewTodo } from '../redux/todos/todosSlice';

function Form() {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch({id:"3", title , completed:false})
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                 onChange={(e) => setTitle(e.target.value)} 
                 value={title}
                 className="new-todo" 
                 placeholder="What needs to be done?" 
                 autoFocus />
            </form>
        </div>
    )
}

export default Form
burada usedispatch i kullandık buunla formun handleSbmitine yazdık form submit edildiğinde set olan title ı alıp bize yeni bir obje eklemesini söyledik
ve nanoid yi import ettik 
nanoid ile uniq id oluşturuyoruz 

completed durumunu set etmek için bir tane daha reducer tanımladık
bu reducer da 
 toggle:(state,action) => {
            const {id} = action.payload;
            const item = state.items.find((item) => item.id === id);
            item.completed = !item.completed;
        }
    },
    ilk olarak addNew Todo dan gelen id yi çektik 
    ardından item find ile bu idli item ı bulduk
    ardından completed i toggladık 
    bu toggle işlemini kullancak olan ibputa götürdük yani todolist.js içerisindeki inputa 
    burada yine usedispatch import ettik 
    ve inputun içeisine

    <input className="toggle" 
                type="checkbox" 
                onChange={()=> dispatch(toggle({id: item.id}))} 
                checked={item.completed}/>

                onchange ine dispatch altınadaki toggle reducerını erdik ve toggle a item .id yi gönderdik ki hangi id ile iletişim kuracağını bilsin 
                checked a item.completed ı verince de eğer completed sa tik olduğunu hatırlamasını sağladık 
                const {id} = action.payload;
                hangi idyi alacağanı burada tanımlamışız action altında paylaad ile glecek olan idyi alacak 

bir item ı silmek için ise 
 destroy: (state, action) => {
            const id = action.payload;
            const filtered = state.items.filter((item) => item.id !== id);
            state.items = filtered;
        }

        <button className="destroy" onClick={() => dispatch(destroy(item.id))}></button>
        actionun içerisine silinmek istenen item ın id si gelecek 
        bu idli eleman hariç hepsini toplamak istemelik bir filtre 
        yani aslında arrayden gönderilen id li item hariç hepsini göster diyoruz .

        şimdi ise content footer ı yapıyoruz ilk olarak iltems left i yaptık bunun için use Selector ile ilk olarak item ı dahil ettik bununla yani item verilerini alıyoruz 

          const items = useSelector(state => state.todos.items);


  const itemsLeft = items.filter(item => !item.completed).length

ve bunula bir filtreleme işlemi yaptık bu filtrede eğer completed ise listeden attık ve gerisinin lengthi ni aldık 
ardından 


  initialState: {
        items:[
            {
                id:1,
                title: "Learn React",
                completed: true
            },
            {
                id:2,
                title: "su iç",
                completed: false
            }
        ],
        activeFilter : "all",
    },

content footer
  const activeFilter = useSelector(state => state.todos.activeFilter);
initial state e bir activeFilter ekledik ve varsayılanı all yaptık 
bunların classlarını içlerine göre düzenledik.


    <ul className="filters">
        <li>
            <a href="#/" className={activeFilter ==="all" ? selected : ""} >All</a>
        </li>
        <li>
            <a href="#/" className={activeFilter ==="Active" ? selected : ""}>Active</a>
        </li>
        <li>
            <a href="#/" className={activeFilter ==="Completed" ? selected : ""}>Completed</a>
        </li>
    </ul>

    şimdi ise a taglerine basıldığında set edeceğiz 
    bunun için reducerlara state i güncelleyeceğimiz bir changeActiveFilter verdik.

    ve burada useDispatch ile activefilterı aldıktan sonra 

    şwklinde bir onclick ile tamamladık
     <ul className="filters">
        <li>
            <a href="#/" onClick={() => dispatch(changeActiveFilter("all"))} className={activeFilter ==="all" ? selected : ""} >All</a>
        </li>
        <li>
            <a href="#/" onClick={() => dispatch(changeActiveFilter("active"))} className={activeFilter ==="Active" ? selected : ""}>Active</a>
        </li>
        <li>
            <a href="#/" onClick={() => dispatch(changeActiveFilter("completed"))} className={activeFilter ==="Completed" ? selected : ""}>Completed</a>
        </li>
    </ul>

    burada artık buton classları asıldığına göredeğişiyor ve bize active all ve completed ları gönderiyor kendi stateini güncelliyor 
    biz bunu todo larda kulancağız
    bunun için todo liste gittik ve 
        const activeFilter = useSelector(state => state.todos.activeFilter);

active filterı aldık 
ardından bir array tanımladık 

let filtered = [];

ve bu array a items ı verdik aşağıda 
filtered = items;
    if(activeFilter !== "all"){
        filtered = items.filter((todo) => activeFilter === "active" 
        ? todo.completed === false && todo 
        : todo.completed ===true && todo)
    } 
    ar dında eğer acrive filter a gelen değer all değilse bir filtered arrayi 
    items.filter a bir todo gelir ce bu todo active eşitse completed ı false olan todoları göster değilse yani completedsa completedı true olan todoları göster dedik.
    filtered a items vermemizin sebebi ise all olarak hepsini görmekti .

    selectors useSelector ile çektiğimiz bilgileri bu projede 2 componentte kullandık ve selectorlerde herhangi bir data erişimi değiştiğinde bu selectorlerde de değiştirmemiz gerekecek
    onun yerine slice tanımı yaparken de bu selector tanımını yapabiliriz bunuda 

    export const selectTodos = (state) => state.todos.items;
    slice dosyasında tanımlar
      const activeFilter = useSelector(selectTodos);

şeklinde import ederiz
ayrıca yapmış olduğumuz item all active completed filter yapısını da bu slice içersinde tanımlayarak defalarca kullanabiliriz.

 filtered = items;
    if(activeFilter !== "all"){
        filtered = items.filter((todo) => activeFilter === "active" 
        ? todo.completed === false && todo 
        : todo.completed ===true && todo)
    }  
    bu yapıyı slice içerisinde 

    export const selectFilteredTodos = (state) => {
    if (state.todos.activeFilter === "all") {
        return state.todos.items;
    } 
    return state.todos.items.filter((todo) => 
    state.todos.activeFilter === "active" ? todo.completed === false : todo.completed === true 
    )
}
şeklinde bir tanımla hiç oraya taşımadan kurabiliriz

bu durumda todo listen çoğu şeyi silip sadece
const filteredTodos = useSelector(selectFilteredTodos())
ile çağırdık ve bunu mapledik


prepare 
bir state güncellenmeden önce her defsında id completed vb göndermek yerine bunu slice içerisinde de set edebiliriz 

 reducers: {
        addNewTodo: {
            reducer: (state, action) => {
                state.items.push(action.payload);
                prepare: ({ title }) => {
                    return {
                        payload: {
                            id: nanoid(),
                            completed: false,
                            title,
                        }
                    }
                }
            }
        },

prepare altında payloadı set ederek ve burada id ve completed tanımlarını vererek artık hangi componentte olursa olsun id ve completed set etmeden halledebiliriz addNewtodo da gönderdiğimiz item objesini burada da karşıladık 

ve form kısmındaki gönderdiğimiz durumu 2. sine döndü 
        dispatch(addNewTodo({id:nanoid(), title , completed:false}))

        dispatch(addNewTodo({ title}))

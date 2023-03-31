npm i @reduxjs/toolkit
npm i react-redux
ile bağımlılıklarımızı kurduk ve redux dosyası altında bir store.js tanımladık
context api da yaptığımız gibi state yönetim contextlerimizi tanmılayıp sonra onları react da sarmalıyorduk benzerini yapacağız 
birden fazla redux tanımımız olacak ör user için ayrı sitenin dil tanımını çektiğimiz ayrı bir redux tanımı vs

import {configureStore} from "@redux/toolkit";

export const store = configureStore({
    reducer: {},
})

store tanımı yaptık 
bunu bir obje ile reducer tanımlayarak yaptık fakat henüz bir reducerımız yok onu ileride tanmılayacağız
şimdi bu store ile en dıştaki componentimizi sarmalamamız lazım
bunu index.js de sarmayalacağız

import { store } from './redux/store';
import {Provider} from "react-redux";
bu şekilde import ettikten sonra react-redux altında birde provider import ediyoruz
bu provider ın görevi reduxta yaptıklarımızı react componentlerine bağlamamızı sağlar provider ise altındaki sarmalanan componentlerdeki dataların tamamını paslamak göndermek


  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>

  şeklinde tanımladık
  şimdi bir state tanımlayıp bunu ekranda gösterim manipüle edeceğiz 
  ilk olarak counter dizini ve counterSlice.js  i oluşturduk 
  slice kapaca tanımlarsak uygulama bir bina ise slicelar bir parçası
  ilk olarak slice ı tanımlamak için createSlice ı içeri aldık
  sliceın içerisinde bu stateimizin içersindeki bütün verilerin duracağı key e bir isim vereceğiz ve sonra bir initial state vereceğiz 

  import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value:0
    },
    reducers:{

    },
})

export default counterSlice.reducer;

ilk olarak create Slice ile slice ı oluşturduk 
ardından slice ın içerisine name ve bir initalState verdik counter olduğu için initialState 0 
reducers ı boş bıraktık şimdilik çünkü ekrana sadece değeri yazdıracağız update etmeyeceğiz 
ardından bu propleları export ederek store.js e bu verileri aktardık 

import {configureStore} from "@redux/toolkit";
import {counterReducer} from "./counter/counterSlice";
export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
})

aktardığımız bu verileri de store altındaki reducer a gönderdik.
ardından counter componentimizi tanımladık ve içerisine 1 yazdık 

import React from 'react'
import { useSelector } from 'react-redux'

function counter() {
    const countValue = useSelector((state) => state.counter.value);
  return (
    <div><h1>{countValue}</h1></div>
  )
}

export default counter

burada tanımladığımız countValue değişkenine yazdığımız callback te state değiğşkeni altında counter altında value dediğimiz durum aslında 

import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value:0
    },
    reducers:{

    },
})

export default counterSlice.reducer;

counter slicedaki value değeri 
bu şu şekilde ilerlemiş oluyor callback parametresi ilk olarak store verisini döndürüyor orada counterolarak adlandırdığımız componente gidiyor ve o slice componenti altındaki value değişkenini alabiliyoruz. 
ve bu value değişkeninini manipüle edebilecğeiz
store altında çağırdığımız değişkenler store.js altında geliyor ve burada verielri topalya bliriz ör users altında başka bir değer de dönebilirdik.


export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value:0
    },
    reducers:{
        increment: (state) => {
            state.value += 1;
        }
    },
});
burada artık value yi manipüle edeceğiz burada aldığımız state parametresi yine name ve value yi döner reducers altında bu parametre girdisi ise valueyi +1 artıracak şekilde manipüle ediyoruz.
bunu initalize etmek için 
import { useSelector,useDispatch } from 'react-redux'
il olarak useDiscpatch hookunu alıyoruz 

import React from 'react'
import { useSelector,useDispatch } from 'react-redux'


function Counter() {
    const countValue = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
  return (
    <div>
        <h1>
        {countValue}
        </h1>
        <button>decrement</button>
        <button onClick={() => dispatch()}>increment</button>
        </div>
  )
}

export default Counter
ve bu hooku dispacth olarak tanımladık 
ardından buton onclickine verdik 
ardından bu tanımladığımız fonksiyonu yani action ı export etmemiz gerkliydi 
bunu ise tekrar slice da export edeceğiz 

export const {incement} = counterSlice.actions;
şeklinde export ettik

ardından bu incrementi import edip 
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { incement } from '../redux/counter/counterSlice';


function Counter() {
    const countValue = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
  return (
    <div>
        <h1>
        {countValue}
        </h1>
        <button>decrement</button>
        <button onClick={() => dispatch(incement())}>increment</button>
        </div>
  )
}

export default Counter;
dispatch içine verdik 

şimdi ise bir input alıp bu input değeri kadar rakamı artırmak istiyoruz 
bunun için ilk oalrak input ve buton tanımladık
ve slice fonksiyonumuza inputdeğeri kadar artırma fonksiyonunu verdik 
burada action altındaki payload kavramları geldi 
bu kavramlar bize state üzeinde ne eklemek istiyorsak o değerleri almamızı sağlayan yapılar 
bunları kullanmak için ise 
counter.js de
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { increment,decrement,incrementByAmount } from '../redux/counter/counterSlice';
import { useState } from 'react';


function Counter() {
    const countValue = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(5)
  return (
    <div>
        <h1>
        {countValue}
        </h1>
        <button onClick={() => dispatch(decrement())}>decrement</button>
        <button onClick={() => dispatch(increment())}>increment</button>

        <br></br>

        <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number"/>
        <button onClick={() => dispatch(incrementByAmount(amount))}>Increment by Amount</button>
        </div>
  )
}

export default Counter;

bir state tanımladık 
bu state i input valuesi ile güncelledik 
sonra bu valueyi buttonda dispatch altında tanımladığımız diğer fonksiyona parametre olarak verdik
bu parametreyi action altındaki payload aldı ve fonksiyonda kullanmamızı sağladı.

import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value:0
    },
    reducers:{
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state,action) => {
            state.value += Number(action.payload);
        }
    },
});

export const {increment, decrement,incrementByAmount} = counterSlice.actions;
export default counterSlice.reducer;


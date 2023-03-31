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
import { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../Context/CoinContext'
const Home = () => {

  const {allCoin,currency} =useContext(CoinContext)
  const [displayCoin,setDisplayCoin]=useState([])
  const [input,setInput]=useState('')

  const inputHandler=(e)=>{
    setInput(e.target.value)
    if (e.target.value===""){
      setDisplayCoin(allCoin)
    }
  }

  const searchHandler=async(e)=>{
    e.preventDefault();
   const coins= await allCoin.filter((item)=>{
      return item.name.toLowerCase().includes(input.toLocaleLowerCase())
    })
    setDisplayCoin(coins)
  }
  useEffect(()=>{
    setDisplayCoin(allCoin)
  },[allCoin])
  return (
    <div className='home-menu'>
      <div className="sub-menu">
        <h1>Largest <br/>Crypto Marketplace</h1>
        <p>Welcome to the world's largest Crypto currency
            marketplace.Sign up to explore more about cryptos
        </p>
        <form onSubmit={searchHandler}>
            <input type="text" onChange={inputHandler}  list='coinlist'  value={input} placeholder='Search crypto...' required/>

            <datalist id='coinlist'>
                {allCoin.map((item,index)=>(<option key={index} value={item.name}/>))}
            </datalist>

            <button type='submit'>Search</button>
        </form>
      </div>
      <div className="table">
        <div className="layout">
            <p>#</p>
            <p>Coins</p>
            <p>Price</p>
            <p style={{textAlign:"center"}}>24H Change</p>
            {/* <p className='market'>Market Cap</p> */}
        </div>
        {
          displayCoin.slice(0,10).map((item,index)=>(
            <div className="layout" key={index}> 
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name +" - "+item.symbol}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h>0?"green":"red"}>
                {Math.floor(item.price_change_percentage_24h*100)/100}</p>
              {/* <p>{currency.symbol}{item.market_cap.toLocaleString()}</p> */}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home

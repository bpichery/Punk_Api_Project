import React,{useState, useEffect} from 'react'
import '../App.css'
import axios from 'axios'
const Products = () => {
  const [loading, setLoading] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const [data, setData]= useState([]);
  const [selectedItem, setSelectedItem]= useState([]);
    useEffect(()=>{
    setLoading(true)
    axios({
      method: "GET",
      url: "https://api.punkapi.com/v2/beers",
    })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className='products-container'>
      {loading && (
        <div>
          {" "}
          <h1>Loading...</h1>
        </div>
      )}
       {data.map((post)=> ( 
          <div key={post.id} className="card">
           <div><img onClick={()=> {setShowPop(true); setSelectedItem(post)}} src={post.image_url} alt="#"/></div>
           <div className="card-description">
               <p className='beer'>{post.name}</p>
               <p className='details' onClick={()=> {setShowPop(true); setSelectedItem(post)}}>Details</p>
           </div>
          </div>
      ))}
      {showPop && (
      <div className='modalBackground'>
            <div className='modalContainer'>
                <div className='wrapperBt'>
                  <button  onClick={()=> {setShowPop(false)}}> X </button>
                </div>
                <div className='modalTitle'>{selectedItem.name}</div>
                <div className='modalSubtitle'>{selectedItem.tagline}</div>
                <div className='modalBody'>Tips: {selectedItem.brewers_tips}</div>
                <div className='modalFooter'>Description: {selectedItem.description}</div>
            </div>
        </div>
      )}
    </div>
  )
}

export default Products
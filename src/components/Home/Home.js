import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import User from "../User/User";
import Query from "../Query/Query" 
import "./Home.css";

export default function Home() {
  /* declare States */
  const [allUsers, setAllUsers] = useState([]);
  const [result, setResult] = useState([]);
  const [index , setIndex] = useState(1);
  const [query, setQuery] = useState([{
    index : 0,
    key : '',
    data : '',
    operator : ''
  }]);

  /* Get All Users */
  useEffect(()=>{
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials' : 'true'}
  };
    fetch('https://code95-backend.herokuapp.com/api/users',requestOptions)
    .then(res => res.json())
    .then(
        (result)=>{
            setAllUsers(result);
            setResult(result);
        },
        (error)=>{
            console.error(error);
        }
    )
  },[])

  /* Button & Input Handler */
  const handleAllUsers = ()=>{
    setResult(allUsers);
  }
  const handleInput = (index,e)=>{
    let q = query.filter( q=> q.index === index);
    let i = query.findIndex(q=> q.index === index)
    q[0][e.target.name] = e.target.value ;
    setQuery([
      ...query.slice(0,i),
      Object.assign({},query[i],q)[0],
      ...query.slice(i+1)
    ])
  }

  const handleAdd = (e) => {
    setQuery([...query,{
      index : index,
      key : '',
      data : '',
      operator : '',
      logicOpe : 'and'
    }])
    setIndex(index+1);
  };
  
  const handleDelete = (index , e) => {
    setQuery(query.filter((q)=>{
      return q.index !== index
    }))
  };

  const handleSearch = (e) => {
    if(query[0].key ==='')
    {
      alert('Please Select Key');
    }
    else if(query[0].operator === '')
    {
      alert('Please Select operator');
    }
    else if(query[0].data === '')
    {
      alert('Please Enter Data');
    }
    else{
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials' : 'true'},
        body: JSON.stringify(query)
    };
    fetch('https://code95-backend.herokuapp.com/api/users/query', requestOptions)
    .then(res => res.json())
    .then(
        (result)=>{

            setResult(result);
        },
        (error)=>{
            console.error(error);
        }
    )
    }
      
  };
  return (
    <>
      <div className="grid grid-rows-1 grid-flow-col gap-4 my-10">
        <div>
          <h1 className="font-black"> Users Search </h1>
          {/* record Numbers */}
          <p className="text-xs inline-block align-text-bottom font-bold">
            <FaUsers /> {result.length}
          </p>
        </div>
        <div className="m-auto">
          <button className="btn-link mr-8"> <Link to="/graph"> Graphical Reports </Link> </button>
          <button className="btn-add mr-8" onClick={handleAdd}> Add Query </button>
          <button className="btn-search mr-8" onClick={handleSearch}> Search </button>
          <button className="btn-all" onClick={handleAllUsers}> All Users </button>
        </div>
      </div>
      <div id='queries' className='mb-8 grid grid-cols-1'>
        
        {query.map((query , index)=>{
          return(
            <Query delete={handleDelete} index={query.index} key={index} inputHandler={handleInput} data={query}/>
          )
        })}
      </div>
      
      <div className='grid grid-cols-4 gap-4'>
        {result ? (result.map((user , index)=>{
          return(
          <User className='w-1/4' user={user} key={index}/>
          );}
          )):(<h2>Loading ...</h2>)}
      </div>
    
      </>
  );
}

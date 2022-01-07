import axios from "axios";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Routing from "./Routing";
export default function Slidebar() {  
  const [fetchField, setFetchField]=useState();   // data access in webpage
  let UrlHttp ="http://127.0.0.1:8000/api";
  const url=window.location.hostname;
  useEffect(()=>{ 
  getData(); 
  },[]);
 const getData =()=>{
   axios.get(`${UrlHttp}/sidebar`).then(res=>{
     if(res.data.status === 200){
      for (let index = 0; index < res.data.data.length; index++) {
        if(res.data.data[index].store_url == url){
          setFetchField(res.data.data[index]);  
        }   
       }               
     }
   });   
 }
    
    
          
    return (
      <div className="content-container">
      <div id="left-panel" className="left-nav-wrapper">
          <ul className="navigation-panel">                   
          
          <div>
            <li><Link to ="/profile">{fetchField?fetchField.admin_profile:"Profile Information"}</Link></li>        
            <li><Link to ="/manage-address">{fetchField?fetchField.admin_address:"Manage Address"}</Link></li>        
            <li><Link to ="/gift-cards">{fetchField?fetchField.admin_gift:"Gift Cards"}</Link></li>        
            <li><Link to ="/coupons">{fetchField?fetchField.admin_coupons:"My Coupons"}</Link></li>                         
          </div>                   
          </ul>         
      </div>
      <div className="right-content-wrapper container">
        <Routing/>             
      </div>
  </div>
    );
  }
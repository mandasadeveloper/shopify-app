import axios from "axios";
import { useState,useEffect } from "react";
const Profile_page = ({UrlHttp})=>{
  const [edit, setEdit] = useState(false);
  const [getCustomer, setgetCustomer] = useState('')
  const [Customer, setCustomer] = useState('')
  const [fetchField, setFetchField]=useState([]);   // data access in webpage
  const [fetchlabel, setFetchLabel]=useState([]);   // label access in webpage
  const [Fname, setFname]=useState([]);
  const [Lname, setLname]=useState([]);
  const url=window.location.hostname;
  const [fields, setData] = useState([]);
  const onchangeInput = (e) =>{       
    const {name, value}=e.target;  
    setData((preValue)=>{   
      return{
        ...preValue,
        [name]:value,
      }
    })
  }

const handleSubmit= async (e)=>{
  e.preventDefault();
  const data = {
      shop_url:url,
      fname:Fname,
      lname:Lname,        
      fields:fields,    
  }
axios.post(`${UrlHttp}/profile`, data).then(res =>{
     if(res.data.status === 200){
         alert(res.data.message);
        setFname('');
        setLname('');
         setData("");

     }
 });
}   

async function getData() {
  const response = await fetch("https://my-public-app.myshopify.com/admin/customers/5567851102371.json");
  const data = await response.json();
  setCustomer(data.customer) ;
}
  
const getCustomers = () =>{
  axios.get(`${UrlHttp}/profile-data`).then(res=>{
    if(res.data.status === 200){
      for (let index = 0; index < res.data.profile.length; index++) {
        if(res.data.profile[index].shop_url == url){
          setgetCustomer(res.data.profile[index]);  
        }   
       }      
    }
  });
}

 useEffect(()=>{
  getData();
  getCustomers();
  axios.get(`${UrlHttp}/label-setting`).then(res=>{
    if(res.data.status === 200){
     for (let index = 0; index < res.data.data.length; index++) {
      if(res.data.data[index].store_url == url){
      setFetchLabel(res.data.data[index]);  
      }   
     }     
    }
  });
  axios.get(`${UrlHttp}/demo`).then(res=>{
    if(res.data.status === 200){
      setFetchField(res.data.filed);          
    }
  }); 
 },[]);

 var display=fetchField.map((item)=>{  
    if(item.store_url== url){     
          return (                         
                <div className="col-75">
                <label htmlFor={item.id}>{item.label}</label>
                <input type={item.field} 
                 id={item.id}
                 name={`${item.label}${item.id}`}                                                         
                 onChange={(val)=>{onchangeInput(val)}}                    
                 value={fields[`${item.label}${item.id}`]}            
                 placeholder={`Enter ${item.label}`}/>                       
                </div>     
          )
    }
 });  
 return(
<div>
<h3 className="user-info-edit">Personal Information <button className="button-edit" onClick={()=>setEdit(!edit)}>{edit?"Cancel":"Edit"}</button></h3>
    <form onSubmit = {handleSubmit}>
       <div className="row">     
        <div className="col-75">
      <label htmlFor="fname">{fetchlabel?fetchlabel.fname:"First Name"}</label>
        <input type="text" id="fname" name="fname" value={Fname} onChange={(e)=>setFname(e.target.value)} placeholder={getCustomer?getCustomer.fname:Customer.first_name}/>
      </div> 
      <div className="col-75">
      <label htmlFor="lname">{fetchlabel?fetchlabel.lname:"Lname Name"}</label>
        <input type="text" id="lname" name="lname" value={Lname} onChange={(e)=>setLname(e.target.value)} placeholder={getCustomer?getCustomer.lname:Customer.last_name}/>
      </div>          
      <div className="col-75">
      <label htmlFor="email">{fetchlabel?fetchlabel.email:"Email"}</label>
        <input disabled type="email" id="email" name="email" placeholder={Customer.email}/>
      </div>     
      {display}       
    </div>      
    { edit?
      <div>   
        <input type="submit" value="Save"/>
      </div>
      :null}
  </form>  
</div>
 )
}
export default Profile_page
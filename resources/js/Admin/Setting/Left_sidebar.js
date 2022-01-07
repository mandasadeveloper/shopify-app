import { Button, FormLayout,TextField,Form,Heading, Card } from "@shopify/polaris";
import axios from "axios";
import {useEffect, useState} from "react";
const LeftSidebar = ({url}) =>{
    const store_url = shopDomain;
    const [profile, setProfile] = useState('')
    const [address, setAddress] = useState('')
    const [gift, setGift] = useState('')
    const [coupons, setCoupons] = useState('')
 
    const [fetchField, setFetchField]=useState();   // data access in webpage
    useEffect(()=>{
    getData();
    },[]);
    const getData =()=>{
     axios.get(`${url}/sidebar`).then(res=>{
       if(res.data.status === 200){
        for (let index = 0; index < res.data.data.length; index++) {
          if(res.data.data[index].store_url == store_url){
            setFetchField(res.data.data[index]);  
          }   
         }    
       }
     });  
    }
    
    const Post = (path,id,data)=>{
        axios.post(`${url}/${path}-update/${id}`, data).then(res =>{
          if(res.data.status === 200){           
            setProfile("")
            setAddress("")
            setGift("")
            setCoupons("")
           getData();
          }
      });
    }
    
    // left sidebar navigation update
    const profile_Update = (e,id) =>{  //profile update
    e.preventDefault();
    const data = { profile:profile}
    Post("profile",id,data);
    }
    
    const address_Update = (e,id) =>{  //address update
    e.preventDefault();
    const data = { address:address}
    Post("address",id,data);
    }
    
    const gift_Update = (e,id) =>{  //gift update
    e.preventDefault();
    const data = {gift:gift}
    Post("gift",id,data);
    }
    
    const coupons_Update = (e,id) =>{ //coupons update
    e.preventDefault();
    const data = {coupons:coupons}
    Post("coupons",id,data);
    }
            const Insert = (e) =>{
              e.preventDefault();
              const data = {   
                profile:profile,
                address:address, 
                gift:gift,
                coupons:coupons,
                store_url:store_url                 
              }        
              axios.post(`${url}/insert-sidebar`, data).then(res =>{
                     if(res.data.status === 200){
                      setProfile("")
                      setAddress("")
                      setGift("")
                      setCoupons("")
                      getData();                   
                     }
                 });
              }
  
  
    return(
       <Card title = "Left Sidebar">  
       <Card.Section>           
       <Form>                                    
                    <TextField                                                                 
                        label={`Defaults to: the sidebar name is ${fetchField?fetchField.admin_profile:"Profile Information"}.`}
                        name="profile"
                        type="text"   
                        placeholder={`Defaults to: the sidebar name is ${fetchField?fetchField.admin_profile:"Profile Information"}.`}               
                        value={profile}
                        onChange = {(e)=>setProfile(e)}
                        connectedRight={<Button submit onClick={fetchField?(e)=> profile_Update(e, fetchField.id):Insert}>Update</Button>}                       
                       />
                        </Form>
                        <Form>
                         <TextField                                      
                         label={`Defaults to: the sidebar name is ${fetchField?fetchField.admin_address:"Management Address"}.`}
                         name="address"
                         type="text"
                         placeholder={`Defaults to: the sidebar name is ${fetchField?fetchField.admin_address:"Management Address"}.`}               
                        value={address}
                        onChange = {(value)=>setAddress(value)}
                         connectedRight={<Button submit onClick={fetchField?(e)=> address_Update(e, fetchField.id):Insert}>Update</Button>   }                                                  
                         />  
                          </Form>
                          <Form>                                                               
                    <TextField                                                                 
                         label={`Defaults to: the sidebar name is ${fetchField?fetchField.admin_gift:"Gift Cards"}.`}
                         name="gift"
                         type="text"
                         placeholder={`Defaults to: the sidebar name is ${fetchField?fetchField.admin_gift:"Gift Cards"}.`}               
                         value={gift}
                         onChange = {(value)=>setGift(value)}
                         connectedRight={<Button submit onClick={fetchField?(e)=> gift_Update(e, fetchField.id):Insert}>Update</Button>   }                       
                       />
                        </Form>
                        <Form>
                         <TextField                                      
                         label={`Defaults to: the sidebar name is ${fetchField?fetchField.admin_coupons:"My Coupons"}.`}
                         name="coupons"
                         type="text"
                         placeholder={`Defaults to: the sidebar name is ${fetchField?fetchField.admin_coupons:"My Coupons"}.`}               
                         value={coupons}
                         onChange = {(value)=>setCoupons(value)}
                         connectedRight={<Button submit onClick={fetchField?(e)=> coupons_Update(e, fetchField.id):Insert}>Update</Button>   }                       
                         />                                                                                                                                                                              
            </Form>      
        </Card.Section>      
       </Card>
    )
}
export default LeftSidebar
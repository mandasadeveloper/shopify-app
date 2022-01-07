import { Button, FormLayout,TextField,Form,Heading, Card } from "@shopify/polaris";
import axios from "axios";
import {useEffect, useState} from "react";
const RightSide = ({url}) =>{
    const store_url = shopDomain;
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
 
    const [fetchField, setFetchField]=useState('');   // data access in webpage
    useEffect(()=>{
    getData();
    },[]);
    const getData =()=>{
     axios.get(`${url}/label-setting`).then(res=>{
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
            setFname("");
            setLname("");
            setEmail("");
           getData();
          }
      });
    }
    
    // left label navigation update
    const fname_Update = (e,id) =>{  //fname update
    e.preventDefault();
    const data = { fname:fname}
    Post("fname",id,data);
    }
    
    const lname_Update = (e,id) =>{  //lname update
    e.preventDefault();
    const data = { lname:lname}
    Post("lname",id,data);
    }
     
    const email_Update = (e,id) =>{ //email update
    e.preventDefault();
    const data = {email:email}
    Post("email",id,data);
    }
            const Insert = (e) =>{
              e.preventDefault();
              const data = {   
                fname:fname,
                lname:lname,                
                email:email,
                store_url:store_url                 
              }        
              axios.post(`${url}/insert-label`, data).then(res =>{
                     if(res.data.status === 200){   
                      setFname("");
                      setLname("");
                      setEmail("");                 
                      getData();
                     }
                 });
              }
  
    
    return(
       <Card title="Profile">  
       <Card.Section>      
       <Form>                                    
                    <TextField                                                                 
                        label={fetchField?fetchField.fname:"First Name"}
                        name="fname"
                        type="text"   
                        placeholder={`Defaults to:${fetchField?fetchField.fname:"First Name"}.`}               
                        value={fname}
                        onChange = {(value)=>setFname(value)}
                        connectedRight={<Button submit onClick={fetchField?(e)=>fname_Update(e,fetchField.id):Insert}>Update</Button>}                       
                       />
                        </Form>
                        <Form>
                         <TextField                                      
                         label={fetchField?fetchField.lname:"Last Name"}
                         name="lname"
                         type="text"
                         placeholder={`Defaults to:${fetchField?fetchField.lname:"Last Name"}.`}               
                        value={lname}
                        onChange = {(value)=>setLname(value)}
                         connectedRight={<Button submit onClick={fetchField?(e)=>lname_Update(e,fetchField.id):Insert}>Update</Button>   }                                                  
                         />  
                          </Form>
                        <Form>
                         <TextField                                      
                         label={fetchField?fetchField.email:"Email"}
                         name="email"
                         type="text"
                         placeholder={`Defaults to:${fetchField?fetchField.email:"Email"}.`}               
                         value={email}
                         onChange = {(value)=>setEmail(value)}
                         connectedRight={<Button submit onClick={fetchField?(e)=>email_Update(e,fetchField.id):Insert}>Update</Button>   }                       
                         />                                                                                                                                                                              
            </Form>                 
        </Card.Section>
       </Card>
    )
}
export default RightSide


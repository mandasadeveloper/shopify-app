
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Button, TextField } from "@shopify/polaris";
let UrlHttp ="http://127.0.0.1:8000/api";
export default function App() {
  const [users, setUsers] = useState([]);
  const [fields, setData] = useState([]); 
  // data access in webpage
  useEffect(()=>{
  getData();
  },[]);
 const getData =()=>{
   axios.get(`${UrlHttp}/demo`).then(res=>{
     if(res.data.status === 200){
      setUsers(res.data.filed);          
      console.log(res.data.filed);
     }
   });  
 }
 const fieldDelete= async (e, id)=>{     //delete filed
  e.preventDefault();
  axios.delete(`${UrlHttp}/delete/${id}`).then(res =>{
  getData();
  });
  }
  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(users);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setUsers(tempData);
  };
  const onchangeInput = (name,value) =>{           
    setData((preValue)=>{return{...preValue,[name]:value}})}
  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>    
          <Droppable droppableId="droppable-1">
            {(provider) => (
              <tbody
                className="text-capitalize"
                ref={provider.innerRef}
                {...provider.droppableProps}
              >
                {users?.map((user, index) => (
                  <Draggable
                    key={`${user.field}${user.id}`}
                    draggableId={`${user.field}${user.id}`}
                    index={index}
                  >
                    {(provider) => (
                      <tr {...provider.draggableProps} ref={provider.innerRef}{...provider.dragHandleProps}>                                                                                                             
                          <TextField                                                       
                          onChange={(val)=>{onchangeInput(`${user.label}${user.id}`,val)}}         
                          name={user.id}
                          value={fields[`${user.label}${user.id}`]}            
                          type={user.field} 
                          label={user.label}
                          placeholder={`Enter ${user.label}`}       
                          connectedRight={<Button onClick={(e)=> fieldDelete(e, user.id)}>Delete</Button>}     
                          />     
                      </tr>
                    )}
                  </Draggable>
                ))}                                 
                {provider.placeholder}
              </tbody>
            )}
          </Droppable>      
      </DragDropContext>
    </>
  );
}

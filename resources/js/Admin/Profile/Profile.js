import { Button, FormLayout,Page,TextField,Form, ButtonGroup,Select, Icon, DisplayText, Card, DescriptionList } from "@shopify/polaris";
import {useEffect,useState} from "react";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  MobileCancelMajor
} from '@shopify/polaris-icons'; 
const Profile = () => { 
  let UrlHttp ="http://127.0.0.1:8000/api";
  const store_url = "my-public-app.myshopify.com";
  const [state,setState]=useState({      
    label:"",
    field:"",
    });
const [profilefield, setProfileField] = useState([
  {id:1,label:"First Name"},
  {id:2,label:"Last Name"},
  {id:3,label:"Email"},
  {id:4,label:"Password"}
]);
const handleChange=(name,value)=>{   
setState((preValue)=>{return{...preValue,[name]:value,}})}

const [formValues, setFormValues] = useState([{}]); //hooks for increment and decrement 
function addFormFields(){setFormValues([...formValues,{}])} 
const removeFormFields = (i) => {
let newFormValues = [...formValues];
newFormValues.splice(i, 1);
setFormValues(newFormValues)
} 

//for add new filed and label
const fieldDelete= async (e, id)=>{     //delete filed
e.preventDefault();
axios.delete(`${UrlHttp}/delete/${id}`).then(res =>{
getData();
});
}
function addTextFields(e){                   //create new input filed
e.preventDefault();
if(state.field!="" && state.label!=""){
const dataField = {
field:state.field,
label:state.label,
store_url:store_url,
}
axios.post(`${UrlHttp}/field`, dataField).then(res =>{
if(res.data.status === 200){          
getData();
}
});
} 
}
const [fetchfield, setfetchfield] = useState([]); 
const handleDragEnd = (e) => {
  if (!e.destination) return;
  let tempData = Array.from(fetchfield);
  let [source_data] = tempData.splice(e.source.index, 1);
  tempData.splice(e.destination.index, 0, source_data);
  setfetchfield(tempData);
};
const drageElement = (e) => {
  if (!e.destination) return;
  let tempData = Array.from(profilefield);
  let [source_data] = tempData.splice(e.source.index, 1);
  tempData.splice(e.destination.index, 0, source_data);
  setProfileField(tempData);
};
 // data access in webpage
 useEffect(()=>{
 getData();
 },[]);
const getData =()=>{
  axios.get(`${UrlHttp}/demo`).then(res=>{
    if(res.data.status === 200){
      setfetchfield(res.data.filed);          
    }
  });  
}

const options = [
  {label: 'Input', value: 'text'},
  {label: 'Email', value: 'email'},
  {label: 'Date', value: 'date'},  
  {label: 'URL', value: 'url'},  
  {label: 'Textarea', value: 'textarea'},
];


return (
         <Page                                          
         title="Profile"      
         >                             
        <Form>
          <Card title="Profile Field">
          <Card.Section>                                                        
             <DragDropContext onDragEnd={drageElement}>    
          <Droppable droppableId="droppable-1">
            {(provider) => (              
              <tbody
                className="text-capitalize"
                ref={provider.innerRef}
                {...provider.droppableProps}
              >                        
                {profilefield?.map((user, index) => (
                  <Draggable
                    key={`${user.label}${user.id}`}
                    draggableId={`${user.label}${user.id}`}
                    index={index}
                  >
                    {(provider) => (
                      <tr {...provider.draggableProps} ref={provider.innerRef}{...provider.dragHandleProps}>                                                                                                             
                      <DescriptionList
                      items={[
                      {
                      term:user.label,
                      description:
                      `This field name is ${user.label}`,
                      },    
                      ]}
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
               </Card.Section>           
          </Card>   
            <Card title="Additional Field">     
            <Card.Section>                                                        
             <DragDropContext onDragEnd={handleDragEnd}>    
          <Droppable droppableId="droppable-1">
            {(provider) => (              
              <tbody
                className="text-capitalize"
                ref={provider.innerRef}
                {...provider.droppableProps}
              >                        
                {fetchfield?.map((user, index) => (
                  <Draggable
                    key={`${user.field}${user.id}`}
                    draggableId={`${user.field}${user.id}`}
                    index={index}
                  >
                    {(provider) => (
                      <tr {...provider.draggableProps} ref={provider.innerRef}{...provider.dragHandleProps}>                                                                                                             
                      <DescriptionList
                      items={[
                      {
                      term:user.label,
                      description:
                      `This field name is ${user.label}`,
                      },    
                      ]}spacing="loose"
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
              {formValues.map((element, index) => (
            <div key={index}>
              {
              index ? 
              <>
              <FormLayout>
               <FormLayout.Group condensed>
               <Select
                  label="Select field type"
                  options={options}
                  onChange={(val)=>handleChange("field",val)}   
                  value={state.field}
                  name="field"
                  />
                    <TextField              
                    value={state.label}
                    onChange={(val)=>handleChange("label",val)}   
                    label="Field label"
                    name="label"
                    type="text"
                    connectedRight={<Button onClick={()=>removeFormFields()}><Icon source={MobileCancelMajor}/></Button>}                   
                    />                    
                  </FormLayout.Group>                                                                         
                <ButtonGroup>                 
                <Button onClick={addTextFields}>Create</Button> 
                </ButtonGroup>
                </FormLayout>
                </>
                : null
              }
            </div>
          ))}                               
            <ButtonGroup>             
              <Button onClick={() => addFormFields()}>Add Field</Button>                                                                                  
              </ButtonGroup>
               </Card.Section>
            </Card>
          </Form>
         </Page>
    );
}
export default Profile


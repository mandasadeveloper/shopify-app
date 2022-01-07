import { Page } from "@shopify/polaris";
import LeftSidebar from "./Left_sidebar";
import RightSide from "./Right_side";
const Admin_setting = ({url}) => { 
return (
         <Page                              
         title="Translations"      
         >
         <LeftSidebar url={url}/>         
         <RightSide url={url}/>       
         </Page>
    );
}
export default Admin_setting


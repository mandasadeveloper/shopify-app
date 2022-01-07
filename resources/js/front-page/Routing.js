import { Route, Switch } from "react-router";
import Profile_page from "./Profile";
import ManageAddress from "./Manage_address";
import GiftCards from "./Gift_cards";
import MyCoupons from "./My_coupons";

const Routing=()=>{
let UrlHttp ="http://127.0.0.1:8000/api";

return(
    <Switch>
    <Route exact path="/profile"><Profile_page UrlHttp={UrlHttp}/></Route>  
    <Route path="/manage-address"><ManageAddress/></Route>  
    <Route path="/gift-cards"><GiftCards/></Route>
    <Route path="/coupons"><MyCoupons/></Route>
   </Switch>     
)
}
export default Routing
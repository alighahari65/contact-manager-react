import { CURRENTLINE, ORANGE, PINK } from "../../helpers/colors";
import Contact from "./Contact";
import NotFound from '../../assets/not-found.gif';
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

const Contacts = ({contacts, loading, confirmDelete, search}) => {
  
 
  return (
    <>
      <section className="container">
        <div className="grid">
            <div className="row">
                <div className="col">
                    <p className="h3">
                        <Link to={"/contacts/add"} className="btn m-2" style={{backgroundColor: PINK}}>
                            ساخت مخاطب جدید
                            <i className="fa fa-plus-circle mx-2"></i>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
      </section>
      {loading? <Spinner  /> : (
        <section className="container">
        <div className="row">
            {/*contact*/}
            {contacts.length > 0 ? contacts.filter((contact, i) => {
              let filter = search.get('query');
              
              if(!filter) return true;
              return contact.fullname.includes(filter);
            })
            
            .map((contact, index) => {
              return (

                <Contact contact = {contact} confirmDelete= {() => confirmDelete(contact.id, contact.fullname)} key={index}/>
              );
            }) : (
              <div className="text-center flex-column py-5 d-flex align-items-center justify-content-center" style={{backgroundColor: CURRENTLINE}}>
                <p className="h3" style={{color:ORANGE}}> مخاطب یافت نشد...</p>
                <img src={NotFound} alt="" className="w-25" />
              </div>
            )}
        </div>
      </section>
      )}
      
    </>
  );
};

export default Contacts;

import "../../Admin.css";

export default function TopBar({toggle, handleToggle}){

    return(
        <div className="topbar">
          <div className={(toggle)? 'toggle active' : 'toggle'} onClick={handleToggle}>
          <i className="bi bi-list"></i>
          </div>
        
          <div >
            Admin <i className="bi bi-person-fill" style={{fontSize:'1.4rem', marginRight:'5px'}}></i>
          </div>
        </div>
    )
}
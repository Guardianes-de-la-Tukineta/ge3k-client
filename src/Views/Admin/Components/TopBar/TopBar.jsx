import "../../Admin.css";

export default function TopBar({toggle, handleToggle}){

    return(
        <div className="topbar">
          <div className={(toggle)? 'toggle active' : 'toggle'} onClick={handleToggle}>
          <i className="bi bi-list"></i>
          </div>
        
          <div className="user">
            <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" />
          </div>
        </div>
    )
}
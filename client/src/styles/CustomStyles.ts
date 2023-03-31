
export const paginationStyles =  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position:'fixed',
    bottom:'1.2em',
    marginTop:'5px'
}

export const boxStyles = {
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"
}

export const alertStyles = {
    position:'absolute',
    bottom:220
}

export const headerForAuthStyles = {
    fontSize:"1.875rem",
    letterSpacing:"-0.025em",
    fontWeight:'700',
    textAlign: 'center'
}

export const modalStyles = {
    top:0,
    right:0,
    bottom:0,
    left:0,
    justifyContent:'center',
    display:'flex',
    alignItems:'center',
    background:'rgba(0,0,0,0.4)'
}

export const modalContent = {
    minWidth: 410,
    minHeight:200,
    display:'flex',
    flexDirection:'column',
    background:'white',
    padding: '0 20px 20px 20px',
    borderRadius:'12px',
    boxShadow:'0 4px 16px #ccc'
}

export const taskTableRowStyles = {
    cursor:'pointer',
    display:'flex',
    flexDirection:'row',
    ":hover": {background:"#5CCCCC"}
}

export const taskTableCellStyles = {
    display:'flex',
    flex:1, 
    justifyContent:'center',
}

export const taskTableHeadStyles = {
    position:'fixed',
    display:'flex',
    width:'100%'
}

export const taskTableBodyStyles = {
    background:'#F0F0F0',
    overflowY:'scroll',
    position:'relative',
    height:'66vh',
    marginTop:'3.5rem',
    display:'flex',
    flexDirection:'column'
}


export const topPanelStyles = {
    position: "fixed",
    top: 64,
    background: "white",
    borderBottom: "1px solid gray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width:'100%',
    heidht:'80px'
}

export const createButtonStyles = {
    flex: 1,
    justifyContent: "flex-end",
    display: "flex",
    margin: "0 20px",
}

export const groupOrderButtonsStyles = {
    margin: "0 20px",
    display: "flex",
    justifyContent: "space-around",
}

export const boxForTaskListStyles = {
    position: "relative",
    top: 70,
    width: "100%",
    mt: "65px",
    flex: 2,
}
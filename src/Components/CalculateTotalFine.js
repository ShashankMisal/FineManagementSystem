import React from 'react'
import tenor from './tenor.gif'
import db from '../firebase.js'
import './CalculateTotalFine.css'

export default  function CalculateTotalFine() {


    const [total, setTotal] = React.useState(0)


    React.useEffect(()=>{
        if(total===0){
          
            db.collection('users').onSnapshot( snapshot => ( 
              snapshot.docs.map(doc => (
                setTotal( prev => (prev + doc.data().totalFinePaid) )
                ))))
              
               }
    },[total])



    

    return (
            <div className="moneyContainer">
                <img alt="money" src={tenor}/>  
                <hr style={{width:"90%",color:"rgb(7 0 32)"}}/>
                 <h1>Total fine Collected : { total ? total:0}</h1> 
              </div>

    )


}
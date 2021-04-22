



export default function Spinner (){
 

   return (
     <>
       <div className="container mt-3">
         <div className="row">
           <div className="col-2"></div>
           <div className="col-8">
             <div className="spinner-border text-warning" role="status">
               <span className="sr-only">Loading...</span>
              
             </div>
           </div>
           <div className="col-2"></div>
         </div>
       </div>
     </>
   );
  
}
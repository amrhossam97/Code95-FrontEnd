import { FaTimes } from "react-icons/fa";
import "./Query.css";

export default function Query (props){

    return(
        <>
            <div className='my-4'>
          <select
            className="px-4 py-3 rounded-full mr-10"
            onChange={(e)=> props.inputHandler(props.index,e)}
            name='key'
            value={props.data.key}
          >
            <option disabled value="">
              Select Key
            </option>
            <option value="user_id">ID</option>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
            <option value="full_name">Full Name</option>
            <option value="gender">Gender</option>
            <option value="number_of_messages">Number Of Messages</option>
            <option value="age">Age</option>
            <option value="creation_date">Creation Date</option>
          </select>
          <select
            className="px-4 py-3 rounded-full mr-10"
            onChange={(e)=> props.inputHandler(props.index,e)}
            name='operator'
            value={props.data.operator}
          >
            <option disabled value="">
              Select Operator
            </option>
            <option value="="> = </option>
            <option value="!="> != </option>
            <option value="<"> &lt; </option>
            <option value=">"> &gt; </option>
            <option value="starts with">Starts with</option>
            <option value="ends with">Ends with</option>
            <option value="contains">Contains</option>
            <option value="exact">Exact</option>
          </select>
          <input
            className="form-input px-4 py-3 rounded-full mr-10"
            placeholder="Enter Data"
            value={props.data.data}
            name='data'
            onChange={(e)=> props.inputHandler(props.index,e)}
          />
          {
              props.index>0 &&  <select
              className="px-4 py-3 rounded-full mr-10"
              onChange={(e)=> props.inputHandler(props.index,e)}
              name='logicOpe'
            >
              <option value="and"> AND </option>
              <option value="or"> OR </option>
            </select>
          }
          {
              props.index>0 &&  <button className='btn-delete rounded-full' onClick={(e)=>props.delete(props.index,e)}> <FaTimes /> </button>
          }
        </div>
        </>
    )
}
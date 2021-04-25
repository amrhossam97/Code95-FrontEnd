import { Link } from "react-router-dom";
import "./Graph.css";
import AnyChart from "anychart-react";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

export default function Graph() {
  const [result, setResult] = useState([]);
  const [headers] = useState([
      {label: 'ID' , key:'_id'},
      {label: 'First Name' , key:'first_name'},
      {label: 'Last Name' , key:'last_name'},
      {label: 'Full Name' , key:'full_name'},
      {label: 'Gender' , key:'gender'},
      {label: 'Number Of Messages' , key:'number_of_messages'},
      {label: 'Age' , key:'age'},
      {label: 'Creation Date' , key:'creation_date'}
  ]);
  const [csvUsers, setCsvUsers] = useState([]);
  const [chartData, setChartData] = useState({
    male: 0,
    female: 0,
    baby:0,
    young:0,
    old:0,
    jan:0,
    feb:0,
    mar:0,
    apr:0,
    may:0,
    jun:0,
    jul:0,
    aug:0,
    sep:0,
    oct:0,
    nov:0,
    dec:0

  });

  useEffect(() => {
    fetch("https://code95-backend.herokuapp.com/api/users")
      .then((res) => res.json())
      .then(
        (result) => {
          setResult(result);
        },
        (error) => {
          console.error(error);
        }
      );
      
  }, []);
  useEffect(() => {

      setChartData({male: 0,
        female: 0,
        baby:0,
        young:0,
        old:0,
        jan:0,
        feb:0,
        mar:0,
        apr:0,
        may:0,
        jun:0,
        jul:0,
        aug:0,
        sep:0,
        oct:0,
        nov:0,
        dec:0
    })
    for (let user of result) {
        /* Gender Graph */
      if (user.gender === "male") {
        setChartData({
          ...chartData,
          male: (chartData.male = chartData.male + 1),
        });
      } else {
        setChartData({
          ...chartData,
          female: (chartData.female = chartData.female + 1),
        });
      }

      /* Age Graph */
      if (user.age >= "18" && user.age <= "30") {
        setChartData({
          ...chartData,
          baby: (chartData.baby = chartData.baby + 1),
        });
      } else if (user.age >= "31" && user.age <= "45"){
        setChartData({
          ...chartData,
          young: (chartData.young = chartData.young + 1),
        });
      }
      else
      {
        setChartData({
            ...chartData,
            old: (chartData.old = chartData.old + 1),
          });
      }

      /* Date Graph */
      let date = new Date(user.creation_date);
      let m = date.getMonth();
      m === 0 && setChartData({...chartData , jan : chartData.jan = chartData.jan +1});
      m === 1 && setChartData({...chartData , feb : chartData.feb = chartData.feb +1});
      m === 2 && setChartData({...chartData , mar : chartData.mar = chartData.mar +1});
      m === 3 && setChartData({...chartData , apr : chartData.apr = chartData.apr +1});
      m === 4 && setChartData({...chartData , may : chartData.may = chartData.may +1});
      m === 5 && setChartData({...chartData , jun : chartData.jun = chartData.jun +1});
      m === 6 && setChartData({...chartData , jul : chartData.jul = chartData.jul +1});
      m === 7 && setChartData({...chartData , aug : chartData.aug = chartData.aug +1});
      m === 8 && setChartData({...chartData , sep : chartData.sep = chartData.sep +1});
      m === 9 && setChartData({...chartData , oct : chartData.oct = chartData.oct +1});
      m === 10 && setChartData({...chartData , nov : chartData.nov = chartData.nov +1});
      m === 11 && setChartData({...chartData , dec : chartData.dec = chartData.dec +1});

    }
    /* Number of Messages Sheet */
    let sortedUsers = result.sort((a,b)=>{return b.number_of_messages - a.number_of_messages});
    setCsvUsers(sortedUsers);
  }, [result]);
  return (
    <>
      <div className="grid grid-rows-1 grid-flow-col gap-4 my-10">
        <div>
          <h1 className="font-black"> Graphical Reports </h1>
        </div>
        <div className="m-auto">
            <button className="btn-link mr-8">
            {" "}
            <Link to="/"> Home </Link>{" "}
            </button>
            
            <CSVLink className='btn-add' data={csvUsers} headers={headers} filename={"Code95-Users.csv"}>
                Download CSV File
            </CSVLink>
            
            
        </div> 
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className='my-8 block'>
          <AnyChart
            type="pie"
            data={[["Male", chartData.male],
            ["Female", chartData.female]]}
            title="Male Vs Females"
            width={400} height={200} 
          />
        </div>
        <div className='my-8 block'>
          <AnyChart
            type="bar"
            data={[
            ["18-30", chartData.baby],
            ["31-45", chartData.young],
            ["45-70", chartData.old]]}
            title="Age segmentation"
            width={400} height={200} 
          />
        </div>
        <div className='my-8 block'>
          <AnyChart
            type="bar"
            data={[
            ["January", chartData.jan],
            ["February", chartData.feb],
            ["March", chartData.mar],
            ["April", chartData.apr],
            ["May", chartData.may],
            ["June", chartData.jun],
            ["July", chartData.jul],
            ["August", chartData.aug],
            ["September", chartData.sep],
            ["October", chartData.oct],
            ["November", chartData.nov],
            ["December", chartData.dec],
            ]}
            title="Users Created"
            width={400} height={400} 
          />
        </div>
        
      </div>
    </>
  );
}

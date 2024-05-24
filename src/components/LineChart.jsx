import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { addToArray,datachart,clean}from "../data/datachart";
import {useState,useEffect} from 'react';
import { getDatabase, ref, onValue ,snapshot} from "firebase/database";
import {database} from "../config/realtime";
const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [datatest, setDatatest] = useState(null);
  const [time, setime] = useState(null);
  const [hot, sethot] = useState(null);
  const [prevTime,setPrevTime]=useState("null");
  const [prevHot,setPrevHot]=useState(0)
 
  //remouve duplacated array
  function uniqueByKeepLast(data,key){
    return [
      ...new Map(
        data.map(x => [key(x),x])
      ).values()
    ]
  }
 
//new code
  
useEffect(() => {
  const dbRef = ref(database, "update/"); // Replace with your actual path

  const unsubscribe = onValue(
    dbRef,
    (snapshot) => {
      const newData =  [ {x: 12,y:78},
        //{ x: 1, y: 80 },
        //{ x: 2, y: 75 },
        // ... other data points
      ] ;
    
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
       
        
        if (childKey =="temperature"){
          //console.log(" key  : ",childKey);
          //console.log(" temperature  : ",childData);
          sethot(childData);
        }else if(childKey =="time_string"){
          //console.log(" key  : ",childKey);
          //console.log(" time  : ",childData);
          setime(childData);
        }
        

      });
      
    
      //console.log(uniqueArray);
      //newData.push({ x: time, y: hot }); // Add childKey as an "id" property
       // Check if time and hot are not null and have changed
    if ((time !== null && hot !== null) && (time !== prevTime ) ) {
      //console.log("Time :  ",time,"||   priv: ",prevTime)
      //console.log("tempret :  ",hot,"||   priv :  ",prevHot)
      clean(uniqueByKeepLast(datachart[0].data,it => it.x));
      addToArray({ x: time, y: hot });
      clean(uniqueByKeepLast(datachart[0].data,it => it.x));
      console.log("unique array : ",uniqueByKeepLast(datachart[0].data,it => it.x));
      console.log("data in the chart : ",datachart);
    }else{
      //console.log("repetetive object ...");
    }
    
    },
    {
      onlyOnce: false,
    }
  );
    
  return () => unsubscribe(); // Cleanup function to detach listener on unmount
}, [time, hot]); // Empty dependency array, fetch data only on mount (adjust if needed)


const mockLineData = [
  {
    id: "japan",
    color: "hsl(113, 93%, 40%)",
    data: [
      {
        x: 1,
        y: 80,
      },
      {
        x: 2,
        y: 75,
      },
      {
        x: 3,
        y: 36,
      },
      {
        x: 4,
        y: 216,
      },
      {
        x: 5,
        y: 35,
      },
      {
        x: "bus",
        y: 236,
      },
      {
        x: "car",
        y: 88,
      },
      {
        x: "moto",
        y: 232,
      },
      {
        x: "bicycle",
        y: 281,
      },
      {
        x: "horse",
        y: 1,
      },
      {
        x: "skateboard",
        y: 35,
      },
      {
        x: "others",
        y: 14,
      },
    ],
  },
];




  return (
    <ResponsiveLine
      data={datachart}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill:colors="#000000",
       
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "transportation", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;

export const datachart =[{id: "Tempreture",
color: "hsl(113, 93%, 40%)",
data : [
  { x: "0", y: 0 },
],},
];
export const clean =(a)=>{
    datachart[0].data = a;
};
export const addToArray = (newObject) => {
  const lastIndex = datachart.length - 1;
  datachart[lastIndex].data.push(newObject);
};

export const datachartHum =[{id: "humedity",
color: "hsl(113, 93%, 40%)",
data : [
  { x: "0", y: 0 },
],},
];
export const cleanhum =(a)=>{
  datachartHum[0].data = a;
};
export const addToArrayhum = (newObject) => {
const lastIndex = datachartHum.length - 1;
datachartHum[lastIndex].data.push(newObject);
};
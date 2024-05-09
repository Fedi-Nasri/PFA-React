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
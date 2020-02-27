const getData=async(x)=>{
    const response = await fetch(`http://192.168.100.37:4000/ventas/${x}`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }   
  }); 
const json = await response.json();
console.log(json);     
return json;
}
export default getData
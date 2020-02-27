const url = 'http://192.168.100.37:4000/publicaciones'
const getData=async()=>{
    const response = await fetch(url, {
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
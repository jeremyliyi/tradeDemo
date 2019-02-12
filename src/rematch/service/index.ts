import fetch from '../../utils/fetch'
export  function getList (){
   return fetch.get('/exchange/public/product') 
}
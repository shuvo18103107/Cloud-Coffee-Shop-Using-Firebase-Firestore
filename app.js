





const cafeList = document.querySelector('#cafe-list');


//create element and render cafe 
function renderCafe(doc)
{
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;

    li.appendChild(name);
    li.appendChild(city);
    cafeList.appendChild(li);
  


}


//get is asynchronus function so untill the data we get we have to w8 then trigger then function and then function will execute after the data is exccute
db.collection('cafes').get().then(
    //snapshot basically the representation  of diff data inside the class
 (snapshot)=>
 {
         snapshot.docs.forEach(doc => {
            renderCafe(doc);
             
         });
 }



)
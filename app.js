
const cafeList = document.querySelector('#cafe-list');

const form = document.querySelector('#add-cafe-form');

//create element and render cafe 
function renderCafe(doc)
{
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);
    cafeList.appendChild(li);
  // deleting data
  cross.addEventListener('click' , (e)=>
  {
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute('data-id'); //when i cross any item i get the list item id here
        db.collection('cafes').doc(id).delete();
  })


}

// -------------------------Getting Data-------------------
//get is asynchronus function so untill the data we get we have to w8 then trigger then function and then function will execute after the data is exccute

// we can perform any query > < == while we fetch data from the browser useing where()
// we can order data by using orderBy('name') that order cafe name alphabetically ,
//when we want to perform complex query like where city == dhaka then order it by name , then console through error for indexing , just click on the error and build the index for that query
// db.collection('cafes').where('city', '==', 'Dhaka').orderBy('name' ).get().then(
//     //snapshot basically the representation  of diff data inside the class
//  (snapshot)=>
//  {
//          snapshot.docs.forEach(doc => {
//             renderCafe(doc);
             
//          });
//  }



// )
//-----------------------Saving Data---------------------------
form.addEventListener('submit',(e) => {

 e.preventDefault();
db.collection('cafes').add({
    name :form.name.value,
    city:form.city.value,
});

form.name.value = '';
form.city.value = '';
});

/* ------------Real time listener-----------------
when something changes in collection it will trigger onsnapshots function
*/

db.collection('cafes').orderBy('city').onSnapshot(

    snapshot => 
    {
        let changes = snapshot.docChanges();
      
          
          changes.forEach(
              change => {
                 if(change.type == 'added')
                 {
                     renderCafe(change.doc);
                 }
                 else if (change.type == 'removed')
                 {
                     let li = cafeList.querySelector('[data-id =' + change.doc.id + ']');
                     cafeList.removeChild(li);
                 }
                  
                 
              }
          )
    }
)
/* update any data 

db.collection('cafes').doc('MFfWzwPfNg293iheKM67').update({name : 'London Cafe' })
db.collection('cafes').doc('MFfWzwPfNg293iheKM67').set({name : 'London Cafe' })

Diff between update and set ? 
update just update the particular field but set completely override that doc 
like here set name : london cafe also override the city output just londoncafe and city field will be null









*/
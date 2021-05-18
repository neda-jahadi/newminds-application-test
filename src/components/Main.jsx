import React,{useState} from 'react';
import './Main.css';
import ImageMaker from './ImageMaker';


const Main = () => {

//This is useState that saves the words which is typed in the search field
  const [searchedWord, setSearchedWord] = useState('');

  //Recieved images ffrom API are collected in an array by useState whenever new images are searched
  const [recievedPhotos, setRecievedPhotos] = useState([]);

//The url to fetch search request based on teh searched word in the input search filed

  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=6bd5e6a30032e005ad492a7c7b125fb0&tags=${searchedWord}&format=json&nojsoncallback=1`;

//The search function in order to find it from API
  const SearchTheWord = () => {
    fetch(url)
    .then(response => response.json())
    .then(res =>
          {
            // The result of API request is being saved with useState hook
            setRecievedPhotos(res.photos.photo);
            console.log('photos are:', recievedPhotos);
          }



    )
    .catch(error => console.log(error))
  }


//This Variabel is used to show the result of API on the page. It is Null in ordre to avoid Error if there is no result
let recievedPhotoJsx = null;

// Every Image is going to be pulled and shown by ImageMaker component
//Each image is designed seperately in ImageMaker component.
if(recievedPhotos.length > 0){

  recievedPhotoJsx = recievedPhotos.map((photo, index) =>
  <div key={photo.id} >
    <ImageMaker
    farm={photo.farm}
    server={photo.server}
    id={photo.id}
    secret={photo.secret} />


 </div>
   )
}



    return(
        <div className="app-container">
          <div className="search-container">
            <input type="text" placeholder="Search what you want..." className="search-field" onChange={event => setSearchedWord(event.target.value)}/>
            <div className="search-button" onClick={SearchTheWord}>Search</div>
          </div>

          <div className="images-container">
           {recievedPhotoJsx}

          </div>

        </div>
    )
}

export default Main;

import React,{useState} from 'react';
import './ImageMaker.css';
import SidebarItem from './SidebarItem';

//Default values for edit buttons of images. Property is the CSS property, unit is the rate of each property with percentage
const DEFAULT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range:{
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range:{
      min: 0,
      max: 200
    },
    unit: '%'
  }
]

const ImageMaker = ({farm,server,id,secret}) => {

 const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const selectedOption = options[selectedOptionIndex];

//If image is clikced edit btns appears and disappears by clicking again. It toggles
const [activeEdit, setActiveEdit] = useState(false);

//function that save the value of slider
const handleSliderChange = ({target}) => {
  setOptions(prevOptions => {
    return(prevOptions.map((option,index) => {
      if( index !==selectedOptionIndex) return option
      return { ...option, value: target.value}
    }))
  })
}


//Change the style of image based on the value of slider and edit buttons.
const getImageStyle = () => {
  const filters = options.map(option => {
    return `${option.property}(${option.value}${option.unit})`
  })

  return { filter: filters.join(' ') }
}

  let imageUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
  return(

    <div className="image-container">
      <img src={imageUrl} style={getImageStyle()} onClick={() => setActiveEdit(!activeEdit) } alt="recievedImg"/>


      <div className={activeEdit ? 'active-edit-btns' : 'inactive-edit-btns'}>
      {options.map((option,index) => {
        return(
        <SidebarItem
          key={index}
          name={option.name}
          active={index===selectedOptionIndex}
          handleClick={() => setSelectedOptionIndex(index)}/>
        )
      })}

      </div>

      <div className={activeEdit ? 'active-edit-slider' : 'inactive-edit-slider'}>
        <input type="range" className="slider" min={selectedOption.range.min} max={selectedOption.range.max}
          value={selectedOption.range.value} onChange={handleSliderChange} />
      </div>

    </div>


  )

}

export default ImageMaker;

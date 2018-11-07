import React from 'react';
import SingleImageUpload from './SingleImageUpload'; 
import MultipleImageUpload from './MultipleImageUpload'; 

export default class ImageUpload extends React.Component {
  
  render(){
    return(
      <div>
        <p>上传单个图片：如上传头像的时候</p>
        <SingleImageUpload />
  
        <p>上传多个图片的时候</p>
        <MultipleImageUpload />
      </div>
    )
  }
}
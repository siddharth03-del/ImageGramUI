import React from 'react';
import { MyContext } from '../context';
import { useContext } from 'react';
import { Spinner } from '@material-tailwind/react';
const ProfileImage = ({ imageUrl, width, height }) => {
  const {imageLoading} = useContext(MyContext);
  var spinnerDimensions;
  if(width == 32 && height == 32){
    spinnerDimensions = 20;
  }
  else{
    spinnerDimensions = 5;
  }
  return (
    <>
      {
      imageLoading ? 
      <div className={`rounded-full w-${width} h-${height} border-2 border-gray-300 flex items-center justify-center`}>
        <Spinner className={`w-${spinnerDimensions} h-${spinnerDimensions}`}/>
      </div>
      :
      <div className="flex items-center justify-center">
      <img
        src={imageUrl}
        alt="Profile"
        className={`rounded-full w-${width} h-${height} object-cover border-2 border-gray-300`}
      />
    </div>}
    </>
  );
};

export default ProfileImage;

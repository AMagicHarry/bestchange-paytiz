import React from 'react';
import './imageStack.css';
import { User } from '../../utils/types';
import Avatar from '../../assets/user.jpeg'

interface Props {
  users: User[];
}



const ImageStack: React.FC<Props> = ({ users }) => {
  const displayUsers = users.length > 4 ? users.slice(0, 4) : users;
  const remainingCount = users.length > 4 ? users.length - 4 : 0;

  return (
    <div className='image-stack'>
      {displayUsers.map((user: User, index: number) => (
        <div
          style={{ marginLeft: index === 0 ? 0 : -5 }}
          key={user._id}
          className='image-container'
        >
          <img  src={Avatar} alt={`User ${index + 1}`} />
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="remaining-container" style={{ marginLeft: -10 }}>
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default ImageStack;

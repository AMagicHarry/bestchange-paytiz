import React from 'react';
import './imageStack.css';
import { Referral } from '../../utils/types';

interface Props {
  referrals: Referral[];
}



const ImageStack: React.FC<Props> = ({ referrals }) => {
  const displayReferrals = referrals?.length > 4 ? referrals?.slice(0, 4) : referrals;
  const remainingCount = referrals?.length > 4 ? referrals?.length - 4 : 0;

  return (
    <div className='image-stack'>
      {referrals?.length > 0 && displayReferrals.map((referral: Referral, index: number) => (
        <div
          style={{ marginLeft: index === 0 ? 0 : -5 }}
          key={referral._id}
          className='image-container'
        >
          <img  src={referral.referred.avatar} alt={`User ${index + 1}`} />
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

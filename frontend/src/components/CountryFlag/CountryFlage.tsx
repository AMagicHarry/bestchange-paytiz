import ReactCountryFlag from "react-country-flag";

export const CountryAvatar = ({ code }:{ code: string }) => {
  // A fallback image URL or a simple SVG icon or even a default country code
  const defaultFlag = 'https://via.placeholder.com/150';

  // Check if the code is truthy and optionally if it matches a known country code pattern
  const isValidCode = code && /^[A-Z]{2}$/.test(code); // This regex checks for two uppercase letters

  return (
    <>
      {isValidCode ? (
        <ReactCountryFlag 
          countryCode={code} 
          svg 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      ) : (
        <img
          src={defaultFlag}
          alt="default flag"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      )}
    </>
  );
};

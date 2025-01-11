import React, { useEffect, useState } from 'react';

function App() {
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailToVerify = urlParams.get('email'); // Kinyerjük az email paramétert az URL-ből

    if (emailToVerify) {
      fetch(`http://localhost:8081/verify?email=${emailToVerify}`)
        .then(res => res.json())
        .then(data => {
          if (data.message) {
            setVerificationStatus(data.message); // Ha van üzenet, beállítjuk
          }
        })
        .catch(err => {
          setVerificationStatus("An error occurred during verification.");
          console.log(err);
        });
    } else {
      setVerificationStatus("Email parameter is missing.");
    }
  }, []);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{verificationStatus}</p> {/* Az üzenet megjelenítése */}
    </div>
  );
}

export default App;

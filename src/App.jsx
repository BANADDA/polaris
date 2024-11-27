import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PolarisSplash from './screens/PolarisSplash';
import SubnetHome from './screens/SubnetHome';

function App() {
  const [isSplashLoading, setIsSplashLoading] = useState(true);

  // Callback function to set splash loading state
  const handleSplashLoadingComplete = () => {
    setIsSplashLoading(false); // Splash loading is finished
  };

  // UseEffect to run addHardwareToFirestore once after splash
  // useEffect(() => {
  //   if (!isSplashLoading) {
  //     addHardwareToFirestore()
  //       .then(() => console.log('Hardware data uploaded successfully'))
  //       .catch((error) => console.error('Error uploading hardware data:', error));
  //   }
  // }, [isSplashLoading]);

  // Show splash screen while loading
  if (isSplashLoading) {
    return <PolarisSplash onLoadingComplete={handleSplashLoadingComplete} />;
  }

  // Show main app after splash screen finishes
  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        <Route path="/" element={<SubnetHome />} />
      </Routes>
    </div>
  );
}

export default App;

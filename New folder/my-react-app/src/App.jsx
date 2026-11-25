import React, { useRef, useEffect, useState } from 'react';
import { Camera, ShieldAlert, CheckCircle } from 'lucide-react';

function App() {
  const webcamRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [feedback, setFeedback] = useState("કેમેરા સામે ગાર્ડ પોઝિશનમાં ઊભા રહો");
  const [actionStatus, setActionStatus] = useState("normal"); // 'normal' અથવા 'success'

  useEffect(() => {
    let streamRef = null;

    // કેમેરા પરવાનગી મેળવીને વિડિયો સ્ટ્રીમ ચાલુ કરવી
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        streamRef = stream;
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
          setCameraActive(true);
        }
      })
      .catch((err) => {
        console.error("Camera Error: ", err);
        setFeedback("ਕૃપા કરીને કેમેરાની પરવાનગી આપો!");
      });

    // મોશન અથવા એક્શન સેન્સિંગ સિમ્યુલેશન / સેન્સર લોજિક
    const handleKeyPress = (e) => {
      // કીબોર્ડ પર Spacebar દબાવવાથી અથવા ટેપ કરવાથી કિક એક્ટિવ ચેક થશે (ડેમો પર્પस માટે)
      if (e.code === 'Space') {
        triggerActionCheck();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      if (streamRef) {
        streamRef.getTracks().forEach(track => track.stop());
      }
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // તાઈકોન્ડો કિક અથવા પંચ વેલિડેશન ચેક
  const triggerActionCheck = () => {
    // રેન્ડમ અથવા હાઇજમ્પ/મૂવમેન્ટ વેલિડેશન
    const isTrueAction = Math.random() > 0.3; // 70% સફળતા દર ડેમો માટે

    if (isTrueAction) {
      setFeedback("અભિનંદન! શાનદાર કિક / પંચ - Action is True! 🔥🥋");
      setActionStatus("success");
    } else {
      setFeedback("ખોટું ફોર્મ! ફરીથી પ્રયાસ કરો - Action is False ❌");
      setActionStatus("normal");
    }

    // ૩ સેકેન્ડ પછી રીસેટ કરવું
    setTimeout(() => {
      setFeedback("કેમેરા સામે ગાર્ડ પોઝિશનમાં ઊભા રહો");
      setActionStatus("normal");
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <Camera className="text-cyan-400" /> Martial-Arts AI Trainer
      </h1>

      {/* ફીડબેક સ્ટેટસ બોક્સ */}
      <div className={`mb-4 px-6 py-3 rounded-lg text-lg font-semibold flex items-center gap-2 shadow-lg transition-all ${
        actionStatus === 'success' ? 'bg-green-600 text-white' : 'bg-gray-800 border border-gray-700 text-cyan-300'
      }`}>
        {actionStatus === 'success' ? <CheckCircle /> : <ShieldAlert />}
        <span>{feedback}</span>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        💡 ટીપ: કેમેરા સામે કિક/પંચ મારો અથવા કીબોર્ડ પર **Spacebar** દબાવીને એક્શન ચેક કરો!
      </p>

      {/* કેમેરા સ્ક્રીન */}
      <div className="relative w-[640px] h-[480px] bg-black rounded-xl overflow-hidden shadow-2xl border-2 border-cyan-500">
        <video
          ref={webcamRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover transform scale-x-[-1]"
        />
      </div>

      <button 
        onClick={triggerActionCheck}
        className="mt-6 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg shadow-md transition-all cursor-pointer"
      >
        કિક / પંચ ટેસ્ટ કરો (Test Action)
      </button>
    </div>
  );
}

export default App;

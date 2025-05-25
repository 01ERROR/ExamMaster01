import React, { useState, useEffect } from 'react';
import { Video, ScreenShare, AlertTriangle, Camera, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface ProctorControlsProps {
  onReady: () => void;
}

export const ProctorControls: React.FC<ProctorControlsProps> = ({ onReady }) => {
  const [cameraPermission, setCameraPermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [screenSharePermission, setScreenSharePermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [allReady, setAllReady] = useState(false);

  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if all permissions are granted to enable the start button
    if (cameraPermission === 'granted' && screenSharePermission === 'granted') {
      setAllReady(true);
    } else {
      setAllReady(false);
    }

    // Clean up streams when component unmounts
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraPermission, screenSharePermission, cameraStream, screenStream]);

  useEffect(() => {
    // Set up camera preview if permission is granted
    if (cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      setCameraStream(stream);
      setCameraPermission('granted');
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraPermission('denied');
    }
  };

  const requestScreenSharePermission = async () => {
    try {
      // In a real app, this would use the Screen Capture API
      // For this demo, we'll simulate success
      setScreenSharePermission('granted');
      
      // In a real implementation:
      // const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      // setScreenStream(stream);
    } catch (error) {
      console.error('Error sharing screen:', error);
      setScreenSharePermission('denied');
    }
  };

  const handleStartTest = () => {
    if (allReady) {
      onReady();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-amber-700">
              This test requires proctoring. Please enable your camera and screen sharing to continue.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <Camera className="mr-2 text-gray-700" size={20} />
            <h3 className="text-lg font-medium text-gray-900">Camera Access</h3>
          </div>
          
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
            {cameraPermission === 'granted' ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-500 text-sm">Camera preview will appear here</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            {cameraPermission === 'pending' && (
              <Button onClick={requestCameraPermission} leftIcon={<Video size={18} />}>
                Enable Camera
              </Button>
            )}
            {cameraPermission === 'granted' && (
              <div className="flex items-center text-green-600">
                <CheckCircle size={18} className="mr-2" />
                <span>Camera enabled</span>
              </div>
            )}
            {cameraPermission === 'denied' && (
              <div className="flex items-center text-red-600">
                <XCircle size={18} className="mr-2" />
                <span>Camera access denied</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <ScreenShare className="mr-2 text-gray-700" size={20} />
            <h3 className="text-lg font-medium text-gray-900">Screen Sharing</h3>
          </div>
          
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
            <p className="text-gray-500 text-sm">
              {screenSharePermission === 'granted' 
                ? 'Your screen is being shared' 
                : 'Your screen will be shared during the test'}
            </p>
          </div>
          
          <div className="flex items-center">
            {screenSharePermission === 'pending' && (
              <Button onClick={requestScreenSharePermission} leftIcon={<ScreenShare size={18} />}>
                Enable Screen Sharing
              </Button>
            )}
            {screenSharePermission === 'granted' && (
              <div className="flex items-center text-green-600">
                <CheckCircle size={18} className="mr-2" />
                <span>Screen sharing enabled</span>
              </div>
            )}
            {screenSharePermission === 'denied' && (
              <div className="flex items-center text-red-600">
                <XCircle size={18} className="mr-2" />
                <span>Screen sharing denied</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button 
          size="lg" 
          disabled={!allReady} 
          onClick={handleStartTest}
        >
          Start Test
        </Button>
      </div>

      <div className="text-sm text-gray-500 mt-4">
        <p>By starting the test, you agree to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Allow camera monitoring during the test</li>
          <li>Share your screen during the test</li>
          <li>Not use unauthorized resources or assistance</li>
          <li>Complete the test independently</li>
        </ul>
      </div>
    </div>
  );
};
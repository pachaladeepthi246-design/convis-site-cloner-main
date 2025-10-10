import { Toaster } from 'react-hot-toast';

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: '#334155',
          color: '#f1f5f9',
          border: '1px solid #475569',
        },
      }}
    />
  );
}
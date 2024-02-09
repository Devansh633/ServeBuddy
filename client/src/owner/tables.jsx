import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";

function Tables() {
  const [tableCount, setTableCount] = useState(1);
  const [tableComponents, setTableComponents] = useState([]);

  useEffect(() => {
    generateTables();
  }, [tableCount]); // Trigger generation when tableCount changes

  const fetchIdFromServer = async () => {
    try {
      const response = await fetch(`/getid?email=${localStorage.getItem('email')}`);
      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      } else {
        console.error('Error:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  };

  const generateTables = async () => {
    const id = await fetchIdFromServer();
    if (id) {
      const generatedTables = [];
      for (let i = 1; i <= tableCount; i++) {
        const qrCodeId = `tableQRCode${i}`;
        const url = `http://localhost:3000/menu?id=${id}&n=${i}`;
        generatedTables.push(
          <div key={i} className="bg-white rounded-lg shadow-md p-4 m-4">
            <h1 className="text-2xl font-semibold mb-2">Table {i}</h1>
            <div className="mx-auto">
              <QRCode
                id={qrCodeId}
                value={url}
                size={200}
                level={"H"}
                includeMargin={true}
              />
            </div>
            <button
              onClick={() => downloadQR(qrCodeId)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-600"
            >
              Download QR Code
            </button>
          </div>
        );
      }
      setTableComponents(generatedTables);
    }
  };

  const downloadQR = (id) => {
    const canvas = document.getElementById(id);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${id}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <label className="block text-lg font-semibold mb-2">
        Enter the number of tables:
      </label>
      <input
        type="number"
        value={tableCount}
        min={1}
        onChange={(e) => setTableCount(e.target.value)}
        className="w-16 py-2 px-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      />
      <div className="mt-4 space-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tableComponents}
      </div>
    </div>
  );
}

export default Tables;

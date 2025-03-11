import React, { useState } from 'react';
import './GradientGenerator.css';

const GradientGenerator = () => {
  const [primaryColor, setPrimaryColor] = useState('#9eca8c');
  const [secondaryColor, setSecondaryColor] = useState('#b78cc9');
  const [gradientType, setGradientType] = useState('linear');
  const [direction, setDirection] = useState('90deg');
  const [width, setWidth] = useState(3000);
  const [height, setHeight] = useState(2000);

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleRandomPrimary = () => {
    setPrimaryColor(generateRandomColor());
  };

  const handleRandomSecondary = () => {
    setSecondaryColor(generateRandomColor());
  };

  const getCSSCode = () => {
    return `background: ${gradientType}-gradient(${direction}, ${primaryColor}, ${secondaryColor});`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getCSSCode());
    alert('CSS code copied to clipboard!');
  };

  const downloadImage = (format) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, primaryColor);
    gradient.addColorStop(1, secondaryColor);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const link = document.createElement('a');
    link.download = `gradient.${format}`;
    link.href = canvas.toDataURL(`image/${format}`);
    link.click();
  };

  return (
    <div className="gradient-generator">
      <h1>Gradient Generator</h1>
      <div 
        className="gradient-preview"
        style={{
          background: `${gradientType}-gradient(${direction}, ${primaryColor}, ${secondaryColor})`
        }}
      ></div>
      
      <div className="controls">
        <div className="color-section">
          <div className="color-control">
            <label>Primary Color</label>
            <div className="color-input-group">
              <input 
                type="text" 
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
              />
              <input 
                type="color" 
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
              />
              <button onClick={handleRandomPrimary}>Random</button>
            </div>
          </div>

          <div className="color-control">
            <label>Secondary Color</label>
            <div className="color-input-group">
              <input 
                type="text" 
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
              />
              <input 
                type="color" 
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
              />
              <button onClick={handleRandomSecondary}>Random</button>
            </div>
          </div>
        </div>

        <div className="gradient-options">
          <div className="gradient-type">
            <label>Gradient Type</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="linear"
                  checked={gradientType === 'linear'}
                  onChange={(e) => setGradientType(e.target.value)}
                />
                Linear Gradient
              </label>
              <label>
                <input
                  type="radio"
                  value="radial"
                  checked={gradientType === 'radial'}
                  onChange={(e) => setGradientType(e.target.value)}
                />
                Radial Gradient
              </label>
            </div>
          </div>

          {gradientType === 'linear' && (
            <div className="direction-control">
              <label>Direction</label>
              <select 
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
              >
                <option value="90deg">Left to Right</option>
                <option value="270deg">Right to Left</option>
                <option value="0deg">Top to Bottom</option>
                <option value="180deg">Bottom to Top</option>
                <option value="45deg">Diagonal</option>
              </select>
            </div>
          )}
        </div>

        <div className="css-code">
          <label>CSS code</label>
          <div className="code-display">
            <code>{getCSSCode()}</code>
            <button onClick={copyToClipboard}>Copy</button>
          </div>
        </div>

        <div className="image-size">
          <label>Image Size (in pixels)</label>
          <div className="size-inputs">
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              placeholder="Width"
            />
            <span>Width</span>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              placeholder="Height"
            />
            <span>Height</span>
          </div>
        </div>

        <div className="download-buttons">
          <button onClick={() => downloadImage('png')}>Download PNG</button>
          <button onClick={() => downloadImage('jpg')}>Download JPG</button>
        </div>
      </div>
    </div>
  );
};

export default GradientGenerator; 
import React, { useState, useEffect, useRef } from 'react';
import './ColorConverter.css';

function ColorConverter() {
  const [hex, setHex] = useState('');
  const [rgb, setRgb] = useState('');
  const [error, setError] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const hexToRgb = (hex) => {
    if (hex.length !== 7 || hex[0] !== '#') {
      return null;
    }

    const isValidHex = /^#([0-9A-Fa-f]{6})$/.test(hex);
    if (!isValidHex) {
      return null;
    }

    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith('#')) {
      value = `#${value}`;
    }
    setHex(value);

    if (value.length === 7) {
      const rgbColor = hexToRgb(value);
      if (rgbColor) {
        setRgb(rgbColor);
        setError('');
        setBgColor(value);
      } else {
        setRgb('');
        setError('Ошибка');
        setBgColor('#e94b35');
      }
    } else {
      setRgb('');
      setError('');
      setBgColor('#ffffff');
    }
  };

  return (
    <div className="color-converter" style={{ backgroundColor: bgColor }}>
      <input
        type="text"
        value={hex}
        onChange={handleChange}
        placeholder="#000000"
        maxLength="7"
        className="color-input"
        ref={inputRef}
      />
      <div className="color-result">
        {rgb ? rgb : error}
      </div>
    </div>
  );
}

export default ColorConverter;

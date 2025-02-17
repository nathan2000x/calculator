"use client";

import React, { useState, useCallback } from 'react';
import * as math from 'mathjs';

interface CalculatorProps {}

const Calculator: React.FC<CalculatorProps> = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string | number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleButtonClick = useCallback((value: string) => {
    if (value === '.' && input.includes('.')) {
      return;
    }
    setInput((prevInput) => prevInput + value);
    setError(null);
  }, [input]);

  const handleCalculate = useCallback(() => {
    try {
      if (input.trim() === "") {
        throw new Error("Please enter an expression.");
      }
      const calculatedResult = math.evaluate(input);
      setResult(calculatedResult);
      setError(null);
    } catch (error: any) {
      if (error.message === "Undefined symbol ") {
        setError("Invalid character or undefined symbol.");
      } else if (error.message === "Unexpected end of expression") {
        setError("Incomplete expression.");
      } else if (error.message === "Please enter an expression.") {
        setError("Please enter an expression.");
      } else {
        setError("Invalid expression.");
      }
      setResult(null);
    }
  }, [input]);

  const handleClear = useCallback(() => {
    setInput('');
    setResult(null);
    setError(null);
  }, []);

  const handlePowerOfTwo = useCallback(() => {
    try {
      const inputValue = parseFloat(input);
      if (isNaN(inputValue)) {
        throw new Error("Invalid input for power of 2.");
      }
      const calculatedResult = Math.pow(inputValue, 2);
      setResult(calculatedResult);
      setError(null);
      setInput(calculatedResult.toString())
    } catch (error: any) {
      setError(error.message);
      setResult(null);
    }
  }, [input]);

  const handleSquareRoot = useCallback(() => {
    try {
        const inputValue = parseFloat(input);
        if (isNaN(inputValue)) {
          throw new Error("Invalid input for square root.");
        }
        if (inputValue < 0) {
            throw new Error("Cannot calculate square root of a negative number.")
        }
        const calculatedResult = Math.sqrt(inputValue);
        setResult(calculatedResult);
        setError(null);
        setInput(calculatedResult.toString())
      } catch (error: any) {
        setError(error.message);
        setResult(null);
      }
  }, [input])

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '(', ')', '.'];

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md bg-white text-black">
      <h1 className="text-2xl font-bold mb-4 text-center text-black">Calculator</h1>
      <input
        type="text"
        value={input}
        readOnly
        className="w-full p-2 border rounded mb-2 text-black"
        placeholder="Enter expression"
      />
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => handleButtonClick(num.toString())}
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
          >
            {num}
          </button>
        ))}
        {operators.map((operator) => (
          <button
            key={operator}
            onClick={() => handleButtonClick(operator)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {operator}
          </button>
        ))}
        <button onClick={handlePowerOfTwo} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">x²</button>
        <button onClick={handleSquareRoot} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">√</button>
        <button
          onClick={handleClear}
          className="bg-red-500 text-white px-4 py-2 rounded col-span-2 hover:bg-red-600"
        >
          Clear
        </button>
        <button
          onClick={handleCalculate}
          className="bg-green-500 text-white px-4 py-2 rounded col-span-2 hover:bg-green-600"
        >
          Calculate
        </button>
      </div>
      {result !== null && (
        <div className="p-4 border rounded bg-gray-100 text-black">
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  );
};

export default Calculator;
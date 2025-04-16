import React, { useState, useRef } from 'react';
import { Upload, BarChart2, LineChart, ScatterChart as ScatterPlot, Github, Linkedin, Brain } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line, Scatter } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [jsonData, setJsonData] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation for demo purposes
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          setJsonData(data);
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  const getChartData = () => {
    if (!jsonData) return null;

    const labels = Object.keys(jsonData);
    const values = Object.values(jsonData);
    const total = values.reduce((acc: number, val: number) => acc + val, 0);

    return {
      labels,
      datasets: [{
        label: 'Data Points',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1
      }],
      total,
    };
  };

  const chartData = getChartData();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Welcome Back
            </h2>
            <p className="mt-2 text-gray-400">Please sign in to continue</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="text-gray-300">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 mt-1 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="text-gray-300">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 mt-1 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg py-2 px-4 hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
            Data Visualization Dashboard
          </h1>

          {/* Process Cards */}
          {!jsonData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all group hover:scale-105">
                <div className="text-blue-400 mb-4 group-hover:animate-pulse">
                  <Upload size={40} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Step 1</h3>
                <p className="text-gray-400">Upload your JSON data file</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all group hover:scale-105">
                <div className="text-green-400 mb-4 group-hover:animate-pulse">
                  <Brain size={40} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Step 2</h3>
                <p className="text-gray-400">Data is processed and analyzed</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all group hover:scale-105">
                <div className="text-purple-400 mb-4 group-hover:animate-pulse">
                  <BarChart2 size={40} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Step 3</h3>
                <p className="text-gray-400">View interactive visualizations</p>
              </div>
            </div>
          )}

          <div className="relative inline-block">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Upload size={20} />
              Upload JSON
            </button>
          </div>
        </div>

        {chartData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 className="text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Bar Chart</h2>
                <span className="text-sm text-blue-400">
                  ({((chartData.datasets[0].data.length / chartData.total) * 100).toFixed(1)}% of total)
                </span>
              </div>
              <Bar data={chartData} />
            </div>

            {/* Line Chart */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-center gap-2 mb-4">
                <LineChart className="text-green-400" />
                <h2 className="text-xl font-semibold text-white">Line Chart</h2>
                <span className="text-sm text-green-400">
                  ({((chartData.datasets[0].data.length / chartData.total) * 100).toFixed(1)}% of total)
                </span>
              </div>
              <Line data={chartData} />
            </div>

            {/* Scatter Plot */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <ScatterPlot className="text-pink-400" />
                <h2 className="text-xl font-semibold text-white">Scatter Plot</h2>
                <span className="text-sm text-pink-400">
                  ({((chartData.datasets[0].data.length / chartData.total) * 100).toFixed(1)}% of total)
                </span>
              </div>
              <Scatter data={chartData} />
            </div>
          </div>
        )}

        {!chartData && (
          <div className="text-center text-gray-400 mt-12">
            <p className="text-xl">Upload a JSON file to visualize your data</p>
            <p className="mt-2 text-sm">The JSON should be in key-value format with numeric values</p>
          </div>
        )}

        {/* Developer Section */}
        <div className="mt-16 text-center">
          <div className="bg-gray-800 p-8 rounded-xl shadow-xl inline-block">
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop"
              alt="Developer Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-purple-500"
            />
            <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              John Smith
            </h2>
            <p className="text-gray-300 mb-2">
              Artificial Intelligence and Data Science Student
            </p>
            <p className="text-gray-400 mb-4 text-sm">
              Passionate about data visualization and machine learning
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/vigneshgitz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/vignesh-r-05927b269/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
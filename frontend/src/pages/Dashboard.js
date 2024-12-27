import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/users/dashboard'); // API URL for fetching dashboard data
        setDashboardData(response.data); // Store the data in state
      } catch (error) {
        console.error('Error fetching dashboard data:', error); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false once the request is done
      }
    };

    fetchDashboard();
  }, []); // Empty array ensures the effect runs only once (on mount)

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Dashboard</h1>

      {loading ? (
        <p>Loading...</p> // Display loading state while data is being fetched
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4 border-b">Company Name</th>
              <th className="py-3 px-4 border-b">Last Five Communications</th>
              <th className="py-3 px-4 border-b">Next Scheduled</th>
              <th className="py-3 px-4 border-b">Highlight</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.map((data, index) => (
              <tr
                key={index}
                className={ // Apply highlight colors for overdue or due today
                  data.highlight === 'red'
                    ? 'bg-red-100'
                    : data.highlight === 'yellow'
                    ? 'bg-yellow-100'
                    : ''
                }
              >
                <td className="py-3 px-4 border-b font-bold text-gray-800">{data.companyName}</td>
                <td className="py-3 px-4 border-b">
                  {data.lastFiveCommunications.map((comm, idx) => (
                    <div key={idx}>
                      {comm.type} ({new Date(comm.date).toLocaleDateString()}) {/* Format date */}
                    </div>
                  ))}
                </td>
                <td className="py-3 px-4 border-b">
                  {data.nextScheduledCommunication
                    ? `${data.nextScheduledCommunication.type} (${new Date(
                        data.nextScheduledCommunication.date
                      ).toLocaleDateString()})` // Display next scheduled communication if available
                    : 'None'}
                </td>
                <td className="py-3 px-4 border-b text-center">
                  {data.highlight === 'red' ? 'Overdue' : data.highlight === 'yellow' ? 'Due Today' : 'None'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommunicationMethods = () => {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({});
  const [newMethod, setNewMethod] = useState({
    name: '',
    description: '',
    sequence: '',
    mandatory: false,
  });

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/communication-methods');
        setMethods(response.data);
      } catch (error) {
        console.error('Error fetching communication methods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMethods();
  }, []);

  const handleInputChange = (e, isEdit = false) => {
    const { name, value, type, checked } = e.target;
    if (isEdit) {
      setEditData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    } else {
      setNewMethod((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/communication-methods', newMethod);
      setMethods([...methods, response.data]);
      setNewMethod({ name: '', description: '', sequence: '', mandatory: false });
    } catch (error) {
      console.error('Error adding communication method:', error);
    }
  };

  const handleSave = async (methodId) => {
    try {
      const response = await axios.put(`http://localhost:5001/api/communication-methods/${methodId}`, editData);
      setMethods((prev) =>
        prev.map((method) => (method._id === methodId ? response.data : method))
      );
      setEditMode(null);
    } catch (error) {
      console.error('Error saving communication method:', error);
    }
  };

  const handleCancel = () => {
    setEditMode(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Communication Method Management</h1>

      {/* Add New Communication Method */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New Communication Method</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            value={newMethod.name}
            onChange={(e) => handleInputChange(e)}
            placeholder="Name"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="description"
            value={newMethod.description}
            onChange={(e) => handleInputChange(e)}
            placeholder="Description"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="sequence"
            value={newMethod.sequence}
            onChange={(e) => handleInputChange(e)}
            placeholder="Sequence"
            className="p-2 border rounded"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="mandatory"
              checked={newMethod.mandatory}
              onChange={(e) => handleInputChange(e)}
              className="w-4 h-4"
            />
            <span>Mandatory</span>
          </label>
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Communication Method
        </button>
      </div>

      {/* Communication Methods Table */}
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Description</th>
                <th className="py-3 px-4 border-b">Sequence</th>
                <th className="py-3 px-4 border-b">Mandatory</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {methods.map((method) =>
                editMode === method._id ? (
                  <tr key={method._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={(e) => handleInputChange(e, true)}
                        className="p-2 border rounded w-full"
                      />
                    </td>
                    <td className="py-3 px-4 border-b">
                      <input
                        type="text"
                        name="description"
                        value={editData.description}
                        onChange={(e) => handleInputChange(e, true)}
                        className="p-2 border rounded w-full"
                      />
                    </td>
                    <td className="py-3 px-4 border-b">
                      <input
                        type="number"
                        name="sequence"
                        value={editData.sequence}
                        onChange={(e) => handleInputChange(e, true)}
                        className="p-2 border rounded w-full"
                      />
                    </td>
                    <td className="py-3 px-4 border-b">
                      <input
                        type="checkbox"
                        name="mandatory"
                        checked={editData.mandatory}
                        onChange={(e) => handleInputChange(e, true)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="py-3 px-4 border-b space-x-2">
                      <button
                        onClick={() => handleSave(method._id)}
                        className="px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-3 py-1 text-xs font-semibold text-white bg-gray-500 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={method._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">{method.name}</td>
                    <td className="py-3 px-4 border-b">{method.description}</td>
                    <td className="py-3 px-4 border-b">{method.sequence}</td>
                    <td className="py-3 px-4 border-b">{method.mandatory ? 'Yes' : 'No'}</td>
                    <td className="py-3 px-4 border-b space-x-2">
                      <button
                        onClick={() => {
                          setEditMode(method._id);
                          setEditData({ ...method });
                        }}
                        className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            await axios.delete(`http://localhost:5001/api/communication-methods/${method._id}`);
                            setMethods(methods.filter((m) => m._id !== method._id));
                          } catch (error) {
                            console.error('Error deleting communication method:', error);
                          }
                        }}
                        className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CommunicationMethods;

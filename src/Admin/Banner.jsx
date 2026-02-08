import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBanner, updateBanner, deleteBanner, setBannerSchedule, toggleBannerActive } from '../apps/Reducers/bannerSlice';
import { Calendar, Clock, Upload, Trash2, Eye, EyeOff, Edit3 } from 'lucide-react';

function Banner() {
  const dispatch = useDispatch();
  const { banners, loading, error } = useSelector(state => state.banner);
  const [isDragOver, setIsDragOver] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    discount: '',
    startDate: '',
    endDate: ''
  });
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newBanner = {
            image: e.target.result,
            title: '',
            discount: '',
            isActive: true,
            startDate: null,
            endDate: null,
          };
          dispatch(addBanner(newBanner));
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner.id);
    setFormData({
      title: banner.title || '',
      discount: banner.discount || '',
      startDate: banner.startDate ? new Date(banner.startDate).toISOString().split('T')[0] : '',
      endDate: banner.endDate ? new Date(banner.endDate).toISOString().split('T')[0] : '',
    });
  };

  const handleSave = (bannerId) => {
    dispatch(updateBanner({
      id: bannerId,
      title: formData.title,
      discount: formData.discount,
      startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
      endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
    }));
    setEditingBanner(null);
    setFormData({ title: '', discount: '', startDate: '', endDate: '' });
  };

  const handleCancel = () => {
    setEditingBanner(null);
    setFormData({ title: '', discount: '', startDate: '', endDate: '' });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Banner Management</h1>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload New Banner</h2>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg text-gray-600 mb-2">
              Drag & drop banner images here, or{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                browse files
              </button>
            </p>
            <p className="text-sm text-gray-500">Supported formats: JPG, PNG, GIF</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* Banner List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Manage Banners ({banners.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preview
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {banners.map((banner) => (
                  <tr key={banner.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={banner.image}
                        alt="Banner preview"
                        className="h-16 w-24 object-cover rounded border"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingBanner === banner.id ? (
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          className="border rounded px-2 py-1 w-full"
                          placeholder="Banner title"
                        />
                      ) : (
                        <span className="text-sm font-medium text-gray-900">
                          {banner.title || 'No title'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingBanner === banner.id ? (
                        <input
                          type="text"
                          value={formData.discount}
                          onChange={(e) => setFormData({...formData, discount: e.target.value})}
                          className="border rounded px-2 py-1 w-full"
                          placeholder="Discount text"
                        />
                      ) : (
                        <span className="text-sm text-gray-500">
                          {banner.discount || 'No discount'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingBanner === banner.id ? (
                        <div className="space-y-2">
                          <div>
                            <label className="block text-xs text-gray-500">Start Date</label>
                            <input
                              type="date"
                              value={formData.startDate}
                              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                              className="border rounded px-2 py-1 w-full text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500">End Date</label>
                            <input
                              type="date"
                              value={formData.endDate}
                              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                              className="border rounded px-2 py-1 w-full text-sm"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(banner.startDate)} - {formatDate(banner.endDate)}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        banner.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {banner.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {editingBanner === banner.id ? (
                        <div className="space-x-2">
                          <button
                            onClick={() => handleSave(banner.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="space-x-2">
                          <button
                            onClick={() => handleEdit(banner)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit3 className="h-4 w-4 inline" />
                          </button>
                          <button
                            onClick={() => dispatch(toggleBannerActive(banner.id))}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            {banner.isActive ? <EyeOff className="h-4 w-4 inline" /> : <Eye className="h-4 w-4 inline" />}
                          </button>
                          <button
                            onClick={() => dispatch(deleteBanner(banner.id))}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4 inline" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {banners.length === 0 && (
            <div className="text-center py-12">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No banners</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by uploading your first banner.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Banner;

import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Search, 
  Filter, 
  MoreVertical,
  Eye,
  Download,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isUploading, setIsUploading] = useState(false);

  // Mock data - replace with actual API calls
  const documents = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals.pdf',
      filename: 'ml-fundamentals.pdf',
      size: '2.4 MB',
      status: 'completed',
      uploadDate: '2024-01-15',
      processedAt: '2024-01-15',
      knowledgePoints: 15,
      flashcards: 32
    },
    {
      id: 2,
      title: 'Deep Learning with PyTorch.pptx',
      filename: 'pytorch-deep-learning.pptx',
      size: '5.1 MB',
      status: 'processing',
      uploadDate: '2024-01-14',
      processedAt: null,
      knowledgePoints: 0,
      flashcards: 0
    },
    {
      id: 3,
      title: 'Neural Networks Lecture Notes.docx',
      filename: 'neural-networks-notes.docx',
      size: '1.8 MB',
      status: 'completed',
      uploadDate: '2024-01-13',
      processedAt: '2024-01-13',
      knowledgePoints: 8,
      flashcards: 24
    },
    {
      id: 4,
      title: 'Statistics for Data Science.pdf',
      filename: 'statistics-ds.pdf',
      size: '3.2 MB',
      status: 'failed',
      uploadDate: '2024-01-12',
      processedAt: null,
      knowledgePoints: 0,
      flashcards: 0
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing':
        return <Loader className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Processed';
      case 'processing':
        return 'Processing...';
      case 'failed':
        return 'Failed';
      default:
        return 'Pending';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'processing':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'failed':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => {
        setIsUploading(false);
        // Here you would typically call your upload API
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Upload and manage your study materials</p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <label className="relative cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept=".pdf,.ppt,.pptx,.doc,.docx,.txt"
              multiple
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2">
              {isUploading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Upload Documents</span>
                </>
              )}
            </div>
          </label>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Your Documents ({filteredDocuments.length})
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredDocuments.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Upload your first document to get started'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.ppt,.pptx,.doc,.docx,.txt"
                    multiple
                    onChange={handleFileUpload}
                  />
                  <div className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Upload Documents</span>
                  </div>
                </label>
              )}
            </div>
          ) : (
            filteredDocuments.map((document) => (
              <div key={document.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {document.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">{document.size}</span>
                        <span className="text-sm text-gray-500">
                          Uploaded {new Date(document.uploadDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* Status */}
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(document.status)}`}>
                      {getStatusIcon(document.status)}
                      <span>{getStatusText(document.status)}</span>
                    </div>
                    
                    {/* Stats */}
                    {document.status === 'completed' && (
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{document.knowledgePoints} knowledge points</span>
                        <span>{document.flashcards} flashcards</span>
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Upload Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Supported File Types</h3>
        <p className="text-blue-700 mb-4">
          Upload your study materials in the following formats for AI processing:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-blue-700">PDF documents</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-blue-700">PowerPoint presentations</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-blue-700">Word documents</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-blue-700">Text files</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
import React, { useState } from 'react';
import { 
  Brain, 
  Search, 
  Filter, 
  Plus,
  BookOpen,
  Target,
  TrendingUp,
  Star,
  Clock,
  ChevronRight,
  Tag,
  BarChart3
} from 'lucide-react';

const Knowledge = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedKnowledge, setSelectedKnowledge] = useState(null);

  // Mock data - replace with actual API calls
  const knowledgePoints = [
    {
      id: 1,
      title: "Neural Network Fundamentals",
      description: "Basic concepts of artificial neural networks including neurons, layers, and activation functions",
      content: "Neural networks are computing systems inspired by biological neural networks. They consist of interconnected nodes (neurons) organized in layers...",
      category: "Deep Learning",
      masteryLevel: 0.8,
      timesReviewed: 12,
      lastReviewed: "2024-01-15",
      difficulty: 2,
      tags: ["neural-networks", "fundamentals", "deep-learning"],
      prerequisites: [],
      relatedPoints: [2, 3],
      flashcards: 8,
      exercises: 3
    },
    {
      id: 2,
      title: "Backpropagation Algorithm",
      description: "The learning algorithm used to train neural networks by calculating gradients",
      content: "Backpropagation is a method used in artificial neural networks to calculate the gradient of the loss function...",
      category: "Deep Learning",
      masteryLevel: 0.6,
      timesReviewed: 8,
      lastReviewed: "2024-01-14",
      difficulty: 4,
      tags: ["backpropagation", "algorithms", "training"],
      prerequisites: [1],
      relatedPoints: [3, 4],
      flashcards: 12,
      exercises: 5
    },
    {
      id: 3,
      title: "Gradient Descent Optimization",
      description: "Optimization algorithm for finding the minimum of a function",
      content: "Gradient descent is a first-order iterative optimization algorithm for finding a local minimum of a differentiable function...",
      category: "Machine Learning",
      masteryLevel: 0.9,
      timesReviewed: 15,
      lastReviewed: "2024-01-13",
      difficulty: 3,
      tags: ["optimization", "gradient-descent", "algorithms"],
      prerequisites: [],
      relatedPoints: [2, 4],
      flashcards: 6,
      exercises: 4
    },
    {
      id: 4,
      title: "Convolutional Neural Networks",
      description: "Deep learning architecture particularly effective for image processing",
      content: "Convolutional Neural Networks (CNNs) are a class of deep neural networks most commonly applied to analyzing visual imagery...",
      category: "Deep Learning",
      masteryLevel: 0.4,
      timesReviewed: 5,
      lastReviewed: "2024-01-12",
      difficulty: 4,
      tags: ["cnn", "computer-vision", "deep-learning"],
      prerequisites: [1, 2],
      relatedPoints: [5],
      flashcards: 15,
      exercises: 7
    },
    {
      id: 5,
      title: "Transfer Learning",
      description: "Technique of using pre-trained models for new but related tasks",
      content: "Transfer learning is a machine learning technique where a model developed for one task is reused as the starting point...",
      category: "Machine Learning",
      masteryLevel: 0.3,
      timesReviewed: 3,
      lastReviewed: "2024-01-11",
      difficulty: 3,
      tags: ["transfer-learning", "pre-trained", "efficiency"],
      prerequisites: [4],
      relatedPoints: [],
      flashcards: 10,
      exercises: 2
    }
  ];

  const categories = ['all', ...new Set(knowledgePoints.map(kp => kp.category))];

  const filteredKnowledgePoints = knowledgePoints.filter(kp => {
    const matchesSearch = kp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || kp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getMasteryColor = (level) => {
    if (level >= 0.8) return 'text-green-600 bg-green-100';
    if (level >= 0.6) return 'text-yellow-600 bg-yellow-100';
    if (level >= 0.4) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getMasteryText = (level) => {
    if (level >= 0.8) return 'Mastered';
    if (level >= 0.6) return 'Good';
    if (level >= 0.4) return 'Learning';
    return 'Beginner';
  };

  const getDifficultyStars = (difficulty) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < difficulty ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const stats = {
    total: knowledgePoints.length,
    mastered: knowledgePoints.filter(kp => kp.masteryLevel >= 0.8).length,
    learning: knowledgePoints.filter(kp => kp.masteryLevel >= 0.4 && kp.masteryLevel < 0.8).length,
    beginner: knowledgePoints.filter(kp => kp.masteryLevel < 0.4).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Points</h1>
          <p className="text-gray-600">Track and master your learning concepts</p>
        </div>
        
        <button className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Knowledge Point
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Points</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Mastered</p>
              <p className="text-2xl font-bold text-green-600">{stats.mastered}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Learning</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.learning}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Beginner</p>
              <p className="text-2xl font-bold text-red-600">{stats.beginner}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search knowledge points..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Knowledge Points List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredKnowledgePoints.map((kp) => (
            <div
              key={kp.id}
              className={`bg-white rounded-xl border-2 p-6 cursor-pointer transition-all duration-200 ${
                selectedKnowledge?.id === kp.id 
                  ? 'border-blue-500 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedKnowledge(kp)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                      {kp.category}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getMasteryColor(kp.masteryLevel)}`}>
                      {getMasteryText(kp.masteryLevel)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{kp.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{kp.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <span>Difficulty:</span>
                      <div className="flex space-x-1">
                        {getDifficultyStars(kp.difficulty)}
                      </div>
                    </div>
                    <span>Reviewed {kp.timesReviewed} times</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{kp.flashcards} flashcards</span>
                    <span>{kp.exercises} exercises</span>
                    <span>Last: {new Date(kp.lastReviewed).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {kp.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded flex items-center">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
              </div>
              
              {/* Mastery Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500">Mastery Progress</span>
                  <span className="text-xs text-gray-500">{Math.round(kp.masteryLevel * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${kp.masteryLevel * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Knowledge Point Detail */}
        <div className="lg:col-span-1">
          {selectedKnowledge ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {selectedKnowledge.title}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Content</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedKnowledge.content}
                  </p>
                </div>
                
                {selectedKnowledge.prerequisites.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Prerequisites</h4>
                    <div className="space-y-1">
                      {selectedKnowledge.prerequisites.map(prereqId => {
                        const prereq = knowledgePoints.find(kp => kp.id === prereqId);
                        return prereq ? (
                          <div key={prereqId} className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                            → {prereq.title}
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
                
                {selectedKnowledge.relatedPoints.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Related Topics</h4>
                    <div className="space-y-1">
                      {selectedKnowledge.relatedPoints.map(relatedId => {
                        const related = knowledgePoints.find(kp => kp.id === relatedId);
                        return related ? (
                          <div key={relatedId} className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                            → {related.title}
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Study Flashcards
                    </button>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                      Practice Exercises
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Knowledge Point</h3>
              <p className="text-gray-600">
                Click on any knowledge point to view detailed information and related content.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Knowledge;
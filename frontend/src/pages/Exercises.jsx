import React, { useState } from 'react';
import { 
  Target, 
  Play, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Award,
  BarChart3,
  Filter,
  Search,
  BookOpen
} from 'lucide-react';

const Exercises = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Mock data - replace with actual API calls
  const exercises = [
    {
      id: 1,
      title: "Neural Network Basics Quiz",
      question: "What is the primary function of an activation function in a neural network?",
      type: "multiple_choice",
      difficulty: "beginner",
      options: [
        "To initialize weights randomly",
        "To introduce non-linearity into the network",
        "To calculate the loss function",
        "To perform backpropagation"
      ],
      correctAnswer: "To introduce non-linearity into the network",
      explanation: "Activation functions introduce non-linearity into neural networks, allowing them to learn complex patterns and relationships in data. Without activation functions, a neural network would be equivalent to a linear regression model.",
      category: "Deep Learning",
      timeLimit: 300, // 5 minutes
      attempts: 2,
      isCorrect: true,
      completed: true
    },
    {
      id: 2,
      title: "Gradient Descent Implementation",
      question: "Implement a simple gradient descent algorithm to minimize the function f(x) = x² + 2x + 1. What would be the update rule for x?",
      type: "short_answer",
      difficulty: "intermediate",
      correctAnswer: "x = x - α(2x + 2)",
      explanation: "The gradient of f(x) = x² + 2x + 1 is f'(x) = 2x + 2. The gradient descent update rule is x = x - α * gradient, where α is the learning rate.",
      category: "Machine Learning",
      timeLimit: 600, // 10 minutes
      attempts: 1,
      isCorrect: false,
      completed: true
    },
    {
      id: 3,
      title: "CNN Architecture Design",
      question: "Design a CNN architecture for image classification with 32x32 RGB images. Describe the layers and their parameters.",
      type: "essay",
      difficulty: "advanced",
      correctAnswer: "Sample architecture: Conv2D(32, 3x3) -> ReLU -> MaxPool(2x2) -> Conv2D(64, 3x3) -> ReLU -> MaxPool(2x2) -> Flatten -> Dense(128) -> ReLU -> Dense(10) -> Softmax",
      explanation: "A typical CNN for 32x32 images starts with convolutional layers to extract features, followed by pooling layers to reduce dimensionality, and ends with fully connected layers for classification.",
      category: "Deep Learning",
      timeLimit: 1200, // 20 minutes
      attempts: 0,
      isCorrect: null,
      completed: false
    },
    {
      id: 4,
      title: "Overfitting Prevention",
      question: "Which of the following techniques can help prevent overfitting in machine learning models?",
      type: "multiple_choice",
      difficulty: "intermediate",
      options: [
        "Increasing model complexity",
        "Using more training data",
        "Reducing regularization",
        "All of the above"
      ],
      correctAnswer: "Using more training data",
      explanation: "Using more training data helps prevent overfitting by providing the model with more examples to learn from, making it less likely to memorize specific patterns in the training set.",
      category: "Machine Learning",
      timeLimit: 240, // 4 minutes
      attempts: 0,
      isCorrect: null,
      completed: false
    }
  ];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'all' || exercise.difficulty === filterDifficulty;
    const matchesType = filterType === 'all' || exercise.type === filterType;
    return matchesSearch && matchesDifficulty && matchesType;
  });

  const stats = {
    total: exercises.length,
    completed: exercises.filter(ex => ex.completed).length,
    correct: exercises.filter(ex => ex.isCorrect === true).length,
    accuracy: exercises.filter(ex => ex.completed).length > 0 
      ? Math.round((exercises.filter(ex => ex.isCorrect === true).length / exercises.filter(ex => ex.completed).length) * 100)
      : 0
  };

  const handleSubmitAnswer = () => {
    if (!selectedExercise || !userAnswer.trim()) return;
    
    // Here you would typically call your API to submit the answer
    const isCorrect = userAnswer.toLowerCase().trim() === selectedExercise.correctAnswer.toLowerCase().trim();
    setShowResult(true);
    
    // Update exercise status (in real app, this would be done via API)
    selectedExercise.isCorrect = isCorrect;
    selectedExercise.completed = true;
    selectedExercise.attempts += 1;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'multiple_choice':
        return <Target className="w-4 h-4" />;
      case 'short_answer':
        return <BookOpen className="w-4 h-4" />;
      case 'essay':
        return <BarChart3 className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  if (selectedExercise) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedExercise(null);
              setUserAnswer('');
              setShowResult(false);
            }}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Exercises
          </button>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{Math.floor(selectedExercise.timeLimit / 60)} min</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(selectedExercise.difficulty)}`}>
              {selectedExercise.difficulty}
            </span>
          </div>
        </div>

        {/* Exercise Content */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedExercise.title}</h1>
            <p className="text-gray-600">{selectedExercise.category}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Question</h2>
            <p className="text-gray-700 leading-relaxed">{selectedExercise.question}</p>
          </div>

          {/* Answer Section */}
          {!showResult ? (
            <div className="space-y-6">
              {selectedExercise.type === 'multiple_choice' ? (
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-4">Select your answer:</h3>
                  <div className="space-y-3">
                    {selectedExercise.options.map((option, index) => (
                      <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="answer"
                          value={option}
                          checked={userAnswer === option}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-4">Your answer:</h3>
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={selectedExercise.type === 'essay' ? 8 : 4}
                  />
                </div>
              )}

              <button
                onClick={handleSubmitAnswer}
                disabled={!userAnswer.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Result */}
              <div className={`p-6 rounded-lg border-2 ${
                selectedExercise.isCorrect 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center space-x-3 mb-4">
                  {selectedExercise.isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                  <h3 className={`text-lg font-semibold ${
                    selectedExercise.isCorrect ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {selectedExercise.isCorrect ? 'Correct!' : 'Incorrect'}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Your Answer:</p>
                    <p className="text-gray-900">{userAnswer}</p>
                  </div>
                  
                  {!selectedExercise.isCorrect && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Correct Answer:</p>
                      <p className="text-gray-900">{selectedExercise.correctAnswer}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Explanation</h3>
                <p className="text-blue-800 leading-relaxed">{selectedExercise.explanation}</p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setSelectedExercise(null);
                    setUserAnswer('');
                    setShowResult(false);
                  }}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Back to Exercises
                </button>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Next Exercise
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exercises</h1>
          <p className="text-gray-600">Practice and test your knowledge</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Exercises</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Correct</p>
              <p className="text-2xl font-bold text-purple-600">{stats.correct}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Accuracy</p>
              <p className="text-2xl font-bold text-orange-600">{stats.accuracy}%</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-600" />
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
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="multiple_choice">Multiple Choice</option>
              <option value="short_answer">Short Answer</option>
              <option value="essay">Essay</option>
            </select>
          </div>
        </div>
      </div>

      {/* Exercises List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExercises.map((exercise) => (
          <div key={exercise.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </span>
                <div className="flex items-center space-x-1 text-gray-500">
                  {getTypeIcon(exercise.type)}
                  <span className="text-xs">{exercise.type.replace('_', ' ')}</span>
                </div>
              </div>
              
              {exercise.completed && (
                <div className="flex items-center space-x-1">
                  {exercise.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{exercise.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{exercise.question}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{exercise.category}</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{Math.floor(exercise.timeLimit / 60)} min</span>
                </div>
                {exercise.attempts > 0 && (
                  <span>Attempts: {exercise.attempts}</span>
                )}
              </div>
              
              <button
                onClick={() => setSelectedExercise(exercise)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center"
              >
                <Play className="w-4 h-4 mr-2" />
                {exercise.completed ? 'Review' : 'Start'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No exercises found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria to find exercises.
          </p>
        </div>
      )}
    </div>
  );
};

export default Exercises;
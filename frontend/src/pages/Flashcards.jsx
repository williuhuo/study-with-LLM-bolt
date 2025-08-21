import React, { useState } from 'react';
import { 
  Zap, 
  Play, 
  RotateCcw, 
  Eye, 
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  Target,
  TrendingUp
} from 'lucide-react';

const Flashcards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studyMode, setStudyMode] = useState(false);

  // Mock data - replace with actual API calls
  const flashcards = [
    {
      id: 1,
      front: "What is the primary purpose of backpropagation in neural networks?",
      back: "Backpropagation is used to calculate gradients of the loss function with respect to the network's weights, enabling the network to learn by adjusting weights to minimize error.",
      difficulty: "intermediate",
      dueDate: "2024-01-16",
      interval: 3,
      easeFactor: 2.5,
      reviews: 5,
      correctReviews: 4,
      tags: ["neural-networks", "deep-learning", "algorithms"]
    },
    {
      id: 2,
      front: "Explain the vanishing gradient problem",
      back: "The vanishing gradient problem occurs when gradients become exponentially small as they propagate back through deep networks, making it difficult for early layers to learn effectively.",
      difficulty: "advanced",
      dueDate: "2024-01-16",
      interval: 1,
      easeFactor: 2.2,
      reviews: 3,
      correctReviews: 2,
      tags: ["neural-networks", "deep-learning", "problems"]
    },
    {
      id: 3,
      front: "What is the difference between supervised and unsupervised learning?",
      back: "Supervised learning uses labeled data to train models for prediction tasks, while unsupervised learning finds patterns in unlabeled data without specific target outputs.",
      difficulty: "beginner",
      dueDate: "2024-01-17",
      interval: 7,
      easeFactor: 2.8,
      reviews: 8,
      correctReviews: 7,
      tags: ["machine-learning", "fundamentals"]
    }
  ];

  const dueCards = flashcards.filter(card => new Date(card.dueDate) <= new Date());
  const totalCards = flashcards.length;
  const masteredCards = flashcards.filter(card => card.easeFactor > 2.5).length;

  const handleCardReview = (score) => {
    // Here you would typically call your API to update the card's spaced repetition data
    console.log(`Reviewed card ${flashcards[currentCard].id} with score ${score}`);
    
    // Move to next card or end session
    if (currentCard < dueCards.length - 1) {
      setCurrentCard(currentCard + 1);
      setShowAnswer(false);
    } else {
      setStudyMode(false);
      setCurrentCard(0);
      setShowAnswer(false);
    }
  };

  const startStudySession = () => {
    setStudyMode(true);
    setCurrentCard(0);
    setShowAnswer(false);
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

  if (studyMode && dueCards.length > 0) {
    const card = dueCards[currentCard];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Card {currentCard + 1} of {dueCards.length}
              </span>
              <button
                onClick={() => setStudyMode(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Exit Session
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentCard + 1) / dueCards.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Flashcard */}
          <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[400px] flex flex-col justify-center">
            <div className="text-center">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border mb-6 ${getDifficultyColor(card.difficulty)}`}>
                {card.difficulty}
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {showAnswer ? 'Answer' : 'Question'}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {showAnswer ? card.back : card.front}
                </p>
              </div>

              {!showAnswer ? (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center mx-auto"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Show Answer
                </button>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">How well did you know this?</p>
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => handleCardReview(1)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
                    >
                      Again
                    </button>
                    <button
                      onClick={() => handleCardReview(2)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                    >
                      Hard
                    </button>
                    <button
                      onClick={() => handleCardReview(3)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                      Good
                    </button>
                    <button
                      onClick={() => handleCardReview(4)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
                    >
                      Easy
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card Info */}
          <div className="mt-6 bg-white rounded-xl p-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Reviews: {card.reviews} ({card.correctReviews} correct)</span>
              <span>Interval: {card.interval} days</span>
              <span>Ease: {card.easeFactor.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Flashcards</h1>
          <p className="text-gray-600">Review and master your knowledge with spaced repetition</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Cards</p>
              <p className="text-2xl font-bold text-gray-900">{totalCards}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Due Today</p>
              <p className="text-2xl font-bold text-orange-600">{dueCards.length}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Mastered</p>
              <p className="text-2xl font-bold text-green-600">{masteredCards}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Accuracy</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round((flashcards.reduce((acc, card) => acc + card.correctReviews, 0) / 
                flashcards.reduce((acc, card) => acc + card.reviews, 0)) * 100)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Study Session */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Ready to Study?</h2>
            <p className="text-blue-100">
              You have {dueCards.length} cards due for review. Start your session now!
            </p>
          </div>
          <button
            onClick={startStudySession}
            disabled={dueCards.length === 0}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Session
          </button>
        </div>
      </div>

      {/* Flashcards List */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Flashcards</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {flashcards.map((card) => (
            <div key={card.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(card.difficulty)}`}>
                      {card.difficulty}
                    </span>
                    {new Date(card.dueDate) <= new Date() && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
                        Due
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    {card.front}
                  </h3>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Reviews: {card.reviews}</span>
                    <span>Accuracy: {Math.round((card.correctReviews / card.reviews) * 100)}%</span>
                    <span>Next: {new Date(card.dueDate).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {card.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  BookOpen, 
  Zap, 
  Brain, 
  Target, 
  TrendingUp, 
  Clock,
  FileText,
  Users,
  Award,
  Calendar
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Documents',
      value: '12',
      change: '+2 this week',
      changeType: 'positive',
      icon: FileText,
      color: 'blue'
    },
    {
      name: 'Flashcards',
      value: '248',
      change: '+18 today',
      changeType: 'positive',
      icon: Zap,
      color: 'purple'
    },
    {
      name: 'Knowledge Points',
      value: '89',
      change: '+5 this week',
      changeType: 'positive',
      icon: Brain,
      color: 'green'
    },
    {
      name: 'Study Streak',
      value: '7 days',
      change: 'Keep it up!',
      changeType: 'positive',
      icon: Award,
      color: 'orange'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'document',
      title: 'Machine Learning Basics.pdf',
      action: 'uploaded',
      time: '2 hours ago',
      icon: FileText
    },
    {
      id: 2,
      type: 'flashcard',
      title: 'Neural Networks',
      action: 'reviewed 15 cards',
      time: '4 hours ago',
      icon: Zap
    },
    {
      id: 3,
      type: 'knowledge',
      title: 'Deep Learning Concepts',
      action: 'added knowledge point',
      time: '1 day ago',
      icon: Brain
    },
    {
      id: 4,
      type: 'exercise',
      title: 'Linear Algebra Quiz',
      action: 'completed',
      time: '2 days ago',
      icon: Target
    }
  ];

  const upcomingReviews = [
    { id: 1, title: 'Gradient Descent', due: 'Due now', urgent: true },
    { id: 2, title: 'Backpropagation', due: 'Due in 1 hour', urgent: false },
    { id: 3, title: 'CNN Architecture', due: 'Due in 3 hours', urgent: false },
    { id: 4, title: 'RNN vs LSTM', due: 'Due tomorrow', urgent: false }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.full_name || user?.username}! 👋
        </h1>
        <p className="text-blue-100">
          Ready to continue your learning journey? You have 4 flashcards due for review.
        </p>
        <div className="mt-4 flex space-x-4">
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Start Review Session
          </button>
          <button className="border border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
            Upload Document
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            purple: 'bg-purple-100 text-purple-600',
            green: 'bg-green-100 text-green-600',
            orange: 'bg-orange-100 text-orange-600'
          };

          return (
            <div key={stat.name} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action} <span className="font-normal">"{activity.title}"</span>
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming Reviews */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Reviews</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {upcomingReviews.map((review) => (
                <div key={review.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{review.title}</p>
                    <p className={`text-xs ${review.urgent ? 'text-red-600' : 'text-gray-500'}`}>
                      {review.due}
                    </p>
                  </div>
                  {review.urgent && (
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
              View All Reviews
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">Upload Document</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Zap className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-gray-900">Create Flashcard</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Brain className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-900">Add Knowledge</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Target className="w-5 h-5 text-orange-600" />
            <span className="font-medium text-gray-900">Practice Exercise</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
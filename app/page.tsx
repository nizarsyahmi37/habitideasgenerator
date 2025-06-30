'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, Heart, Brain, Zap, Clock, Target, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const habits = {
  health: [
    { habit: "Drink a glass of water upon waking", time: "1 min", difficulty: "Easy" },
    { habit: "Take 10 deep breaths before meals", time: "2 min", difficulty: "Easy" },
    { habit: "Do 5 push-ups during TV commercial breaks", time: "1 min", difficulty: "Medium" },
    { habit: "Walk for 2 minutes every hour", time: "2 min", difficulty: "Easy" },
    { habit: "Eat one piece of fruit with breakfast", time: "3 min", difficulty: "Easy" },
    { habit: "Stretch for 30 seconds after sitting", time: "30 sec", difficulty: "Easy" },
    { habit: "Take the stairs instead of elevator", time: "2 min", difficulty: "Easy" },
    { habit: "Do wall push-ups while waiting for coffee", time: "1 min", difficulty: "Easy" },
    { habit: "Park farther away to walk more", time: "3 min", difficulty: "Easy" },
    { habit: "Replace one soda with water daily", time: "0 min", difficulty: "Medium" },
    { habit: "Do calf raises while brushing teeth", time: "2 min", difficulty: "Easy" },
    { habit: "Take a 5-minute walk after lunch", time: "5 min", difficulty: "Easy" },
    { habit: "Do shoulder rolls every hour", time: "30 sec", difficulty: "Easy" },
    { habit: "Eat a handful of nuts as a snack", time: "2 min", difficulty: "Easy" },
    { habit: "Stand up and stretch during phone calls", time: "1 min", difficulty: "Easy" },
    { habit: "Do 10 jumping jacks before shower", time: "1 min", difficulty: "Easy" },
    { habit: "Take 3 deep breaths before starting car", time: "30 sec", difficulty: "Easy" },
    { habit: "Drink herbal tea instead of late coffee", time: "3 min", difficulty: "Medium" },
    { habit: "Do ankle circles while watching TV", time: "1 min", difficulty: "Easy" },
    { habit: "Add vegetables to one meal daily", time: "2 min", difficulty: "Easy" }
  ],
  productivity: [
    { habit: "Write down 3 priorities before starting work", time: "2 min", difficulty: "Easy" },
    { habit: "Clear your desk before leaving work", time: "3 min", difficulty: "Easy" },
    { habit: "Check email only at designated times", time: "0 min", difficulty: "Hard" },
    { habit: "Use a timer for focused 25-minute work blocks", time: "25 min", difficulty: "Medium" },
    { habit: "Review tomorrow's schedule before bed", time: "3 min", difficulty: "Easy" },
    { habit: "Turn off phone notifications during deep work", time: "0 min", difficulty: "Medium" },
    { habit: "Write one sentence in a daily journal", time: "1 min", difficulty: "Easy" },
    { habit: "Prepare clothes for tomorrow before sleep", time: "3 min", difficulty: "Easy" },
    { habit: "Do the hardest task first thing in morning", time: "varies", difficulty: "Hard" },
    { habit: "Set a daily intention when you wake up", time: "1 min", difficulty: "Easy" },
    { habit: "Use the 2-minute rule for small tasks", time: "2 min", difficulty: "Medium" },
    { habit: "Batch similar tasks together", time: "varies", difficulty: "Medium" },
    { habit: "Take notes during every meeting", time: "ongoing", difficulty: "Easy" },
    { habit: "Archive or delete emails immediately after reading", time: "30 sec", difficulty: "Medium" },
    { habit: "Set a timer for social media use", time: "varies", difficulty: "Hard" },
    { habit: "Create a shutdown ritual for work", time: "5 min", difficulty: "Medium" },
    { habit: "Keep a running list of accomplishments", time: "2 min", difficulty: "Easy" },
    { habit: "Use keyboard shortcuts instead of mouse", time: "0 min", difficulty: "Medium" },
    { habit: "Schedule important tasks for your peak energy time", time: "2 min", difficulty: "Medium" },
    { habit: "Practice saying 'no' to non-essential requests", time: "0 min", difficulty: "Hard" }
  ],
  mindfulness: [
    { habit: "Take 3 conscious breaths before meals", time: "1 min", difficulty: "Easy" },
    { habit: "Notice 5 things you can see right now", time: "2 min", difficulty: "Easy" },
    { habit: "Express gratitude for one thing daily", time: "1 min", difficulty: "Easy" },
    { habit: "Listen to sounds around you for 1 minute", time: "1 min", difficulty: "Easy" },
    { habit: "Feel your feet on the ground when walking", time: "ongoing", difficulty: "Easy" },
    { habit: "Pause and breathe before responding to texts", time: "30 sec", difficulty: "Medium" },
    { habit: "Notice the temperature and texture of your food", time: "ongoing", difficulty: "Easy" },
    { habit: "Take one mindful sip of your morning beverage", time: "30 sec", difficulty: "Easy" },
    { habit: "Observe your thoughts without judgment for 2 minutes", time: "2 min", difficulty: "Medium" },
    { habit: "Practice loving-kindness toward one person daily", time: "2 min", difficulty: "Medium" },
    { habit: "Notice your breathing without changing it", time: "1 min", difficulty: "Easy" },
    { habit: "Appreciate one beautiful thing you see today", time: "30 sec", difficulty: "Easy" },
    { habit: "Feel gratitude for your body's functions", time: "1 min", difficulty: "Easy" },
    { habit: "Practice patience in one daily situation", time: "ongoing", difficulty: "Medium" },
    { habit: "Notice physical sensations without reacting", time: "1 min", difficulty: "Medium" },
    { habit: "Send kind thoughts to someone you're frustrated with", time: "1 min", difficulty: "Hard" },
    { habit: "Observe emotions as they arise without judgment", time: "ongoing", difficulty: "Hard" },
    { habit: "Practice single-tasking for one activity daily", time: "varies", difficulty: "Medium" },
    { habit: "Notice the space between your thoughts", time: "2 min", difficulty: "Hard" },
    { habit: "Appreciate the present moment before sleep", time: "2 min", difficulty: "Easy" }
  ]
};

const categoryIcons = {
  health: Heart,
  productivity: Zap,
  mindfulness: Brain
};

const categoryColors = {
  health: "bg-red-50 border-red-200 text-red-800",
  productivity: "bg-blue-50 border-blue-200 text-blue-800",
  mindfulness: "bg-purple-50 border-purple-200 text-purple-800"
};

const difficultyColors = {
  Easy: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Hard: "bg-red-100 text-red-800"
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof habits>('health');
  const [currentHabit, setCurrentHabit] = useState(habits.health[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateRandomHabit = (category: keyof typeof habits) => {
    setIsAnimating(true);
    setTimeout(() => {
      const categoryHabits = habits[category];
      const randomIndex = Math.floor(Math.random() * categoryHabits.length);
      setCurrentHabit(categoryHabits[randomIndex]);
      setIsAnimating(false);
    }, 200);
  };

  useEffect(() => {
    setCurrentHabit(habits[selectedCategory][0]);
  }, [selectedCategory]);

  const Icon = categoryIcons[selectedCategory];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Bolt.new Badge */}
      <div className="fixed top-4 right-4 z-50">
        <a 
          href="https://bolt.new/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-[100px] h-[100px] transition-transform hover:scale-105"
        >
          <img 
            src="/black_circle_360x360.svg" 
            alt="Built with Bolt.new" 
            className="w-full h-full animate-spin"
            style={{ animationDuration: '10s' }}
          />
        </a>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              Habit Ideas Generator
            </h1>
            <Sparkles className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover micro habits that take just minutes but create lasting change. 
            Small actions, big transformations.
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as keyof typeof habits)} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm border">
            <TabsTrigger value="health" className="flex items-center gap-2 data-[state=active]:bg-red-50 data-[state=active]:text-red-700">
              <Heart className="w-4 h-4" />
              Health
            </TabsTrigger>
            <TabsTrigger value="productivity" className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              <Zap className="w-4 h-4" />
              Productivity
            </TabsTrigger>
            <TabsTrigger value="mindfulness" className="flex items-center gap-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              <Brain className="w-4 h-4" />
              Mindfulness
            </TabsTrigger>
          </TabsList>

          {/* Current Habit Display */}
          <div className="mt-8">
            <Card className={`${categoryColors[selectedCategory]} border-2 shadow-lg transition-all duration-300 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Icon className="w-8 h-8" />
                  <CardTitle className="text-2xl font-bold capitalize">
                    {selectedCategory} Habit
                  </CardTitle>
                </div>
                <CardDescription className="text-base opacity-80">
                  Your micro habit for today
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
                  <p className="text-xl md:text-2xl font-semibold text-slate-800 leading-relaxed">
                    {currentHabit.habit}
                  </p>
                </div>
                
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                    <Clock className="w-3 h-3" />
                    {currentHabit.time}
                  </Badge>
                  <Badge variant="secondary" className={`flex items-center gap-1 px-3 py-1 ${difficultyColors[currentHabit.difficulty as keyof typeof difficultyColors]}`}>
                    <Target className="w-3 h-3" />
                    {currentHabit.difficulty}
                  </Badge>
                </div>

                <Button 
                  onClick={() => generateRandomHabit(selectedCategory)}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  disabled={isAnimating}
                >
                  <RefreshCw className={`w-5 h-5 mr-2 ${isAnimating ? 'animate-spin' : ''}`} />
                  Generate New Habit
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Category Content */}
          {Object.entries(habits).map(([category, categoryHabits]) => (
            <TabsContent key={category} value={category} className="mt-8">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {React.createElement(categoryIcons[category as keyof typeof categoryIcons], { className: "w-5 h-5" })}
                    All {category.charAt(0).toUpperCase() + category.slice(1)} Habits
                  </CardTitle>
                  <CardDescription>
                    Browse through our curated collection of {category} micro habits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {categoryHabits.map((habit, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200 cursor-pointer group"
                        onClick={() => setCurrentHabit(habit)}
                      >
                        <div className="flex-1">
                          <p className="font-medium text-slate-800 group-hover:text-slate-900">
                            {habit.habit}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge variant="outline" className="text-xs">
                            {habit.time}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${difficultyColors[habit.difficulty as keyof typeof difficultyColors]}`}>
                            {habit.difficulty}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-slate-200">
          <p className="text-slate-500 text-sm">
            Start small, think big. Every habit is a vote for the person you want to become.
          </p>
        </div>
      </div>
    </div>
  );
}
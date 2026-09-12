/**
 * Curated Lifestyle & Dating Interests
 */

import { InterestItem } from '../types/profile';

export const INTERESTS_LIST: InterestItem[] = [
  { id: 'music', name: 'Music', icon: '🎵', category: 'entertainment' },
  { id: 'movies', name: 'Movies', icon: '🎬', category: 'entertainment' },
  { id: 'travel', name: 'Travel', icon: '✈️', category: 'lifestyle' },
  { id: 'fitness', name: 'Fitness', icon: '🏋️', category: 'activity' },
  { id: 'gaming', name: 'Gaming', icon: '🎮', category: 'entertainment' },
  { id: 'food', name: 'Foodie', icon: '🍜', category: 'lifestyle' },
  { id: 'photography', name: 'Photography', icon: '📸', category: 'creativity' },
  { id: 'reading', name: 'Reading', icon: '📚', category: 'creativity' },
  { id: 'technology', name: 'Technology', icon: '💻', category: 'lifestyle' },
  { id: 'sports', name: 'Sports', icon: '⚽', category: 'activity' },
  { id: 'art', name: 'Art & Design', icon: '🎨', category: 'creativity' },
  { id: 'cooking', name: 'Cooking', icon: '🍳', category: 'lifestyle' },
  { id: 'hiking', name: 'Hiking', icon: '⛰️', category: 'activity' },
  { id: 'fashion', name: 'Fashion', icon: '👗', category: 'lifestyle' },
  { id: 'coffee', name: 'Coffee', icon: '☕', category: 'lifestyle' },
  { id: 'nature', name: 'Nature', icon: '🌿', category: 'activity' },
];

export const DATING_INTENT_OPTIONS = [
  {
    id: 'relationship',
    title: 'Relationship',
    subtitle: 'Looking for something serious and long-term',
    icon: '💍',
  },
  {
    id: 'long_term',
    title: 'Long-term open to short',
    subtitle: 'Ready for commitment, taking it day by day',
    icon: '💖',
  },
  {
    id: 'casual',
    title: 'Casual Dating',
    subtitle: 'Fun dates and seeing where things go',
    icon: '🥂',
  },
  {
    id: 'friendship',
    title: 'New Friends',
    subtitle: 'Expanding social circle and good vibes',
    icon: '✨',
  },
] as const;

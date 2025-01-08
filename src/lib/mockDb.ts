import { KnowledgeArticle } from '../types/knowledge';

// Mock knowledge base data
const knowledgeBaseData: KnowledgeArticle[] = [
  {
    id: '1',
    title: 'Sustainable Fertilizer Practices',
    content: 'Learn about the best practices for sustainable fertilizer application...',
    category: 'Fertilizers',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Soil Health Management',
    content: 'Understanding and maintaining soil health is crucial for sustainable farming...',
    category: 'Soil Management',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Weather Impact on Farming',
    content: 'How weather patterns affect your farming decisions...',
    category: 'Weather',
    created_at: new Date().toISOString()
  }
];

// Mock database functions
export const mockDb = {
  knowledgeBase: {
    getAll: async (): Promise<KnowledgeArticle[]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(knowledgeBaseData);
        }, 500); // Simulate network delay
      });
    }
  }
};
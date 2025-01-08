import React from 'react';
import { useQuery } from 'react-query';
import { Book, Bookmark } from 'lucide-react';
import { mockDb } from '../../lib/mockDb';
import { KnowledgeArticle } from '../../types/knowledge';

export function KnowledgeBase() {
  const { data: articles, isLoading, error } = useQuery<KnowledgeArticle[]>(
    'knowledge-base',
    () => mockDb.knowledgeBase.getAll()
  );

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600">
        Error loading knowledge base. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Book className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-900">Knowledge Base</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles?.map((article) => (
          <div
            key={article.id}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">
                  {article.category}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(article.created_at).toLocaleDateString()}
              </span>
            </div>
            
            <h3 className="mt-2 text-lg font-semibold text-gray-900">
              {article.title}
            </h3>
            
            <p className="mt-2 text-gray-600 line-clamp-3">
              {article.content}
            </p>
            
            <button className="mt-4 text-green-600 hover:text-green-700 text-sm font-medium">
              Read More →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
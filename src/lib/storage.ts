import { User, SoilData, FertilizerRecommendation } from '../types';

interface StorageData {
  users: User[];
  currentUser: User | null;
  soilRecords: {
    userId: string;
    data: SoilData;
    timestamp: string;
  }[];
  recommendations: FertilizerRecommendation[];
}

const STORAGE_KEY = 'sustainable-farming-data';

function getInitialData(): StorageData {
  return {
    users: [],
    currentUser: null,
    soilRecords: [],
    recommendations: []
  };
}

function getData(): StorageData {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : getInitialData();
}

function saveData(data: StorageData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const storage = {
  // User management
  registerUser(email: string, password: string, fullName: string, farmLocation: string): User {
    const data = getData();
    const existingUser = data.users.find(u => u.email === email);
    
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      fullName,
      farmLocation
    };

    data.users.push(newUser);
    data.currentUser = newUser;
    saveData(data);
    return newUser;
  },

  login(email: string, password: string): User {
    const data = getData();
    const user = data.users.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    data.currentUser = user;
    saveData(data);
    return user;
  },

  logout(): void {
    const data = getData();
    data.currentUser = null;
    saveData(data);
  },

  getCurrentUser(): User | null {
    return getData().currentUser;
  },

  // Soil records
  saveSoilRecord(userId: string, soilData: SoilData): void {
    const data = getData();
    data.soilRecords.push({
      userId,
      data: soilData,
      timestamp: new Date().toISOString()
    });
    saveData(data);
  },

  getSoilRecords(userId: string) {
    const data = getData();
    return data.soilRecords.filter(record => record.userId === userId);
  },

  // Recommendations
  saveRecommendation(recommendation: FertilizerRecommendation): void {
    const data = getData();
    data.recommendations.push(recommendation);
    saveData(data);
  },

  getRecommendations(userId: string) {
    const data = getData();
    return data.recommendations.filter(rec => rec.userId === userId);
  }
};
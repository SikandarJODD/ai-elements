<script lang="ts">
  import * as Code from "$lib/components/ai-elements/code";
  // JavaScript Example - Modern ES6+ Features
  let javascriptCode = `// Modern JavaScript - API Service with Error Handling
class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.cache = new Map();
  }

  async fetchUser(userId) {
    const cacheKey = \`user-\${userId}\`;

    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(\`\${this.baseURL}/users/\${userId}\`);

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const userData = await response.json();

      // Cache the result
      this.cache.set(cacheKey, userData);

      return userData;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw error;
    }
  }

  // Async iterator for paginated data
  async* fetchAllUsers() {
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(\`\${this.baseURL}/users?page=\${page}\`);
      const data = await response.json();

      for (const user of data.users) {
        yield user;
      }

      hasMore = data.hasNext;
      page++;
    }
  }
}

// Usage with destructuring and async/await
const api = new ApiService('https://api.example.com');

(async () => {
  try {
    const user = await api.fetchUser(123);
    console.log(\`Welcome, \${user.name}!\`);

    // Process all users with async iteration
    for await (const user of api.fetchAllUsers()) {
      console.log(\`Processing user: \${user.email}\`);
    }
  } catch (error) {
    console.error('Application error:', error.message);
  }
})();`;

  // Python Example - Data Analysis with Type Hints
  let pythonCode = `"""
Advanced Python - Data Analysis Pipeline
"""
from typing import List, Dict, Optional, Union, TypeVar, Generic
from dataclasses import dataclass, field
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
from pathlib import Path

T = TypeVar('T')

@dataclass
class DataSource:
    """Configuration for a data source"""
    name: str
    path: Path
    format: str = 'csv'
    encoding: str = 'utf-8'
    metadata: Dict[str, Union[str, int, float]] = field(default_factory=dict)

class DataProcessor(Generic[T]):
    """Generic data processor with caching and validation"""

    def __init__(self, cache_size: int = 1000):
        self.cache: Dict[str, T] = {}
        self.cache_size = cache_size
        self.processed_count = 0

    def load_data(self, source: DataSource) -> pd.DataFrame:
        """Load data from various sources with error handling"""
        cache_key = f"{source.name}_{source.path.name}"

        if cache_key in self.cache:
            print(f"📋 Loading {source.name} from cache")
            return self.cache[cache_key]

        try:
            if source.format.lower() == 'csv':
                df = pd.read_csv(source.path, encoding=source.encoding)
            elif source.format.lower() == 'json':
                df = pd.read_json(source.path)
            else:
                raise ValueError(f"Unsupported format: {source.format}")

            # Validate data
            if df.empty:
                raise ValueError(f"No data found in {source.path}")

            # Cache the result
            if len(self.cache) < self.cache_size:
                self.cache[cache_key] = df

            print(f"✅ Loaded {len(df)} rows from {source.name}")
            return df

        except Exception as e:
            print(f"❌ Error loading {source.name}: {e}")
            raise

    def analyze_trends(self, df: pd.DataFrame,
                      date_col: str = 'date',
                      value_col: str = 'value') -> Dict[str, float]:
        """Analyze trends in time series data"""

        # Convert date column
        df[date_col] = pd.to_datetime(df[date_col])
        df = df.sort_values(date_col)

        # Calculate metrics
        daily_change = df[value_col].pct_change().mean()
        volatility = df[value_col].std()
        trend_slope = np.polyfit(range(len(df)), df[value_col], 1)[0]

        return {
            'daily_change_avg': daily_change,
            'volatility': volatility,
            'trend_slope': trend_slope,
            'data_points': len(df),
            'date_range_days': (df[date_col].max() - df[date_col].min()).days
        }

# Usage example with type hints and context managers
def main() -> None:
    """Main data processing pipeline"""
    processor = DataProcessor[pd.DataFrame]()

    sources = [
        DataSource(name="sales_data", path=Path("data/sales.csv")),
        DataSource(name="user_metrics", path=Path("data/users.json"), format="json")
    ]

    for source in sources:
        try:
            df = processor.load_data(source)
            trends = processor.analyze_trends(df)

            print(f"\\n📊 Analysis for {source.name}:")
            for metric, value in trends.items():
                print(f"  {metric}: {value:.4f}")

        except Exception as e:
            print(f"⚠️  Failed to process {source.name}: {e}")

if __name__ == "__main__":
    main()`;

  // TypeScript Example - Advanced Patterns
  let typescriptCode = `// Advanced TypeScript - Generic Repository with Decorators
interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User extends Entity {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  preferences: UserPreferences;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

// Utility types for better type safety
type CreateUserInput = Omit<User, keyof Entity | 'preferences'> & {
  preferences?: Partial<UserPreferences>;
};

type UpdateUserInput = Partial<Omit<User, keyof Entity>>;

// Repository pattern with generics
abstract class Repository<T extends Entity> {
  protected abstract tableName: string;

  abstract findById(id: string): Promise<T | null>;
  abstract findAll(filters?: Partial<T>): Promise<T[]>;
  abstract create(data: Omit<T, keyof Entity>): Promise<T>;
  abstract update(id: string, data: Partial<T>): Promise<T>;
  abstract delete(id: string): Promise<boolean>;
}

// Caching decorator
function Cacheable(ttl: number = 300000) { // 5 minutes default
  return function <T extends Repository<any>>(
    target: T,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const cache = new Map<string, { data: any; timestamp: number }>();

    descriptor.value = async function (...args: any[]) {
      const cacheKey = \`\${propertyKey}-\${JSON.stringify(args)}\`;
      const cached = cache.get(cacheKey);

      if (cached && Date.now() - cached.timestamp < ttl) {
        return cached.data;
      }

      const result = await originalMethod.apply(this, args);
      cache.set(cacheKey, { data: result, timestamp: Date.now() });

      return result;
    };

    return descriptor;
  };
}

// User repository implementation
class UserRepository extends Repository<User> {
  protected tableName = 'users';
  private users: Map<string, User> = new Map();

  @Cacheable(300000) // 5 minutes cache
  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findAll(filters?: Partial<User>): Promise<User[]> {
    let users = Array.from(this.users.values());

    if (filters) {
      users = users.filter(user => {
        return Object.entries(filters).every(([key, value]) => {
          return user[key as keyof User] === value;
        });
      });
    }

    return users;
  }

  async create(userData: CreateUserInput): Promise<User> {
    const defaultPreferences: UserPreferences = {
      theme: 'auto',
      language: 'en',
      notifications: {
        email: true,
        push: true,
        sms: false
      }
    };

    const user: User = {
      ...userData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      preferences: { ...defaultPreferences, ...userData.preferences }
    };

    this.users.set(user.id, user);
    return user;
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    const existingUser = await this.findById(id);

    if (!existingUser) {
      throw new Error(\`User with id \${id} not found\`);
    }

    const updatedUser: User = {
      ...existingUser,
      ...data,
      updatedAt: new Date()
    };

    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  // Custom method with advanced filtering
  async findByRole(role: User['role']): Promise<User[]> {
    return this.findAll({ role });
  }
}

// Service layer with dependency injection
class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userData: CreateUserInput): Promise<User> {
    // Validate email uniqueness
    const existingUsers = await this.userRepository.findAll();
    const emailExists = existingUsers.some(user => user.email === userData.email);

    if (emailExists) {
      throw new Error('Email already exists');
    }

    return this.userRepository.create(userData);
  }

  async updateUserPreferences(
    userId: string,
    preferences: Partial<UserPreferences>
  ): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return this.userRepository.update(userId, {
      preferences: { ...user.preferences, ...preferences }
    });
  }
}

// Usage example
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

(async () => {
  try {
    const newUser = await userService.createUser({
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      preferences: {
        theme: 'dark',
        notifications: { email: false }
      }
    });

    console.log('Created user:', newUser);

    const updatedUser = await userService.updateUserPreferences(newUser.id, {
      language: 'es',
      theme: 'light'
    });

    console.log('Updated user:', updatedUser);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();`;

  // React/JSX Example - Modern Hooks and Patterns
  let reactCode = `// Modern React - Advanced Hooks and Component Patterns
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useReducer,
  createContext,
  useContext,
  Suspense,
  lazy
} from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// Custom hooks for data fetching
function useAsyncData<T>(fetchFn: () => Promise<T>, deps: any[] = []) {
  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error: Error | null;
  }>({
    data: null,
    loading: true,
    error: null
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const data = await fetchFn();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  }, deps);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}

// Context for theme management
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const value = useMemo(() => ({
    theme,
    toggleTheme
  }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Reducer for complex state management
interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: { text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'SET_FILTER'; payload: { filter: TodoState['filter'] } }
  | { type: 'CLEAR_COMPLETED' };

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: crypto.randomUUID(),
            text: action.payload.text,
            completed: false,
            createdAt: new Date()
          }
        ]
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload.filter
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };

    default:
      return state;
  }
};

// Lazy loaded component
const TodoAnalytics = lazy(() => import('./TodoAnalytics'));

// Main component with advanced patterns
export const TodoApp: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all'
  });

  // Memoized filtered todos
  const filteredTodos = useMemo(() => {
    switch (state.filter) {
      case 'active':
        return state.todos.filter(todo => !todo.completed);
      case 'completed':
        return state.todos.filter(todo => todo.completed);
      default:
        return state.todos;
    }
  }, [state.todos, state.filter]);

  // Memoized statistics
  const stats = useMemo(() => ({
    total: state.todos.length,
    completed: state.todos.filter(todo => todo.completed).length,
    active: state.todos.filter(todo => !todo.completed).length
  }), [state.todos]);

  const handleAddTodo = useCallback((text: string) => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', payload: { text: text.trim() } });
    }
  }, []);

  return (
    <div className={\`app \${theme}\`}>
      <header>
        <h1>Advanced Todo App</h1>
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'dark' : 'light'} mode
        </button>
      </header>

      <main>
        <TodoInput onAdd={handleAddTodo} />

        <TodoFilters
          currentFilter={state.filter}
          onFilterChange={(filter) =>
            dispatch({ type: 'SET_FILTER', payload: { filter } })
          }
        />

        <TodoList
          todos={filteredTodos}
          onToggle={(id) =>
            dispatch({ type: 'TOGGLE_TODO', payload: { id } })
          }
          onDelete={(id) =>
            dispatch({ type: 'DELETE_TODO', payload: { id } })
          }
        />

        <TodoStats stats={stats} />

        {stats.completed > 0 && (
          <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>
            Clear Completed
          </button>
        )}

        <ErrorBoundary fallback={<div>Error loading analytics</div>}>
          <Suspense fallback={<div>Loading analytics...</div>}>
            <TodoAnalytics todos={state.todos} />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
};

// Usage with providers
export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <TodoApp />
    </ThemeProvider>
  );
};`;
</script>

<div class="max-w-6xl mx-auto space-y-8 p-6">
  <!-- Header -->
  <div class="text-center space-y-3">
    <h1 class="text-4xl font-bold tracking-tight">Advanced Code Examples</h1>
    <p class="text-xl text-muted-foreground">
      Modern programming patterns and best practices across different languages
    </p>
    <div
      class="flex items-center justify-center gap-2 text-sm text-muted-foreground"
    >
      <span class="px-3 py-1 bg-primary/10 text-primary rounded-full"
        >JavaScript</span
      >
      <span class="px-3 py-1 bg-primary/10 text-primary rounded-full"
        >Python</span
      >
      <span class="px-3 py-1 bg-primary/10 text-primary rounded-full"
        >TypeScript</span
      >
      <span class="px-3 py-1 bg-primary/10 text-primary rounded-full"
        >React</span
      >
    </div>
  </div>

  <!-- Examples Grid -->
  <div class="space-y-10">
    <!-- JavaScript Example -->
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold">Modern JavaScript</h2>
          <p class="text-muted-foreground">
            API Service with caching, async iterators, and error handling
          </p>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="px-3 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-md"
          >
            ES2024
          </span>
          <span
            class="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md"
          >
            Async/Await
          </span>
        </div>
      </div>
      <Code.Root code={javascriptCode} lang="javascript">
        <Code.CopyButton />
      </Code.Root>
    </section>

    <!-- Python Example -->
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold">Advanced Python</h2>
          <p class="text-muted-foreground">
            Data analysis pipeline with type hints, generics, and dataclasses
          </p>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="px-3 py-1 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md"
          >
            Python 3.12
          </span>
          <span
            class="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-md"
          >
            Type Hints
          </span>
        </div>
      </div>
      <Code.Root code={pythonCode} lang="python">
        <Code.CopyButton />
      </Code.Root>
    </section>

    <!-- TypeScript Example -->
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold">Enterprise TypeScript</h2>
          <p class="text-muted-foreground">
            Generic repository pattern with decorators and advanced type safety
          </p>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md"
          >
            TypeScript 5.0
          </span>
          <span
            class="px-3 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-md"
          >
            Generics
          </span>
          <span
            class="px-3 py-1 text-xs font-medium bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-md"
          >
            Decorators
          </span>
        </div>
      </div>
      <Code.Root code={typescriptCode} lang="typescript">
        <Code.CopyButton />
      </Code.Root>
    </section>

    <!-- React Example -->
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold">Modern React</h2>
          <p class="text-muted-foreground">
            Advanced hooks, context patterns, and component architecture
          </p>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="px-3 py-1 text-xs font-medium bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded-md"
          >
            React 18
          </span>
          <span
            class="px-3 py-1 text-xs font-medium bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded-md"
          >
            Hooks
          </span>
          <span
            class="px-3 py-1 text-xs font-medium bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200 rounded-md"
          >
            Context
          </span>
        </div>
      </div>
      <Code.Root code={reactCode} lang="tsx">
        <Code.CopyButton />
      </Code.Root>
    </section>
  </div>
</div>

import { BlogTag } from "@/types/blogTypes";

// Extend with additional dummy blog data
export const demoBlogs = [
  {
    id: "1",
    author: {
      id: "u1",
      name: "Alex Turner",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg",
      bio: "Full stack developer with 8 years of experience in React and Node.js.",
    },
    title: "Getting Started with React Hooks",
    slug: "getting-started-with-react-hooks",
    content: `# Getting Started with React Hooks

## Introduction
React Hooks were introduced in React 16.8 as a way to use state and other React features without writing a class component. Let's explore the most common hooks and how to use them effectively.

## useState
The useState hook allows you to add state to functional components:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## useEffect
The useEffect hook lets you perform side effects in function components:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## useContext
The useContext hook lets you subscribe to React context without introducing nesting:

\`\`\`jsx
import React, { useContext } from 'react';

const ThemeContext = React.createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  
  return <button className={theme}>I'm styled by the theme context!</button>;
}
\`\`\`

## useReducer
The useReducer hook is an alternative to useState for complex state logic:

\`\`\`jsx
import React, { useReducer } from 'react';

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </div>
  );
}
\`\`\`

## Custom Hooks
You can create your own hooks to reuse stateful logic between components:

\`\`\`jsx
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away to update state with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures effect is only run on mount and unmount
  
  return windowSize;
}

// Usage in a component
function MyComponent() {
  const windowSize = useWindowSize();
  
  return (
    <div>
      Window width: {windowSize.width}
      Window height: {windowSize.height}
    </div>
  );
}
\`\`\`

## Conclusion
React Hooks have transformed how we write React components by enabling more concise and reusable code. Start incorporating hooks into your components, and you'll quickly see their benefits for state management and effects.`,
    excerpt:
      "Learn how to use React Hooks to simplify your components and share stateful logic between them. This guide covers useState, useEffect, useContext, useReducer, and custom hooks.",
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    tags: ["React", "JavaScript", "Tutorial"] as BlogTag[],
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
    updatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
    views: 542,
    likes: 78,
    bookmarked: false,
    comments: [
      {
        id: "c1",
        userId: "u2",
        userName: "Sophia Chen",
        userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
        content:
          "This was really helpful for understanding hooks! I've been stuck with class components for too long.",
        createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
      },
      {
        id: "c2",
        userId: "u3",
        userName: "Marcus Johnson",
        userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
        content:
          "Great introduction! Could you maybe cover useCallback and useMemo in a future article?",
        createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
      },
    ],
  },
  {
    id: "2",
    author: {
      id: "u2",
      name: "Sophia Chen",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Frontend architect specializing in React and design systems.",
    },
    title: "Building a Design System with Tailwind CSS",
    slug: "building-a-design-system-with-tailwind-css",
    content: `# Building a Design System with Tailwind CSS

## Introduction
Design systems are crucial for maintaining consistency across large applications. In this article, we'll explore how to build a comprehensive design system using Tailwind CSS.

## Setting Up Your Project
First, let's set up a new project with Tailwind CSS:

\`\`\`bash
# Create a new project
mkdir design-system
cd design-system
npm init -y

# Install dependencies
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

## Customizing Your Theme
The heart of a design system is consistent design tokens. Let's configure Tailwind's theme:

\`\`\`javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          // ... similar structure
        },
        // Add other brand colors
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      spacing: {
        '0.5': '0.125rem',
        // ... custom spacing
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '1rem',
        '2xl': '2rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        // ... custom shadows
      },
    },
  },
  plugins: [],
}
\`\`\`

## Creating Component Variants with Tailwind
Let's create variants for a button component:

\`\`\`jsx
// Button.jsx
import React from 'react';
import PropTypes from 'prop-types';

const variants = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white',
  secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
  ghost: 'text-primary-600 hover:bg-primary-50',
};

const sizes = {
  sm: 'py-1 px-3 text-sm',
  md: 'py-2 px-4 text-base',
  lg: 'py-3 px-6 text-lg',
};

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <button
      className={\`font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors \${variants[variant]} \${sizes[size]} \${className}\`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
\`\`\`

## Creating A Component Catalog
Document your components in a central catalog for the team:

\`\`\`jsx
// ComponentCatalog.jsx
import React from 'react';
import Button from './components/Button';
import Card from './components/Card';
// Import other components

const ComponentCatalog = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Design System Components</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg mb-2">Primary</h3>
            <div className="flex gap-2">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg mb-2">Secondary</h3>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">Small</Button>
              <Button variant="secondary" size="md">Medium</Button>
              <Button variant="secondary" size="lg">Large</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg mb-2">Outline</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Small</Button>
              <Button variant="outline" size="md">Medium</Button>
              <Button variant="outline" size="lg">Large</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg mb-2">Ghost</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">Small</Button>
              <Button variant="ghost" size="md">Medium</Button>
              <Button variant="ghost" size="lg">Large</Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Repeat for other components */}
    </div>
  );
};

export default ComponentCatalog;
\`\`\`

## Implementing a Type Scale
Create a consistent typography system:

\`\`\`css
/* typography.css */
.h1 {
  @apply text-4xl font-bold font-heading;
}

.h2 {
  @apply text-3xl font-bold font-heading;
}

.h3 {
  @apply text-2xl font-semibold font-heading;
}

.h4 {
  @apply text-xl font-semibold font-heading;
}

.h5 {
  @apply text-lg font-medium font-heading;
}

.body1 {
  @apply text-base font-normal font-sans;
}

.body2 {
  @apply text-sm font-normal font-sans;
}

.caption {
  @apply text-xs font-normal font-sans;
}
\`\`\`

## Creating Utility Patterns
Create patterns for common layout needs:

\`\`\`jsx
// Container.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ 
  children, 
  className = '', 
  maxWidth = 'max-w-7xl', 
  padding = 'px-4 sm:px-6 lg:px-8',
  ...props 
}) => {
  return (
    <div className={\`mx-auto \${maxWidth} \${padding} \${className}\`} {...props}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  maxWidth: PropTypes.string,
  padding: PropTypes.string,
};

export default Container;
\`\`\`

## Adding Animation Patterns
Define consistent animations:

\`\`\`javascript
// tailwind.config.js (extended)
module.exports = {
  // ... other config
  theme: {
    extend: {
      // ... other extensions
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        // ... other keyframes
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideInRight: 'slideInRight 0.5s ease-out',
        // ... other animations
      },
    },
  },
  // ... rest of config
}
\`\`\`

## Documenting for Developers
Create a documentation site to help your team:

\`\`\`jsx
// DocumentationPage.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ComponentCatalog from './ComponentCatalog';
import ColorPalette from './documentation/ColorPalette';
import Typography from './documentation/Typography';
import Spacing from './documentation/Spacing';
import GettingStarted from './documentation/GettingStarted';

const Sidebar = () => (
  <div className="w-64 h-screen bg-gray-100 p-4 fixed left-0 top-0">
    <h1 className="text-2xl font-bold mb-6">Design System</h1>
    <nav>
      <ul className="space-y-2">
        <li>
          <Link to="/" className="block p-2 hover:bg-gray-200 rounded">
            Getting Started
          </Link>
        </li>
        <li>
          <Link to="/colors" className="block p-2 hover:bg-gray-200 rounded">
            Colors
          </Link>
        </li>
        <li>
          <Link to="/typography" className="block p-2 hover:bg-gray-200 rounded">
            Typography
          </Link>
        </li>
        <li>
          <Link to="/spacing" className="block p-2 hover:bg-gray-200 rounded">
            Spacing
          </Link>
        </li>
        <li>
          <Link to="/components" className="block p-2 hover:bg-gray-200 rounded">
            Components
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);

const DocumentationPage = () => {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="ml-64 p-8 flex-1">
          <Routes>
            <Route path="/" element={<GettingStarted />} />
            <Route path="/colors" element={<ColorPalette />} />
            <Route path="/typography" element={<Typography />} />
            <Route path="/spacing" element={<Spacing />} />
            <Route path="/components" element={<ComponentCatalog />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default DocumentationPage;
\`\`\`

## Conclusion
Building a design system with Tailwind CSS gives you the flexibility of utility classes with the consistency of a design system. By defining your design tokens, creating reusable components, and documenting everything clearly, you can create a system that scales with your application and keeps your UI consistent across the entire product.`,
    excerpt:
      "Learn how to create a comprehensive design system using Tailwind CSS, including theming, component variants, and documentation for your team.",
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    tags: ["CSS", "Design", "TypeScript", "Guide"] as BlogTag[],
    createdAt: Date.now() - 14 * 24 * 60 * 60 * 1000, // 14 days ago
    updatedAt: Date.now() - 10 * 24 * 60 * 60 * 1000, // 10 days ago
    views: 821,
    likes: 132,
    bookmarked: false,
    comments: [
      {
        id: "c3",
        userId: "u1",
        userName: "Alex Turner",
        userAvatar: "https://randomuser.me/api/portraits/men/62.jpg",
        content:
          "We implemented this approach on our latest project and it's been a game changer for consistency!",
        createdAt: Date.now() - 9 * 24 * 60 * 60 * 1000, // 9 days ago
      },
      {
        id: "c4",
        userId: "u4",
        userName: "Elena Rodriguez",
        userAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
        content:
          "Do you have any tips for transitioning an existing project to use this design system approach?",
        createdAt: Date.now() - 8 * 24 * 60 * 60 * 1000, // 8 days ago
      },
      {
        id: "c5",
        userId: "u2",
        userName: "Sophia Chen",
        userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
        content:
          "Great question, Elena! I'd suggest starting with tokens (colors, spacing), then rolling out components gradually, focusing on the most used ones first.",
        createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
      },
    ],
  },
  {
    id: "3",
    author: {
      id: "u3",
      name: "Marcus Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Full stack developer with a passion for serverless architecture.",
    },
    title: "Understanding TypeScript Generics",
    slug: "understanding-typescript-generics",
    content: `# Understanding TypeScript Generics

## Introduction
Generics are one of TypeScript's most powerful features, allowing you to create reusable components that work with a variety of types. In this guide, we'll explore generics in depth with practical examples.

## Basic Generics
At their core, generics allow us to create components that can work with different types:

\`\`\`typescript
// Without generics
function identity(arg: any): any {
  return arg;
}

// With generics
function identity<T>(arg: T): T {
  return arg;
}

// Usage
const output1 = identity<string>("myString");  // type: string
const output2 = identity(123);  // type inference: number
\`\`\`

## Generic Interfaces
You can define generic interfaces to create reusable type patterns:

\`\`\`typescript
interface Box<T> {
  contents: T;
}

// Usage
const box1: Box<string> = { contents: "hello world" };
const box2: Box<number> = { contents: 42 };

// With multiple types
interface Pair<K, V> {
  key: K;
  value: V;
}

const pair: Pair<string, number> = { key: "age", value: 30 };
\`\`\`

## Generic Classes
Classes can also use generics:

\`\`\`typescript
class Queue<T> {
  private data: T[] = [];
  
  push(item: T): void {
    this.data.push(item);
  }
  
  pop(): T | undefined {
    return this.data.shift();
  }
}

// Usage
const numberQueue = new Queue<number>();
numberQueue.push(10);
numberQueue.push(20);
const item = numberQueue.pop(); // 10
\`\`\`

## Generic Constraints
You can restrict the types that can be used with a generic using constraints:

\`\`\`typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// These work because they have a length property
logLength("hello");
logLength([1, 2, 3]);
logLength({ length: 10, value: 3 });

// This would error because number doesn't have a length property
// logLength(123);
\`\`\`

## Using Type Parameters in Generic Constraints
You can declare a type parameter that is constrained by another type parameter:

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "John", age: 30 };
getProperty(person, "name"); // Works
getProperty(person, "age");  // Works
// getProperty(person, "job");  // Error: 'job' is not assignable to 'name' | 'age'
\`\`\`

## Generic Type Aliases
Type aliases can also be generic:

\`\`\`typescript
type Container<T> = { value: T };

const numberContainer: Container<number> = { value: 123 };
const stringContainer: Container<string> = { value: "hello" };
\`\`\`

## Default Type Parameters
You can specify default types for generics:

\`\`\`typescript
interface Dropdown<T = string> {
  value: T;
  selected: boolean;
}

// Uses the default string type
const stringDropdown: Dropdown = { value: "option1", selected: true };

// Override with a different type
const numberDropdown: Dropdown<number> = { value: 1, selected: false };
\`\`\`

## Generic Utility Types
TypeScript includes many built-in utility types that use generics:

\`\`\`typescript
// Partial makes all properties optional
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
  return { ...todo, ...fieldsToUpdate };
}

const todo1: Todo = {
  title: "Learn TypeScript",
  description: "Study generics",
  completed: false
};

const updatedTodo = updateTodo(todo1, {
  completed: true
});

// Pick selects specific properties
type TodoPreview = Pick<Todo, "title" | "completed">;

const preview: TodoPreview = {
  title: "Learn TypeScript",
  completed: false
  // description would be an error here
};

// Omit excludes specific properties
type TodoSummary = Omit<Todo, "description">;

const summary: TodoSummary = {
  title: "Learn TypeScript",
  completed: false
  // description would be an error here
};
\`\`\`

## Generic Function Types
You can define generic function types for complex callback patterns:

\`\`\`typescript
// Generic function type
type Transformer<T, U> = (item: T) => U;

// Function that uses a generic callback
function transform<T, U>(items: T[], transformer: Transformer<T, U>): U[] {
  return items.map(transformer);
}

// Usage
const numbers = [1, 2, 3, 4];
const stringNumbers = transform(numbers, (n: number) => n.toString());
\`\`\`

## Generic React Components
Generics are especially useful in React applications:

\`\`\`tsx
// Generic Props interface
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

// Generic Component
function List<T>(props: ListProps<T>): React.ReactElement {
  return (
    <div>
      {props.items.map((item, index) => (
        <div key={index}>
          {props.renderItem(item)}
        </div>
      ))}
    </div>
  );
}

// Usage with a type
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

// TypeScript infers the User type automatically
<List 
  items={users} 
  renderItem={(user) => <div>{user.name}</div>}
/>
\`\`\`

## Conditional Types
Advanced generic usage includes conditional types for type transformations:

\`\`\`typescript
type NonNullable<T> = T extends null | undefined ? never : T;

// UseState-like hook return type
type SetState<T> = (newState: T) => void;
type UseStateReturnType<T> = [T, SetState<T>];

// Example of extracting return types
function createState<T>(initial: T): UseStateReturnType<T> {
  let state = initial;
  
  function setState(newState: T) {
    state = newState;
  }
  
  return [state, setState];
}

const [count, setCount] = createState(0);
\`\`\`

## Conclusion
Generics in TypeScript provide a powerful way to build flexible, reusable components while maintaining type safety. By mastering generics, you can write more abstract code that works with a variety of types while still getting the benefits of TypeScript's type checking.`,
    excerpt:
      "Dive into TypeScript generics with practical examples of how to use them for more reusable code while maintaining type safety.",
    coverImage:
      "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1461&q=80",
    tags: ["TypeScript", "JavaScript", "Tutorial"] as BlogTag[],
    createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000, // 10 days ago
    updatedAt: Date.now() - 10 * 24 * 60 * 60 * 1000, // 10 days ago
    views: 743,
    likes: 94,
    bookmarked: false,
    comments: [
      {
        id: "c6",
        userId: "u5",
        userName: "Jamal Washington",
        userAvatar: "https://randomuser.me/api/portraits/men/75.jpg",
        content:
          "Great explanation! The examples really helped me understand how to use constraints effectively.",
        createdAt: Date.now() - 8 * 24 * 60 * 60 * 1000, // 8 days ago
      },
      {
        id: "c7",
        userId: "u1",
        userName: "Alex Turner",
        userAvatar: "https://randomuser.me/api/portraits/men/62.jpg",
        content:
          "I've been using TypeScript for years and still learned a few new tricks from this. Nicely done!",
        createdAt: Date.now() - 6 * 24 * 60 * 60 * 1000, // 6 days ago
      },
    ],
  },
  {
    id: "blog11",
    title: "Advanced TypeScript Patterns for Enterprise Applications",
    slug: "advanced-typescript-patterns-enterprise",
    excerpt:
      "Learn how to leverage TypeScript's advanced type system to build robust enterprise-grade applications with better error handling and type safety.",
    content: `
# Advanced TypeScript Patterns for Enterprise Applications

TypeScript has become the language of choice for many enterprise applications, offering strong typing and advanced features that help build more robust and maintainable code bases. In this blog post, we'll explore some advanced TypeScript patterns that can be particularly useful in enterprise settings.

## Type-Safe Event Emitters

When building complex applications, event-driven architectures are common. Here's how to create a type-safe event emitter:

\`\`\`typescript
type EventMap = {
  'user:login': { userId: string; timestamp: number };
  'user:logout': { userId: string; timestamp: number };
  'data:update': { entityId: string; changes: Record<string, any> };
}

class TypedEventEmitter<T extends Record<string, any>> {
  private listeners: Partial<Record<keyof T, Array<(data: any) => void>>> = {};

  on<K extends keyof T>(event: K, listener: (data: T[K]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]?.push(listener);
    return this;
  }

  emit<K extends keyof T>(event: K, data: T[K]) {
    this.listeners[event]?.forEach(listener => listener(data));
    return this;
  }

  off<K extends keyof T>(event: K, listener: (data: T[K]) => void) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event]?.filter(l => l !== listener);
    }
    return this;
  }
}

// Usage
const emitter = new TypedEventEmitter<EventMap>();

emitter.on('user:login', data => {
  console.log(\\\`User \${data.userId} logged in at \${new Date(data.timestamp)}\\\`);
});

// TypeScript would error on this:
// emitter.emit('user:login', { wrongProp: true });
\`\`\`

## Discriminated Unions for API Responses

When dealing with API responses, discriminated unions can make your code more robust:

\`\`\`typescript
type ApiResponse<T> = 
  | { status: 'success'; data: T; }
  | { status: 'error'; error: { code: string; message: string; }; }
  | { status: 'loading'; }

function handleResponse<T>(response: ApiResponse<T>) {
  switch (response.status) {
    case 'success':
      // TypeScript knows response.data exists here
      return processData(response.data);
    case 'error':
      // TypeScript knows response.error exists here
      return handleError(response.error);
    case 'loading':
      return showLoadingIndicator();
  }
}

function fetchUsers(): Promise<ApiResponse<User[]>> {
  // Implementation here
}
\`\`\`

## The Builder Pattern

For complex object creation:

\`\`\`typescript
class UserBuilder {
  private user: Partial<User> = {};

  withName(name: string): UserBuilder {
    this.user.name = name;
    return this;
  }

  withEmail(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }

  withRoles(roles: Role[]): UserBuilder {
    this.user.roles = roles;
    return this;
  }

  build(): User {
    // Validate required fields
    if (!this.user.name || !this.user.email) {
      throw new Error('User requires at least name and email');
    }
    return this.user as User;
  }
}

// Usage
const user = new UserBuilder()
  .withName('John Doe')
  .withEmail('john@example.com')
  .withRoles(['admin'])
  .build();
\`\`\`

## Conclusion

These patterns can help you build more robust TypeScript applications by leveraging the type system to prevent bugs and improve code clarity. Adopting these patterns in enterprise settings can lead to more maintainable codebases and fewer runtime errors.
    `,
    author: {
      id: "user1",
      name: "Sophia Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "Frontend architect specializing in React and design systems.",
    },
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    tags: ["TypeScript", "Programming", "Advanced"] as BlogTag[],
    createdAt: "2023-04-18T12:00:00.000Z",
    views: 3845,
    likes: 276,
    bookmarked: false,
    comments: [
      {
        id: "comment1",
        userId: "user2",
        userName: "Marcus Johnson",
        userAvatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        content:
          "Great article! The builder pattern has been especially useful in our codebase.",
        createdAt: new Date("2023-04-18T14:30:00.000Z").getTime(),
      },
      {
        id: "comment2",
        author: {
          id: "user3",
          name: "Ava Williams",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        },
        content:
          "Do you have any recommendations for handling async operations with these patterns?",
        createdAt: "2023-04-19T09:15:00.000Z",
        likes: 8,
      },
    ],
  },
  {
    id: "blog12",
    title: "Building Scalable Microservices with Node.js",
    slug: "building-scalable-microservices-nodejs",
    excerpt:
      "Discover proven strategies for designing, implementing, and deploying scalable microservices architectures using Node.js and modern cloud infrastructure.",
    content: `
# Building Scalable Microservices with Node.js

Microservices architecture has become increasingly popular for building complex applications that need to scale. Node.js, with its event-driven, non-blocking I/O model, is particularly well-suited for microservices. In this post, we'll explore how to build scalable microservices with Node.js.

## Why Microservices?

Before diving in, let's understand why you might want to use microservices:

- **Scalability**: Scale individual services based on demand
- **Technology Flexibility**: Use the best language/framework for each service
- **Resilience**: Failures in one service don't bring down the entire system
- **Team Organization**: Different teams can work on different services
- **Deployability**: Deploy services independently

## Setting Up a Basic Microservice

Let's create a simple user service using Express:

\`\`\`javascript
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// In-memory user store (would use a database in production)
const users = [];

app.post('/users', (req, res) => {
  const user = {
    id: Date.now().toString(),
    name: req.body.name,
    email: req.body.email,
    createdAt: new Date()
  };
  
  users.push(user);
  res.status(201).json(user);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

app.listen(port, () => {
  console.log(\`User service listening on port \${port}\`);
});
\`\`\`

## Service Discovery

In a microservices architecture, services need to find each other. Here's a simple approach using Consul:

\`\`\`javascript
const Consul = require('consul');
const consul = new Consul();

// Register the service
consul.agent.service.register({
  name: 'user-service',
  id: 'user-service-1',
  port: port,
  check: {
    http: \`http://localhost:\${port}/health\`,
    interval: '10s'
  }
}, (err) => {
  if (err) {
    console.error('Failed to register service:', err);
  }
});

// Add a health endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});
\`\`\`

## Inter-Service Communication

Services often need to communicate. Here's how to call another service:

\`\`\`javascript
const axios = require('axios');

app.get('/users/:id/orders', async (req, res) => {
  try {
    // Find the user
    const user = users.find(u => u.id === req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Call the order service
    const orderServiceUrl = process.env.ORDER_SERVICE_URL || 'http://order-service:3001';
    const ordersResponse = await axios.get(\`\${orderServiceUrl}/orders?userId=\${user.id}\`);
    
    res.json({
      user,
      orders: ordersResponse.data
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});
\`\`\`

## Handling Failures with Circuit Breakers

To build resilient microservices, use circuit breakers:

\`\`\`javascript
const CircuitBreaker = require('opossum');

const orderServiceCircuit = new CircuitBreaker(async (userId) => {
  const orderServiceUrl = process.env.ORDER_SERVICE_URL || 'http://order-service:3001';
  return axios.get(\`\${orderServiceUrl}/orders?userId=\${userId}\`);
}, {
  timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
  resetTimeout: 10000 // After 10 seconds, try again
});

orderServiceCircuit.on('open', () => console.log('Circuit breaker opened'));
orderServiceCircuit.on('close', () => console.log('Circuit breaker closed'));
orderServiceCircuit.on('halfOpen', () => console.log('Circuit breaker half-open'));

app.get('/users/:id/orders', async (req, res) => {
  try {
    const user = users.find(u => u.id === req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const ordersResponse = await orderServiceCircuit.fire(user.id);
    
    res.json({
      user,
      orders: ordersResponse.data
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    // Return a fallback response
    res.json({
      user,
      orders: [],
      note: 'Order information temporarily unavailable'
    });
  }
});
\`\`\`

## Containerization with Docker

Microservices are commonly deployed in containers:

\`\`\`dockerfile
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
\`\`\`

## Conclusion

Building microservices with Node.js allows you to create scalable, maintainable applications. Start small, with just a few services, and expand as your needs grow. Remember to consider service discovery, inter-service communication, and resilience patterns like circuit breakers.
    `,
    author: {
      id: "user4",
      name: "David Kim",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "Full stack developer with a passion for microservices and cloud architecture.",
    },
    coverImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    tags: ["Node.js", "Backend", "Architecture"] as BlogTag[],
    createdAt: "2023-04-15T10:30:00.000Z",
    views: 5621,
    likes: 412,
    bookmarked: false,
    comments: [
      {
        id: "comment3",
        author: {
          id: "user5",
          name: "Olivia Martinez",
          avatar:
            "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        },
        content:
          "Great overview! Have you considered covering message brokers like RabbitMQ or Kafka for async communication?",
        createdAt: "2023-04-15T15:45:00.000Z",
        likes: 18,
      },
    ],
  },
  {
    id: "blog13",
    title: "Optimizing React Performance: Advanced Techniques",
    slug: "optimizing-react-performance-advanced-techniques",
    excerpt:
      "Learn how to significantly improve your React application's performance with advanced optimization techniques such as memoization, code splitting, and virtualization.",
    content: `
# Optimizing React Performance: Advanced Techniques

React applications can suffer from performance issues as they grow in complexity. In this blog post, we'll explore advanced techniques for optimizing React performance beyond the basics.

## Profiling with React DevTools

Before optimizing, you need to identify performance bottlenecks. React DevTools provides a profiler for this purpose:

1. Install React DevTools browser extension
2. Open your app and navigate to the React tab in your browser's developer tools
3. Click on the "Profiler" tab
4. Record a session by clicking the record button
5. Perform the actions you want to analyze
6. Stop recording and analyze the results

## Memoization with React.memo, useMemo, and useCallback

Preventing unnecessary re-renders is one of the most effective optimization techniques in React.

### React.memo for Function Components

\`\`\`jsx
const ExpensiveComponent = React.memo(({ data }) => {
  // Component implementation
  return (
    <div>
      {/* Render data */}
      {data.map(item => <Item key={item.id} {...item} />)}
    </div>
  );
});
\`\`\`

### useMemo for Expensive Calculations

\`\`\`jsx
function DataVisualizer({ data }) {
  // Only recalculate when data changes
  const processedData = React.useMemo(() => {
    // Expensive operation
    return data.map(item => ({
      ...item,
      value: complexCalculation(item)
    }));
  }, [data]);

  return <Chart data={processedData} />;
}
\`\`\`

### useCallback for Event Handlers

\`\`\`jsx
function Parent() {
  const [count, setCount] = useState(0);
  
  // This function is memoized and doesn't change on re-renders
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  return <Child onClick={handleClick} />;
}
\`\`\`

## Code Splitting with React.lazy and Suspense

Code splitting allows you to load parts of your application only when they're needed.

\`\`\`jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Dynamic imports
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </Suspense>
    </Router>
  );
}
\`\`\`

## Virtualization for Long Lists

When rendering long lists, only render what's visible in the viewport:

\`\`\`jsx
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <div>{items[index].name}</div>
      <div>{items[index].description}</div>
    </div>
  );

  return (
    <List
      height={500}
      width="100%"
      itemCount={items.length}
      itemSize={80}
    >
      {Row}
    </List>
  );
}
\`\`\`

## Optimizing Context API Usage

Context API can cause performance issues if not used correctly:

\`\`\`jsx
// Split contexts by update frequency
const ThemeContext = React.createContext();
const UserContext = React.createContext();
const NotificationsContext = React.createContext();

function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={{ user, setUser }}>
        <NotificationsContext.Provider value={{ notifications, setNotifications }}>
          <MainApp />
        </NotificationsContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}
\`\`\`

## Web Workers for CPU-Intensive Tasks

Move CPU-intensive operations off the main thread:

\`\`\`jsx
import { useState, useEffect } from 'react';

function DataProcessor({ rawData }) {
  const [processedData, setProcessedData] = useState(null);

  useEffect(() => {
    // Create a web worker
    const worker = new Worker('worker.js');
    
    // Set up message handler
    worker.onmessage = (e) => {
      setProcessedData(e.data);
    };
    
    // Send data to worker
    worker.postMessage(rawData);
    
    // Clean up
    return () => worker.terminate();
  }, [rawData]);

  if (!processedData) return <div>Processing...</div>;
  
  return <Chart data={processedData} />;
}
\`\`\`

## Conclusion

Optimizing React performance requires a combination of techniques and a good understanding of how React works under the hood. Start by profiling your application to identify bottlenecks, then apply the appropriate optimization techniques. Remember that premature optimization can lead to code that's harder to maintain, so optimize where it matters most.
    `,
    author: {
      id: "user6",
      name: "Alex Rivera",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "Frontend performance engineer specialized in React optimization techniques.",
    },
    coverImage:
      "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    tags: ["React", "JavaScript", "Performance", "Frontend"] as BlogTag[],
    createdAt: "2023-04-10T08:15:00.000Z",
    views: 7834,
    likes: 589,
    bookmarked: false,
    comments: [
      {
        id: "comment4",
        author: {
          id: "user7",
          name: "Emma Wilson",
          avatar:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        },
        content:
          "This is exactly what I needed! The web worker tip is especially helpful for a data visualization project I'm working on.",
        createdAt: "2023-04-10T10:00:00.000Z",
        likes: 24,
      },
      {
        id: "comment5",
        author: {
          id: "user8",
          name: "Lucas Brown",
          avatar:
            "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        },
        content:
          "Great article! One thing I'd add is using the new startTransition API in React 18 for smoother UI during updates.",
        createdAt: "2023-04-10T15:20:00.000Z",
        likes: 31,
      },
      {
        id: "comment6",
        author: {
          id: "user9",
          name: "Sophia Rodriguez",
          avatar:
            "https://images.unsplash.com/photo-1560087637-bf797bc7796a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        },
        content:
          "Do you have any benchmarks to show the impact of these optimizations on a real-world app?",
        createdAt: "2023-04-12T09:45:00.000Z",
        likes: 15,
      },
    ],
  },
  {
    id: "blog14",
    title: "Building Accessible Web Applications: A Comprehensive Guide",
    slug: "building-accessible-web-applications-comprehensive-guide",
    excerpt:
      "Learn how to create web applications that are accessible to all users, including those with disabilities, by implementing WCAG guidelines and best practices.",
    content: `
# Building Accessible Web Applications: A Comprehensive Guide

Web accessibility ensures that websites and web applications are usable by people with disabilities. Beyond being a legal requirement in many jurisdictions, accessibility is a fundamental aspect of good web design. This guide will help you build accessible web applications.

## Understanding Accessibility

Accessibility (often abbreviated as a11y) is about designing and developing digital products that can be used by everyone, including:

- People with visual impairments
- People with hearing impairments
- People with motor impairments
- People with cognitive disabilities
- People using assistive technologies

## Web Content Accessibility Guidelines (WCAG)

The WCAG provides a set of guidelines for making web content accessible. The guidelines are organized under four principles, often referred to as POUR:

1. **Perceivable**: Information must be presentable to users in ways they can perceive.
2. **Operable**: Interface components must be operable by users.
3. **Understandable**: Information and operation must be understandable.
4. **Robust**: Content must be robust enough to be interpreted reliably by various user agents, including assistive technologies.

## Semantic HTML: The Foundation of Accessibility

Using proper HTML semantics is the first step in building accessible websites:

\`\`\`html
<!-- Not accessible -->
<div class="button" onclick="submitForm()">Submit</div>

<!-- Accessible -->
<button type="submit">Submit</button>
\`\`\`

Always use the right element for the right job:

- Use \`<button>\` for clickable actions
- Use \`<a>\` for navigation links
- Use heading tags (\`<h1>\` to \`<h6>\`) in the correct order
- Use \`<label>\` to associate text with form controls
- Use \`<table>\` for tabular data with appropriate headers

## ARIA: Enhancing Accessibility

When HTML alone isn't enough, ARIA (Accessible Rich Internet Applications) attributes can help:

\`\`\`html
<div 
  role="button"
  aria-pressed="false"
  tabindex="0"
  onclick="toggleButton(this)"
  onkeydown="handleKeydown(event, this)"
>
  Toggle Me
</div>

<script>
  function toggleButton(el) {
    const isPressed = el.getAttribute('aria-pressed') === 'true';
    el.setAttribute('aria-pressed', !isPressed);
  }
  
  function handleKeydown(event, el) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleButton(el);
    }
  }
</script>
\`\`\`

However, remember this golden rule: **No ARIA is better than bad ARIA**. Only use ARIA when necessary and understand how it works.

## Keyboard Accessibility

Many users rely on keyboards rather than mice:

\`\`\`javascript
// Add keyboard support to custom components
document.getElementById('custom-dropdown').addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'Enter':
    case ' ':
      toggleDropdown();
      break;
    case 'Escape':
      closeDropdown();
      break;
    case 'ArrowDown':
      selectNextItem();
      break;
    case 'ArrowUp':
      selectPreviousItem();
      break;
  }
});
\`\`\`

Ensure that:
- All functionality is available via keyboard
- Focus is visible and logical
- Tab order follows the visual layout
- No keyboard traps exist

## Focus Management in Single-Page Applications

In SPAs, when content changes, focus can get lost. Manage it properly:

\`\`\`javascript
// React example with useEffect for focus management
function Modal({ isOpen, title, onClose, children }) {
  const modalRef = useRef(null);
  
  // Store the element that had focus before the modal opened
  const previousFocus = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      // Store the current active element
      previousFocus.current = document.activeElement;
      
      // Focus the modal
      modalRef.current.focus();
      
      // Trap focus inside the modal
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      function handleTabKey(e) {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
      
      modalRef.current.addEventListener('keydown', handleTabKey);
      
      return () => {
        modalRef.current.removeEventListener('keydown', handleTabKey);
      };
    } else if (previousFocus.current) {
      // Restore focus when modal closes
      previousFocus.current.focus();
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex="-1"
      className="modal"
    >
      <h2 id="modal-title">{title}</h2>
      <div>{children}</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
\`\`\`

## Color and Contrast

Ensure sufficient color contrast:

- Text should have a contrast ratio of at least 4.5:1 against its background
- Large text (18pt+) should have a contrast ratio of at least 3:1
- Don't rely solely on color to convey information

\`\`\`css
/* Good contrast */
.button {
  background-color: #2b6cb0;
  color: white; /* High contrast against the background */
}

/* Adding non-color indicators */
.error-message {
  color: #e53e3e;
  border-left: 3px solid #e53e3e; /* Additional visual indicator */
  padding-left: 10px;
}
\`\`\`

## Testing Accessibility

Use a combination of automated and manual testing:

**Automated Tools:**
- Lighthouse in Chrome DevTools
- axe by Deque
- WAVE by WebAIM

**Manual Testing:**
- Keyboard navigation testing
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Testing with reduced motion settings
- Testing with high contrast modes

## Conclusion

Building accessible applications is not just about compliance; it's about creating inclusive experiences for all users. Start with semantic HTML, enhance with ARIA when needed, ensure keyboard accessibility, manage focus properly, provide sufficient contrast, and test thoroughly.

Remember that accessibility is a journey, not a destination. Continuously learn, improve, and prioritize inclusive design in your development process.
    `,
    author: {
      id: "user10",
      name: "Jamie Taylor",
      avatar:
        "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "Accessibility advocate and frontend developer passionate about inclusive design.",
    },
    coverImage:
      "https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    tags: [
      "Accessibility",
      "Frontend",
      "HTML",
      "CSS",
      "JavaScript",
    ] as BlogTag[],
    createdAt: "2023-04-05T14:20:00.000Z",
    views: 9213,
    likes: 743,
    bookmarked: false,
    comments: [
      {
        id: "comment7",
        author: {
          id: "user11",
          name: "Tyler Chen",
          avatar:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        },
        content:
          "Thank you for this comprehensive guide! I'll be sharing this with my team as we work to improve our application's accessibility.",
        createdAt: "2023-04-05T16:45:00.000Z",
        likes: 27,
      },
      {
        id: "comment8",
        author: {
          id: "user12",
          name: "Harper Lee",
          avatar:
            "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        },
        content:
          "I've been using axe DevTools for automated testing, but the focus management example is going to be really helpful for our SPA.",
        createdAt: "2023-04-06T09:10:00.000Z",
        likes: 19,
      },
    ],
  },
  {
    id: "blog15",
    title: "Mastering CSS Grid: Advanced Layout Techniques",
    slug: "mastering-css-grid-advanced-layout-techniques",
    excerpt:
      "Take your CSS Grid skills to the next level with advanced techniques for creating complex, responsive layouts for modern web applications.",
    content: `
# Mastering CSS Grid: Advanced Layout Techniques

CSS Grid has revolutionized web layout design, providing a powerful two-dimensional system that makes complex layouts more intuitive to create. In this post, we'll explore advanced CSS Grid techniques for sophisticated layouts.

## Beyond the Basics: Grid Template Areas

Grid template areas provide a visual way to define your layout:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  grid-template-areas:
    "header header header header"
    "sidebar main main main"
    "footer footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }

/* Responsive adjustment */
@media (max-width: 768px) {
  .container {
    grid-template-areas:
      "header header header header"
      "main main main main"
      "sidebar sidebar sidebar sidebar"
      "footer footer footer footer";
  }
}
\`\`\`

## Creating Complex Card Layouts

For a dynamic magazine-style layout:

\`\`\`css
.magazine-layout {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 20px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.featured {
  grid-column: span 4;
  grid-row: span 2;
}

.normal {
  grid-column: span 2;
  grid-row: span 1;
}

.vertical {
  grid-column: span 2;
  grid-row: span 2;
}
\`\`\`

Example HTML structure:

\`\`\`html
<div class="magazine-layout">
  <div class="card featured">Featured Article</div>
</div>
\`\`\`

\`\`\`html
<div class="magazine-layout">
  <div class="card featured">Featured Article</div>
  <div class="card normal">Normal Card</div>
  <div class="card normal">Normal Card</div>
  <div class="card vertical">Vertical Card</div>
  <div class="card normal">Normal Card</div>
  <div class="card normal">Normal Card</div>
  <div class="card normal">Normal Card</div>
</div>
\`\`\`

## Masonry Layout with CSS Grid

While not a true masonry layout, this technique gets close:

\`\`\`css
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 20px;
  grid-gap: 20px;
}

.masonry-item {
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 20px;
}

/* JavaScript will set the appropriate grid-row-end */
\`\`\`

\`\`\`javascript
// Calculate and apply the appropriate height
function resizeGridItems() {
  const grid = document.querySelector('.masonry-grid');
  const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  const gap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-gap'));
  
  document.querySelectorAll('.masonry-item').forEach(item => {
    const rowSpan = Math.ceil((item.getBoundingClientRect().height + gap) / (rowHeight + gap));
    item.style.gridRowEnd = 'span ' + rowSpan;
  });
}

// Initialize and handle resize
window.addEventListener('load', resizeGridItems);
window.addEventListener('resize', resizeGridItems);
\`\`\`

## Subgrid for Nested Components

CSS Subgrid (part of CSS Grid Level 2) allows nested grids to use the parent's grid lines:

\`\`\`css
.parent-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 20px;
}

.child {
  grid-column: 3 / span 8;
  grid-row: 2;
  
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
}

.grandchild-1 {
  grid-column: 1 / span 4;
}

.grandchild-2 {
  grid-column: 5 / span 4;
}
\`\`\`

## Overlapping Elements

Create dynamic overlapping layouts:

\`\`\`css
.overlap-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  height: 500px;
}

.background {
  grid-area: 1 / 1 / -1 / -1; /* Covers the entire grid */
  background-color: #f0f0f0;
  z-index: 1;
}

.image {
  grid-area: 2 / 2 / 10 / 8;
  background-image: url('example.jpg');
  background-size: cover;
  z-index: 2;
}

.content {
  grid-area: 5 / 6 / 12 / 12;
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 3;
}
\`\`\`

## Responsive Grid That Maintains Aspect Ratio

Keep items at a consistent aspect ratio:

\`\`\`css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
}

.gallery-item {
  position: relative;
  overflow: hidden;
}

.gallery-item::before {
  content: "";
  display: block;
  padding-top: 75%; /* 4:3 aspect ratio */
}

.gallery-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
\`\`\`

## Named Grid Lines for Better Readability

Named grid lines make your layouts more maintainable:

\`\`\`css
.dashboard {
  display: grid;
  grid-template-columns:
    [sidebar-start] 250px
    [sidebar-end main-start] 1fr
    [main-end];
  grid-template-rows:
    [header-start] 80px
    [header-end content-start] 1fr
    [content-end footer-start] 60px
    [footer-end];
  min-height: 100vh;
}

.header {
  grid-column: sidebar-start / main-end;
  grid-row: header-start / header-end;
}

.sidebar {
  grid-column: sidebar-start / sidebar-end;
  grid-row: content-start / footer-end;
}

.main {
  grid-column: main-start / main-end;
  grid-row: content-start / content-end;
}

.footer {
  grid-column: sidebar-start / main-end;
  grid-row: footer-start / footer-end;
}
\`\`\`

## Conclusion

CSS Grid provides powerful capabilities for creating complex layouts that were once difficult or impossible with CSS alone. By mastering these advanced techniques, you can create sophisticated, responsive designs while maintaining clean, semantic HTML.

Remember that browser support for the newest features (like subgrid) may vary, so always check compatibility and consider fallbacks for critical layouts.
    `,
    author: {
      id: "user13",
      name: "Jordan Patel",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "CSS expert and design systems engineer with a focus on modern layout techniques.",
    },
    coverImage:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    tags: ["CSS", "Frontend", "Design"] as BlogTag[],
    createdAt: "2023-04-02T11:45:00.000Z",
    views: 6752,
    likes: 531,
    bookmarked: false,
    comments: [
      {
        id: "comment9",
        author: {
          id: "user14",
          name: "Riley Smith",
          avatar:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        },
        content:
          "The named grid lines example is so much cleaner than using numbers. I'm definitely refactoring my layouts after reading this!",
        createdAt: "2023-04-02T14:30:00.000Z",
        likes: 22,
      },
    ],
  },
];

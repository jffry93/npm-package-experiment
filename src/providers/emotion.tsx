import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import React, { type ReactNode } from "react";

// Define an interface for the props of the StyleProvider component
interface StyleProviderProps {
  children: ReactNode;
  document?: Document;
}

// Create a valid cache key with only lowercase letters and hyphens
// Emotion supports only lowercase letters and hyphens in cache keys
const createValidCacheKey = (): string => {
  return (
    "css-" + Math.random().toString(36).substring(2, 7).replace(/[0-9]/g, "")
  );
};

// Function to create a cache with a specific container
const memoizedCreateCacheWithContainer = (container: HTMLElement) => {
  const key = createValidCacheKey(); // Generate a valid cache key
  return createCache({ container, key }); // Create and return a cache with the container and key
};

// StyleProvider component to provide the emotion cache
export const StyleProvider: React.FC<StyleProviderProps> = ({ children, document }) => {
  // Create a cache if the document is defined
  const cache = document
    ? memoizedCreateCacheWithContainer(document.head)
    : null;

  // If no cache is created, return null
  if (!cache) {
    return null;
  }

  // Return the CacheProvider component with the created cache
  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

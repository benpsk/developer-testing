// __tests__/Home.test.tsx
import { render, screen } from '@testing-library/react';
import Home from '@/components/home';
import { expect, test } from 'vitest'
import ApolloProvider from '../context/ApolloProvider';
import { initialMockData } from '@/__mocks__/handlers';


test('renders Home component with initial data', () => {
  render(
    <ApolloProvider >
      <Home initialData={initialMockData} />
    </ApolloProvider>
  );
  expect(screen.getByText('Title - hello title')).toBeDefined();
  expect(screen.getByText('Name - hello name')).toBeDefined();
  expect(screen.getByText('RENT')).toBeDefined();
});


import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Home from '@/components/home';
import { test, expect, vi, describe } from 'vitest';
import { initialMockData, mocks } from '@/__mocks__/handlers';

vi.mock('@/components/ui/carousel', () => {
  return import('../__mocks__/carousel');
});

describe('test home page', async () => {
  test('renders server side initial data', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home initialData={initialMockData} />
      </MockedProvider>
    );
    // Check inital state is rendered
    expect(screen.queryByTestId('search-component')).toBeDefined(); // search component
    expect(screen.queryByTestId('property-component')).toBeDefined(); // property component
    expect(screen.getByText('initial title', { exact: false })).toBeDefined();
    expect(screen.getByText('initial name', { exact: false })).toBeDefined();
    expect(screen.getByText('Type - RENT')).toBeDefined();
    expect(screen.queryByTestId('property-pagination')).toBeDefined();
  });
});

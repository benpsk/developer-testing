import { act, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Home from '@/components/home';
import { test, expect, vi, describe } from 'vitest';
import { initialMockData, mocks } from '@/__mocks__/handlers';
import userEvent from '@testing-library/user-event'

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

describe('test pagination component', async () => {
  test('renders pagination', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home initialData={initialMockData} />
      </MockedProvider>
    );
    expect(screen.queryByTestId('property-pagination')).toBeDefined();
    expect(screen.getByText('Next Page')).toBeDefined();
    expect(screen.getByText('Prev Page')).toBeDefined();
    expect(screen.getByLabelText('page-1')).toBeDefined();
    expect(screen.getByLabelText('page-2')).toBeDefined();
  });

  test('pagination next & prev page click success', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home initialData={initialMockData} />
      </MockedProvider>
    );
    await act(async () => {
      userEvent.click(screen.getByText('Next Page'));
    });
    await waitFor(() => {
      expect(screen.getByText('second title', { exact: false })).toBeDefined();
      expect(screen.getByText('second name', { exact: false })).toBeDefined();
      expect(screen.getByText('Type - SALE')).toBeDefined();
    });
    await act(async () => {
      userEvent.click(screen.getByText('Prev Page'));
    })
    await waitFor(() => {
      expect(screen.getByText('initial title', { exact: false })).toBeDefined();
      expect(screen.getByText('initial name', { exact: false })).toBeDefined();
      expect(screen.getByText('Type - RENT')).toBeDefined();
    });
  });

  test('pagination page number click success', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home initialData={initialMockData} />
      </MockedProvider>
    );
    await act(async () => {
      userEvent.click(screen.getByLabelText('page-btn-2'));
    })
    await waitFor(() => {
      expect(screen.getByText('second title', { exact: false })).toBeDefined();
      expect(screen.getByText('second name', { exact: false })).toBeDefined();
      expect(screen.getByText('Type - SALE')).toBeDefined();
    });
    await act(async () => {
      userEvent.click(screen.getByLabelText('page-btn-1'))
    });
    await waitFor(() => {
      expect(screen.getByText('initial title', { exact: false })).toBeDefined();
      expect(screen.getByText('initial name', { exact: false })).toBeDefined();
      expect(screen.getByText('Type - RENT')).toBeDefined();
    });
  });
});

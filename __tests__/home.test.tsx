import { act, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Home from '@/components/home';
import { test, expect, vi, describe } from 'vitest';
import { initialMockData, mocks, priceFilterMockData, offerTypeMockData, emptyData, initialEmptyData } from '@/__mocks__/handlers';
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
    expect(screen.getByText('- RENT -')).toBeDefined();
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
      expect(screen.getByText('- SALE -')).toBeDefined();
    });
    await act(async () => {
      userEvent.click(screen.getByText('Prev Page'));
    })
    await waitFor(() => {
      expect(screen.getByText('initial title', { exact: false })).toBeDefined();
      expect(screen.getByText('initial name', { exact: false })).toBeDefined();
      expect(screen.getByText('- RENT -')).toBeDefined();
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
      expect(screen.getByText('- SALE -')).toBeDefined();
    });
    await act(async () => {
      userEvent.click(screen.getByLabelText('page-btn-1'))
    });
    await waitFor(() => {
      expect(screen.getByText('initial title', { exact: false })).toBeDefined();
      expect(screen.getByText('initial name', { exact: false })).toBeDefined();
      expect(screen.getByText('- RENT -')).toBeDefined();
    });
  });
});

describe('test search component', async () => {
  test('renders search component', async () => {
    render(
      <MockedProvider mocks={offerTypeMockData} addTypename={false}>
        <Home initialData={initialMockData} />
      </MockedProvider>
    );
    expect(screen.queryByTestId('search-component')).toBeDefined();
    expect(screen.queryByTestId('offertype-search')).toBeDefined();
    expect(screen.queryByTestId('price-search')).toBeDefined();
    expect(screen.queryByTestId('bed-search')).toBeDefined();
    expect(screen.queryByTestId('area-search')).toBeDefined();
    expect(screen.getByLabelText('search-reset-btn')).toBeDefined();
  });

  test('filter by offer type', async () => {
    render(
      <MockedProvider mocks={offerTypeMockData} addTypename={false}>
        <Home initialData={initialMockData} />
      </MockedProvider>
    );
    const offerTypeToggleBtn = screen.getByTestId('offertype-toggle');
    userEvent.click(offerTypeToggleBtn);
    await waitFor(() => {
      expect(screen.getByText('RENT')).toBeDefined();
      expect(screen.getByText('SALE')).toBeDefined();
    });
    const saleTrigger = screen.getByText('SALE');
    await act(async () => {
      userEvent.click(saleTrigger)
    });
    await waitFor(() => {
      expect(screen.getByText('second title', { exact: false })).toBeDefined();
      expect(screen.getByText('second name', { exact: false })).toBeDefined();
    });
  });

  // will throw act() warning.
  test('filter by min price (will throw act() warning)', async () => {
    render(
      <MockedProvider mocks={priceFilterMockData} addTypename={false}>
        <Home initialData={initialMockData} />
      </MockedProvider>
    );
    const priceBtn = screen.getByTestId('price-toggle');
    userEvent.click(priceBtn);
    await waitFor(() => {
      expect(screen.getByText('Min')).toBeDefined();
    });
    const minPriceTrigger = screen.getByText('Min');
    await act(async () => {
      userEvent.click(minPriceTrigger);
    });
    await waitFor(() => {
      expect(screen.getByText('$1000')).toBeDefined();
    });
    const minPriceItem = screen.getByText('$1000');
    await act(async () => {
      userEvent.click(minPriceItem);
    });
    await waitFor(() => {
      expect(screen.getByText('second title', { exact: false })).toBeDefined();
      expect(screen.getByText('second name', { exact: false })).toBeDefined();
    });
  });
  // todo - add filter by bedroom count
  // todo -add filter by area 
  // opps - todo - rest func
});

describe('test no data available', async () => {
  test('show no data avaible when no data', async () => {
    render(
      <MockedProvider mocks={emptyData} addTypename={false}>
        <Home initialData={initialEmptyData} />
      </MockedProvider>
    );
    expect(screen.getByText('No data available...'));
  });
});

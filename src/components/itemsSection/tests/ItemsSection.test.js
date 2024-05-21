import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ItemsContext } from '../../../context/ItemsContext';
import ItemsSection from '../ItemsSection';
import { render, screen, waitFor } from '@testing-library/react';
import { useItems } from '../../../hooks/useItems';

jest.mock('../../../hooks/useItems');

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: () => {},
      warn: () => {},
      error: () => {},
    },
  });
}

const AllTheProviders = ({ children, value }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
    </QueryClientProvider>
  );
};

describe('ItemsSection', () => {
  it('renders correctly', async () => {
    useItems.mockImplementation(() => ({
      data: [
        {
          contentid: 123456,
          title: '에버랜드',
          firstimage: 'https://firstimage.jpg',
          firstimage2: 'https://firstimage2.jpg',
        },
        {
          contentid: 234567,
          title: '롯데월드',
          firstimage: 'https://firstimage3.jpg',
          firstimage2: 'https://firstimage4.jpg',
        },
      ],
      isLoading: false,
    }));

    render(
      <AllTheProviders value={{ province: { name: '서울특별시', code: '11' } }}>
        <ItemsSection />
      </AllTheProviders>
    );
    await waitFor(() =>
      expect(screen.getByText('서울특별시')).toBeInTheDocument()
    );
  });
});

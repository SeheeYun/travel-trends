import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ItemsContext } from '../../../context/ItemsContext';
import ItemsSection from '../ItemsSection';
import { render, screen, waitFor } from '@testing-library/react';
import { useItems } from '../../../hooks/useItems';
import Items from '../Items';

jest.mock('../../../hooks/useItems');
jest.mock('../Items', () => {
  const originalModule = jest.requireActual('../Items');
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => <div>Mocked Items</div>),
  };
});

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
  const data = [
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
  ];

  afterEach(() => {
    useItems.mockReset();
    Items.mockReset();
  });

  it('renders correctly', async () => {
    useItems.mockImplementation(() => ({
      data,
      isLoading: false,
    }));

    render(
      <AllTheProviders value={{ province: { name: '서울특별시', code: '11' } }}>
        <ItemsSection />
      </AllTheProviders>
    );

    await waitFor(() => {
      expect(screen.getByText('서울특별시')).toBeInTheDocument();
      expect(Items.mock.calls[0][0]).toStrictEqual({
        items: data,
        isLoading: false,
      });
    });
  });
});

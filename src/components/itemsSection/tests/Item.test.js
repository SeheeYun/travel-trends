import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import Item from '../Item';

describe('Item', () => {
  const item = {
    contentid: 123456,
    title: '에버랜드',
    firstimage: 'https://firstimage.jpg',
    firstimage2: 'https://firstimage2.jpg',
  };

  it('renders correctly', () => {
    const { container } = render(<Item item={item} grid={3} />);
    expect(container).toMatchSnapshot();
  });

  it('navigate to detail view page when clicked', async () => {
    render(<Item item={item} grid={3} />, { wrapper: MemoryRouterProvider });
    const link = screen.getByRole('link', { name: /에버랜드/i });
    userEvent.click(link);
    await waitFor(() => {
      expect(mockRouter.asPath).toEqual('/view/123456');
    });
  });
});

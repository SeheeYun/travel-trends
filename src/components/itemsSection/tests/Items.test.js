import { render } from '@testing-library/react';
import Items from '../Items';

describe('Items', () => {
  const items = [
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

  it('renders correctly with items', () => {
    const { container } = render(<Items items={items} />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly isLoading', () => {
    const { container } = render(<Items isLoading={true} />);
    expect(container).toMatchSnapshot();
  });
});

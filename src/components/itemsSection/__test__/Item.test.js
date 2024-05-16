import { render } from '@testing-library/react';
import Item from '../Item';

describe('Item', () => {
  const item = {
    contentid: 123456,
    title: '에버랜드',
    firstimage: 'https://firstimage.jpg',
    firstimage2: 'https://firstimage2.jpg',
  };
  const { contentid, title, firstimage, firstimage2 } = item;

  it('renders correctly', () => {
    const { container } = render(
      <Item
        item={{
          contentid,
          title,
          firstimage,
          firstimage2,
        }}
        grid={3}
      />
    );
    expect(container).toMatchSnapshot();
  });
});

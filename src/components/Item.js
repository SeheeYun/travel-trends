import Link from 'next/link';

const Item = ({ item }) => (
  <Link href={`/view/${item.contentid}`}>
    <a>
      <div>{item.title}</div>
    </a>
  </Link>
);

export default Item;

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchItems = async code => {
  const result = await axios.get(`/api/${code}`);
  return result.data.map(data => {
    const { contentid, title, firstimage, firstimage2 } = data;
    return {
      contentid,
      title,
      firstimage: firstimage.replace(/http/i, 'https'),
      firstimage2: firstimage2.replace(/http/i, 'https'),
    };
  });
};

export const useItems = code => {
  return useQuery({
    queryKey: ['items', code],
    queryFn: () => fetchItems(code),
    staleTime: 1000 * 60 * 60,
  });
};

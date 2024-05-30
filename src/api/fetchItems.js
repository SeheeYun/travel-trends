import axios from 'axios';

export const fetchItems = async code => {
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

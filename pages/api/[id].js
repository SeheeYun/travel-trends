import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  // const key = process.env.NEXT_PUBLIC_API_KEY;
  const key =
    'iz4YzcZRuHfKiij38MkTx8ljTyJfiRsur7Tkpu8+7SmIWh5RP2HRU0syrRZERDX3O9boO3RTLNuQlkyPC/6TlA==';
  const url = 'http://apis.data.go.kr/B551011/KorService1/areaBasedList1?';

  try {
    const data = await axios.get(url, {
      params: {
        serviceKey: key,
        numOfRows: 9,
        MobileOS: 'ETC',
        MobileApp: 'AppTest',
        arrange: 'R',
        areaCode: req.query.id,
        _type: 'json',
      },
    });
    res.status(200).json(data.data.response.body.items.item);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: e.message });
  }
};

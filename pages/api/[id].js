import axios from 'axios';

export default async (req, res) => {
  const key = process.env.NEXT_PUBLIC_API_KEY;
  const url =
    'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?';

  try {
    const data = await axios.get(url, {
      params: {
        serviceKey: key,
        numOfRows: 9,
        MobileOS: 'ETC',
        MobileApp: 'AppTest',
        arrange: 'P',
        areaCode: req.query.id,
      },
    });
    if (data.data.response.header.resultCode === '0000') {
      res.status(200).json(data.data.response.body.items.item);
    } else {
      throw new Error(
        `공공데이터포털 에러 코드: ${data.data.response.header.resultCode}`
      );
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: e.message });
  }
};

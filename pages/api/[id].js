import axios from 'axios';

export default (req, res) => {
  const key = process.env.NEXT_PUBLIC_API_KEY;
  const url =
    'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?';

  axios
    .get(url, {
      params: {
        serviceKey: key,
        numOfRows: 9,
        MobileOS: 'ETC',
        MobileApp: 'AppTest',
        arrange: 'P',
        areaCode: req.query.id,
      },
    })
    .then(data => {
      if (data.data.response.header.resultCode === '0000') {
        res.json(data.data.response.body.items.item);
      }
    });
};

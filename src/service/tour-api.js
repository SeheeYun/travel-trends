import axios from 'axios';

class TourApi {
  constructor(key) {
    this.key = key;
    this.url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/';
  }

  async getItemList(areaCode) {
    try {
      const data = await axios.get(`${this.url}areaBasedList?`, {
        params: {
          serviceKey: this.key,
          numOfRows: 7,
          MobileOS: 'ETC',
          MobileApp: 'AppTest',
          arrange: 'P',
          areaCode: areaCode,
        },
      });

      if (data.data.response.header.resultCode === '0000') {
        return data.data.response.body.items.item;
      } else {
        throw new Error(
          `공공데이터포털 에러 코드: ${data.data.response.header.resultCode}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  getItem() {}
}

export default TourApi;

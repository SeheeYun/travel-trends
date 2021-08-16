import axios from 'axios';

class TourApi {
  constructor(key) {
    this.key = key;
    this.url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/';
  }

  async getItemList(areaCode) {
    const data = await axios.get(`${this.url}areaBasedList?`, {
      params: {
        serviceKey: this.key,
        numOfRows: 9,
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
  }

  async getItem(id) {
    const data = await axios.get(`${this.url}detailCommon?`, {
      params: {
        serviceKey: this.key,
        MobileOS: 'ETC',
        MobileApp: 'AppTest',
        defaultYN: 'Y',
        firstImageYN: 'Y',
        addrinfoYN: 'Y',
        mapinfoYN: 'Y',
        overviewYN: 'Y',
        contentId: id,
      },
    });

    if (data.data.response.header.resultCode === '0000') {
      return data.data.response.body.items.item;
    } else {
      throw new Error(
        `공공데이터포털 에러 코드: ${data.data.response.header.resultCode}`
      );
    }
  }
}

export default new TourApi(process.env.NEXT_PUBLIC_API_KEY);

const searchModel = require('../../models/searchModel');

// 검색 페이지 렌더링
exports.renderSearchPage = (req, res) => {
  // 이 부분에서 (시,도), (시,군,구), (읍,면,동)을 가져와서 뷰에 전달
  const cities = ['서울', '경기도', '부산광역시'];
  const districts = {
    '서울': ['마포구', '성북구', '관악구'],
    '경기도': ['수원시', '용인시', '성남시'],
    '부산광역시': ['해운대구', '사하구', '연제구']
  };
  const neighborhoods = {
    '마포구': ['합정동', '망원동', '상암동'],
    '성북구': ['돈암동', '길음동', '보문동'],
    '송파구': ['잠실2동', '잠실본동', '가락본동']
  };

  res.render('searchView', { cities, districts, neighborhoods });
};

exports.getSearchResults = async (req, res) => {
  const { city, district, neighborhood } = req.body;

  try {
    const results = await searchModel.getSearchResults(city, district, neighborhood);
    res.render('searchResultsView', { shops: results });
  } catch (err) {
    console.error('검색 결과 조회 오류:', err);
    res.status(500).send('검색 결과를 가져오는 도중에 오류가 발생했습니다.');
  }
};
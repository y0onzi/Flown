const searchModel = require('../../models/searchModel');

exports.renderSearchPage = (req, res) => {
  const cities = ['서울', '경기도', '부산광역시'];
  const districts = {
    '서울': ['성북구', '마포구', '관악구'],
    '경기도': ['수원시', '용인시', '성남시'],
    '부산광역시': ['해운대구', '사하구', '연제구']
  };
  const neighborhoods = {
    '성북구': ['돈암동', '길음동', '보문동'],
    '마포구': ['합정동', '망원동', '상암동'],
    '송파구': ['잠실2동', '잠실본동', '가락본동']
  };



  res.render('map/searchView', { cities, districts, neighborhoods });
};

exports.getSearchResults = async (req, res) => {

  const city = req.query.city;
  const district = req.query.district;
  const neighborhood = req.query.neighborhood;

  //받아온 주소 ...
  console.log(city);
  console.log(district);
  console.log(neighborhood);

  try {
    const results = await searchModel.getSearchResults(city, district, neighborhood);
    console.log("컨트롤러: "+ results[0]);

    //session 에서 가져오는거

    // const seller_id = req.session.seller_id;
    // console.log("판매자 세션 아이디" + seller_id);

    res.render('map/searchResultsView', { searchResults: results[0] });

   
  } catch (err) {
    console.error('검색 결과 조회 오류:', err);
    res.status(500).send('검색 결과를 가져오는 도중에 오류가 발생했습니다.');
  }
};

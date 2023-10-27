import React, { useState } from 'react';
import * as H from './HashtagStyle';
import UploadHeader from '../../components/uploadheader/UploadHeader';
import searchIcon from '../../assets/icon-search-gray.png';

export default function Hashtag() {
  const [searchText, setSearchText] = useState('#');
  const [inputText, setInputText] = useState('#');
  // 검색 결과를 저장할 state
  const [searchResult, setSearchResult] = useState([]);
  // 검색 결과 있는지 없는지 확인하는 state
  const [isResultEmpty, setIsResultEmpty] = useState(false);

  // 검색 결과를 가져오는 함수
  const fetchSearchResult = async () => {
    // 임시로 검색 결과를 만듬
    const result = ['후라이', '후라이의꿈', '후라이후라이'];

    if (inputText === '#한라산') {
      setSearchResult([
        `${inputText.slice(1)}에 대한 검색 결과가 없어요 ㅜ_ㅜ`,
      ]);
      setIsResultEmpty(true);
    } else {
      setSearchResult(result);
      setIsResultEmpty(false);
    }
    setSearchText(inputText);
  };

  const handleInputChange = (e) => {
    let text = e.target.value;
    if (!text.startsWith('#')) {
      text = '#' + text;
    }
    setInputText(text);
  };

  return (
    <H.HashtagWrapper>
      <UploadHeader okButtonText="확인" backButtonText="해시태그 추가" />
      <H.SearchBox>
        <H.SearchInput
          value={inputText}
          onChange={handleInputChange}
          placeholder="검색어를 입력하세요"
        />
        <H.SearchButton onClick={fetchSearchResult}>
          <img src={searchIcon} alt="search" />
        </H.SearchButton>
      </H.SearchBox>
      <H.SearchList>
        {searchResult.map((result, index) => (
          <H.SearchResult key={index}>
            {result.includes(searchText.slice(1))
              ? result
                  .split(new RegExp(`(${searchText.slice(1)})`, 'g'))
                  .map((str, index, array) => (
                    <>
                      {str === searchText.slice(1) ? (
                        <H.HighlightedText>{searchText}</H.HighlightedText>
                      ) : (
                        str
                      )}
                    </>
                  ))
              : result}
          </H.SearchResult>
        ))}
      </H.SearchList>
      {isResultEmpty && <H.AddTagBtn>태그 추가하기</H.AddTagBtn>}
    </H.HashtagWrapper>
  );
}

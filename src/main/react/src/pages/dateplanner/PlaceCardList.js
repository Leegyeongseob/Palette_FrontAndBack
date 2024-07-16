// PlaceCardList 컴포넌트

import React from "react";
import styled from "styled-components";

const PlaceCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  height: 28vh; /* 지도 영역의 높이를 제외한 남은 공간만큼 높이 설정 */
`;

const PlaceCard = styled.div`
  width: calc(33.33% - 20px); //3열로 정렬, 여백 포함
  
  margin: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 1px 2px #888;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    background: #888;
  }
`;

const PlaceCardLink = styled.a`
  color: #000;
  text-decoration: none;
  &:hover {
    color: red;
  }
`;

const PlaceCardText = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const PlaceCardAddress = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
`;

const PlaceCardPhone = styled.div`
  font-size: 12px;
  color: #0f7833;
  margin-bottom: 5px;
`;

const AddButton = styled.button`
  padding: 5px 10px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  float: right;

  &:hover {
    background-color: #444;
  }
`;

const PlaceCardList = ({onClickPlaceCard, currCategory, places, onClickPlaceBtn, selectedPlaces }) => {
  const isSelected = (place) => selectedPlaces.some((selected) => selected.id === place.id);
  if (!currCategory) {
    
    return null; // places 배열이 없거나 비어있으면 렌더링을 취소합니다.
  }
  
  return (
    <PlaceCardContainer>
      {places
        .filter((place) => !isSelected(place))
        .map((place, index) => (
          <PlaceCard onClick={() => onClickPlaceCard(place)} key={index}>
            <PlaceCardLink href={place.place_url} target="_blank" title={place.place_name}>
              <PlaceCardText>{place.place_name}</PlaceCardText>
            </PlaceCardLink>
            <PlaceCardAddress>{place.road_address_name}</PlaceCardAddress>
            <PlaceCardPhone>{place.phone}</PlaceCardPhone>
            <AddButton onClick={() => onClickPlaceBtn(place)}>추가</AddButton>
          </PlaceCard>
        ))}
    </PlaceCardContainer>
  );
};

export default PlaceCardList;

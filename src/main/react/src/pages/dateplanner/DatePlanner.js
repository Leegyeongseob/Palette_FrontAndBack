import React, { useState, useEffect, useRef, useCallback } from "react";
import styled, { css, keyframes } from "styled-components";
import MapContainer from "./MapContainer";
import PlannerForm from "./PlannerForm";
import SavedCoursesList from "./SavedCourseList";
import PlaceCardList from "./PlaceCardList";
import theme6 from "../../img/background/theme/6.jpg";
import DisplaceInfo from "./DisplaceInfo";
import MapModal from "./MapModal";
import DatePlannerAxios from "../../axiosapi/DatePlannerAxios";
import useAddress from "../../hooks/useLocation";
// import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
import { useNavigate, useParams } from "react-router-dom";
import ReactDOMServer from "react-dom/server";

const turnPageLeft = keyframes`
  0% {
    transform: perspective(1000px) rotateY(0deg);
    transform-origin: left;
  }
  30% {
    transform: perspective(1600px) rotateY(-25deg);
    transform-origin: left;
  } 
  100% {
    transform: perspective(1000px) rotateY(-180deg);
    transform-origin: left;
  }
`;

const BookWrapper = styled.div`
  width: 85%;
  height: 82.5%;
  margin-top: 3.5%;
  margin-left: 14px;
  background-size: cover;
  display: flex;
  justify-content: space-between;
`;

const LBookContainer = styled.div`
  background-image: url(${theme6});
  background-size: cover;
  background-position: left;
  width: 50%;
  height: 100%;
`;

const BookTheme2 = styled.div`
  width: 50%;
  height: 100%;
  background-image: url(${theme6});
  background-size: cover;
  transform: perspective(1000px) rotateY(0deg); /* 애니메이션 초기 위치 */
  transform-origin: left;
  background-position: right;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BookSign2 = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${theme6});
  background-size: cover;
  transform: perspective(1000px) rotateY(0deg); /* 애니메이션 초기 위치 */
  transform-origin: left;
  background-position: right;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${turnPageLeft} 1.8s forwards;
    `}
`;

const RBookContainer = styled.div`
  width: 100%;
  height: 100%;
  ${({ animate }) =>
    animate &&
    css`
      opacity: 0;
      transition: opacity 1.4s;
    `}
`;


const DatePlanner = ({url, clearUrl}) => {
  const { location } = useAddress();
  const [currCategory, setCurrCategory] = useState("");
  const [places, setPlaces] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [savedCourses, setSavedCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourseIndex, setCurrentCourseIndex] = useState(null);
  const [map, setMap] = useState(null);
  const placeOverlay = useRef(
    new window.kakao.maps.CustomOverlay({ zIndex: 1 })
  );
  // const contentNode = useRef(<EmptyDiv />);
  const mapContainer = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSelectedPlaces, setModalSelectedPlaces] = useState([]);
  // const modalMapContainerRef = useRef(null);
  const [numMarker, setNumMarker] = useState([]);
  const [title, setTitle] = useState("");
  // const email = sessionStorage.getItem("email");
  // const { coupleName } = useParams(); // useParams를 통해 coupleName 파라미터 추출
  const coupleName = sessionStorage.getItem("coupleName");
  const currentOverlayRef = useRef(null); // CustomOverlay 상태를 useRef로 관리
  console.log("coupleName : ", coupleName);

  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const pageMove = useCallback(() => {
    setAnimate(true);
    setTimeout(() => {
      navigate(url);
      clearUrl();
    }, 1800);
  }, [navigate, url, clearUrl]);

  useEffect(() => {
    if (url) {
      const encodedUrl = encodeURI(url); //공백을 문자로 인코딩
      if (window.location.pathname !== encodedUrl) {
        pageMove();
      } else {
        clearUrl();
      }
    }
  }, [url, pageMove, clearUrl]);

  // 모든 코스 조회 및 저장된 코스 목록 업데이트
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // const resCoupleName = await MemberAxiosApi.coupleNameSearch(email);
        console.log("데이트 플레너의 coupleName", coupleName);
        const courses = await DatePlannerAxios.getCoursesByCoupleName(
          // resCoupleName.data
          coupleName
        );
        console.log("도메인커플들어오나??", coupleName);
        setSavedCourses(courses);
      } catch (error) {
        console.error("❌ Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [coupleName]);

  const addNumMark = () => {
    // 선택된 장소를 numMarker에 추가
    setNumMarker([...numMarker, ...selectedPlaces]);
  };

  // 코스 저장 또는 수정
  const handleSaveCourse = async (newCourse) => {
    try {
      let savedCourse;
      //이메일로 커플이름 불러오는 부분
      // const resCoupleName = await MemberAxiosApi.coupleNameSearch(email);
      // newCourse.coupleName = resCoupleName.data;
      newCourse.coupleName = coupleName;
      if (isEditing) {
        console.log(
          `🔄 Updating course with ID ${savedCourses[currentCourseIndex].id}`
        );
        savedCourse = await DatePlannerAxios.updateCourse(
          savedCourses[currentCourseIndex].id,
          newCourse
        );
        console.log("✔️테스트 확인용", savedCourses[currentCourseIndex]);
        setSavedCourses((prevCourses) =>
          prevCourses.map((course, index) =>
            index === currentCourseIndex ? savedCourse : course
          )
        );
        setIsEditing(false);
        setCurrentCourseIndex(null);
      } else {
        console.log("🔄 Creating new course:", newCourse);
        savedCourse = await DatePlannerAxios.createCourse(newCourse);
        console.log("✔️ Course created:", savedCourse);
        setSavedCourses((prevCourses) => [...prevCourses, savedCourse]);
      }
      setSelectedPlaces([]);
      console.log("Course saved successfully:", savedCourse);
      console.log(newCourse);
    } catch (error) {
      console.error("❌ Error saving course:", error);
    }
  };

  // 선택한 코스 수정 모드로 전환
  const handleEditCourse = async (index) => {
    try {
      const courseId = savedCourses[index].id;
      console.log(`🔄 Fetching course with ID ${courseId}`);
      const course = await DatePlannerAxios.getCourseById(courseId);
      console.log(`✔️ Fetched course with ID ${courseId}:`, course);
      setSelectedPlaces(course.places);
      setTitle(course.title);
      setIsEditing(true);
      setCurrentCourseIndex(index);
    } catch (error) {
      console.error(
        `❌ Error fetching course with ID ${savedCourses[index].id}:`,
        error
      );
    }
  };

  // 코스 삭제
  const handleDeleteCourse = async (index) => {
    try {
      console.log(`🔄 Deleting course with ID ${savedCourses[index].id}`);
      await DatePlannerAxios.deleteCourse(savedCourses[index].id);
      console.log(`✔️ Course with ID ${savedCourses[index].id} deleted`);
      setSavedCourses((prevCourses) =>
        prevCourses.filter((_, i) => i !== index)
      );
      setSelectedPlaces([]);
      setTitle("");
      setIsEditing(false);
      setCurrentCourseIndex(null);
    } catch (error) {
      console.error("❌ Error deleting course:", error);
    }
  };

  // 장소 삭제
  const handleDeletePlace = (placeId) => {
    setSelectedPlaces((prevSelected) =>
      prevSelected.filter((place) => place.id !== placeId)
    );
  };

  // 장소 카드 클릭 시 처리
  const handlePlaceCardClick = (place) => {
    if (selectedPlaces.length >= 10) {
      alert("장소는 최대 10개까지 선택할 수 있습니다.");
      return;
    }

    const position = new window.kakao.maps.LatLng(place.y, place.x);
    map.panTo(position);
    setSelectedPlaces((prevSelected) => [...prevSelected, place]);
    addNumMark(); // 장소를 클릭할 때마다 numMarker에 추가
  };

  // 선택된 장소 초기화
  const handleClearPlaces = () => {
    setSelectedPlaces([]);
  };
  // 장소 카드 클릭 시 지도 이동 및 장소 정보 표시
  const onClickPlaceCard = (place) => {
    const position = new window.kakao.maps.LatLng(place.y, place.x);
    console.log("장소", position);
    map.panTo(position);
    // displayPlaceInfo(place);
  };

  

 

  // 모달 열기
  const openModal = async (index) => {
    try {
      const courseId = savedCourses[index].id;
      const course = await DatePlannerAxios.getCourseById(courseId);
      setModalSelectedPlaces(course.places);
      console.log("모달확인", course.places);
      setIsModalOpen(true);
    } catch (error) {
      console.error("❌", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // 선택된 장소들에 대한 새 마커를 생성합니다.
    const newMarkers = selectedPlaces.map((place, index) => {
      // 각 장소에 대해 새 마커를 생성합니다.
      const imageIndex = index + 1; // 인덱스 + 1을 이미지 이름으로 사용
      const markerSrc = `${process.env.PUBLIC_URL}/mapmarker/nummarkers/0${imageIndex}.png`;
      console.log(imageIndex);
      const markerSize = new window.kakao.maps.Size(40, 40);
      const markerImg = new window.kakao.maps.MarkerImage(
        markerSrc,
        markerSize
      );
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(place.y, place.x),
        // 마커의 위치를 장소의 좌표로 설정합니다.
        image: markerImg,
      });
      marker.setMap(map);
      // 생성된 마커를 지도에 추가합니다.
      return marker;
    });

    // 생성된 마커들을 상태로 업데이트합니다.
    setNumMarker(newMarkers);

    // 컴포넌트 언마운트 시 마커들을 정리합니다.
    return () => {
      newMarkers.forEach((marker) => {
        marker.setMap(null); // 지도에서 마커를 제거합니다.
      });
    };
  }, [selectedPlaces, map]);
  // 이 useEffect는 selectedPlaces와 map 상태가 변경될 때마다 실행됩니다.

  // 마커 간 화살표 렌더링
  useEffect(() => {
    if (selectedPlaces.length > 1) {
      // 선택된 장소가 2개 이상인 경우에만 실행됩니다.
      const linePath = selectedPlaces.map(
        (place) => new window.kakao.maps.LatLng(place.y, place.x)
        // 각 장소의 좌표를 LatLng 객체로 변환하여 linePath 배열에 저장합니다.
      );

      const polyline = new window.kakao.maps.Polyline({
        endArrow: true, // 경로의 끝에 화살표를 추가합니다.
        path: linePath, // 경로를 linePath 배열로 설정합니다.
        strokeWeight: 5, // 경로의 선 두께를 설정합니다.
      });

      polyline.setMap(map);
      // 생성된 폴리라인을 지도에 추가합니다.

      return () => {
        polyline.setMap(null); // 컴포넌트 언마운트 시 폴리라인을 지도에서 제거합니다.
      };
    }
  }, [selectedPlaces, map]);
  // 이 useEffect는 selectedPlaces와 map 상태가 변경될 때마다 실행됩니다.

  // 초기화 함수
  const clearOverlay = () => {
    if (currentOverlayRef.current) {
      currentOverlayRef.current.setMap(null); // 맵에서 제거
      currentOverlayRef.current = null; // Ref에서 제거
    }
  };
  // 장소 정보 표시 함수
  const displayPlaceInfo = (place) => {
    console.log("장소정보실행");

    // 이전 CustomOverlay 제거
    clearOverlay();

    // CustomOverlay에 표시될 콘텐츠 HTML 생성
    const content = ReactDOMServer.renderToString(
      <DisplaceInfo place={place} />
    );

    // 새로운 CustomOverlay 생성 및 설정
    const newOverlay = new window.kakao.maps.CustomOverlay({
      content: content,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });

    // 맵에 추가
    newOverlay.setMap(map);

    // 상태 업데이트
    currentOverlayRef.current = newOverlay; // Ref를 사용하여 업데이트
    console.log("setCurrentOverlay", newOverlay);
  };

  return (
    <BookWrapper>
      <LBookContainer>
        <PlannerForm
          title={title}
          selectedPlaces={selectedPlaces}
          handleSaveCourse={handleSaveCourse}
          setSelectedPlaces={setSelectedPlaces}
          isEditing={isEditing}
          handleDeletePlace={handleDeletePlace}
          handleClearPlaces={handleClearPlaces}
        />

        <SavedCoursesList
          savedCourses={savedCourses}
          setSelectedCourse={(course) => setSelectedPlaces(course.places)}
          handleEditCourse={handleEditCourse}
          handleDeleteCourse={handleDeleteCourse}
          openModal={(index) => openModal(index)}
        />
      </LBookContainer>
      <BookTheme2>
      <BookSign2 animate={animate}>
        <RBookContainer animate={animate}>
          <MapContainer
            clearOverlay={clearOverlay}
            mapContainer={mapContainer}
            displayPlaceInfo={displayPlaceInfo}
            placeOverlay={placeOverlay}
            map={map}
            setMap={setMap}
            currCategory={currCategory}
            setCurrCategory={setCurrCategory}
            places={places}
            setPlaces={setPlaces}
            location={location}
          />
          <PlaceCardList
            places={places}
            onClickPlaceBtn={handlePlaceCardClick}
            onClickPlaceCard={onClickPlaceCard}
            selectedPlaces={selectedPlaces}
            currCategory={currCategory}
          />
        </RBookContainer>
      </BookSign2>
      </BookTheme2>
      <MapModal
        isOpen={isModalOpen}
        onClose={closeModal}
        mapContainerRef={mapContainer}
        map={map}
        selectedPlaces={modalSelectedPlaces}
        setNumMarker={setNumMarker}
      />
    </BookWrapper>
  );
};

export default DatePlanner;

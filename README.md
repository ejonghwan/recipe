# 레시피 사이트

## 1. 소개
레시피 API를 가져와서 필요한 레시피 정보를 제공해주는 웹사이트를 제작했습니다.
메인 테마를 변경할 수 있는 기능이 있고 레시피를 검색하면 레시피에 대한 상세 내용, 그리고 즐겨찾기 기능이 있습니다. 

NextJS를 학습하며 클론코딩했습니다.
Next가 제공해주는 기능으로 SSR, CSR을 사용하며 차이점과 장단점을 학습하며 적용했습니다.


&nbsp;
&nbsp;
****
&nbsp;
&nbsp;

## 2. 배포주소
[https://recipe-fh0yu96w9-jjongrrr-gmailcom.vercel.app/](https://recipe-fh0yu96w9-jjongrrr-gmailcom.vercel.app/)

   
&nbsp;
&nbsp;
****
&nbsp;
&nbsp;



## 3. 사용기술 
NextJS, React-query, SASS


&nbsp;
&nbsp;
****
&nbsp;
&nbsp;

## 4. 폴더 구조
<img src="https://github.com/ejonghwan/recipe/assets/53946298/9a71cce4-c658-466a-a599-56e19e99c1a3" width="30%" height="auto"></img>   
컴포넌트를 Atomic Pattern으로 Molecules(2개 이상의 원자), Organisms(분자의 모음), Templates(유기체 모음)으로 나눠 제작했고 이를 pages에서 import하여 사용했습니다.    

   
&nbsp;
&nbsp;
****
&nbsp;
&nbsp;


## 6. 기능

### 6-1. 메인
<video src="https://github.com/ejonghwan/recipe/assets/53946298/1b295e2f-52ee-4ba8-94fb-6d1b01485348" width="50%" muted  autoplay loop></video>
##### 기능 설명
* 메인은 SwiperJS를 활용하여 줌인, 줌아웃을 사용해 인터렉션을 넣었습니다.
* 테마를 SASS 변수에 담아 사용자가 변경 시 한번에 변경되게 작업했습니다.
* 메인 카테고리는 접속 시 일정 시간동안 한번씩 랜덤하게 API요청 하게끔 작업했습니다.

&nbsp;
&nbsp;
&nbsp;

### 6-2. 레시피 리스트
<video src="https://github.com/ejonghwan/recipe/assets/53946298/820b6946-8317-4f7a-8f87-bae27db69aa6" width="50%" muted  autoplay loop></video>
##### 기능 설명
* React-query의 데이터 캐시기능을 사용해서 리스트에 접근하는 처음에만 요청이 가고 그 다음에 탭을 했을 때 API요청없이 캐싱된 데이터를 로딩없이 화면에 표시됩니다. 

&nbsp;
&nbsp;
&nbsp;

### 6-3. 검색, 상세페이지, 즐겨찾기
<video src="https://github.com/ejonghwan/recipe/assets/53946298/4c5cd5ab-3dc5-4d6a-b0b7-2c3c1591b26b" width="50%" muted  autoplay loop></video>
##### 기능 설명
* 상세페이지에는 재료, 조리 방법 등의 JSON 데이터를 가공하여 화면에 표시했습니다.
* 검색기능에는 debounce을 커스텀 훅으로 제작, 적용하여 사용자가 키보드 동작을 멈췄을 때 지정된 시간이 지나면 API 요청을 하게 작업했습니다.
* 레시피를 즐겨찾기를 하면 My Favorait에 저장이 되고 취소 시 삭제됩니다.


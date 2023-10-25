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
컴포넌트를 Atomic Pattern으로 Molecules(2개 이상의 원자), Organisms(분자의 모음), Templates(유기체 모음)으로 나눠 제작했고 이를 pages에서 import하여 사용했습니다. 
<img src="https://github.com/ejonghwan/recipe/assets/53946298/9a71cce4-c658-466a-a599-56e19e99c1a3" width="70%" height="auto"></img>
   
   
&nbsp;
&nbsp;
****
&nbsp;
&nbsp;


## 6. 기능

### 6-1. 메인
<video src="https://github.com/ejonghwan/recipe/assets/53946298/1b295e2f-52ee-4ba8-94fb-6d1b01485348" width="50%" muted  autoplay loop></video>
##### 기능 설명
* 메인은 풀 사이즈 동영상 리소스를 활용했습니다.

&nbsp;
&nbsp;
&nbsp;

### 6-2. 갤러리
<video src="https://github.com/ejonghwan/recipe/assets/53946298/820b6946-8317-4f7a-8f87-bae27db69aa6" width="50%" muted  autoplay loop></video>
##### 기능 설명
* 플리커 API를 활용하여 내 갤러리에 제네시스 IMG를 등록 후 제네시스 갤러리를 만들었습니다.

&nbsp;
&nbsp;
&nbsp;

### 6-3. 콘택
<video src="https://github.com/ejonghwan/recipe/assets/53946298/4c5cd5ab-3dc5-4d6a-b0b7-2c3c1591b26b" width="50%" muted  autoplay loop></video>
##### 기능 설명
* map info json의 데이터를 받아 동적으로 지점, 주소, 전화, 보유차량 등을 뿌려주는데 Kakao API와 연결하는데 순서 주의하며 작업했습니다.


&nbsp;
&nbsp;
&nbsp;

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getRecipeByCategory = async ({ queryKey }) => {
	const { data } = await axios.get(`/filter.php?c=${queryKey[1]}`);
	return data?.meals || [];
};

export const useRecipeByCategory = (DebouncedCategory, DebouncedSearch) => {
	return useQuery(['RecipeByCategory', DebouncedCategory], getRecipeByCategory, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24, //캐싱타임 24시간. 자주 바뀌지 않는 데이터는 길게줌. 게시판같은건 0
		staleTime: 0,
		retry: 3, //데이터 요청 시도 횟수(디폴트3, 네트워트상황이 안좋을때 재시도횟수 늘림)
		//enabled값에는 truthy, falsy값이 적용안됨 (직접 boolean값을 생성해서 지정)
		//지금 상황에서는 SSG방식으로 초기 데이터를 호출하고 있기 때문에 아래 구문을 지정안해도 잘 동작됨
		//CSR방식으로 호출할떄에는 초기값이 undefined이기 때문에 발생하는 에러를 미리 방지
		enabled: DebouncedCategory !== undefined || DebouncedSearch === '', //useQuery의 호출 유무 true(실행, 디폴트값) false(실행안함)
	});
};


const getRecipeBySearch = async ({ queryKey }) => {
	const { data } = await axios.get(`/search.php?s=${queryKey[1]}`);
	return data?.meals || [];
};

export const useRecipeBySearch = (DebouncedSearch) => {
	return useQuery(['RecipeBySearch', DebouncedSearch], getRecipeBySearch, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		enabled: DebouncedSearch !== '',
	});
};



/*

###### 중요 이슈

   ** 프로덕션 모드에서 프레이머 이슈 (이건 리액트에서 코드스플리팅하면 같은 현상 발생할듯 ? )
   SSG ISR
   넥스트는 프로덕션 모드에서 코드스플리팅을 해서 프리로드를 하는데 마우스오버했을때 json데이터를 불러옴 
   그래서 각 컴포넌트 혹은 페이지의 리소스(스타일)를 가져오기 전 이거나 미리 날린 후. 
   
   근데 프레이머는 언마운트 되는것을 애니메이션 끝날떄까지 미루는 모듈이기 떄문에 
   스타일은 이미 날라가거나 불러오기 전인데 마운트 되거나 언마운드 돼서 스타일이 깨지는 현상. 


   정적인 페이지는 상관없음
   js로 붙이는 동적인 스타일들은 저 문제점이 발생
   테일윈드css / 모듈 scss / 스타일드 컴포넌트. 
   
   
   ** 해결방법
    1. 라우터가 변경되는 시점마다, 언마운트 돼서 스타일이 날라가기 직전에 해당 스타일 노드를 head에서부터 복사한 다음 next 고유 속성명 제거 
   (넥스트에서 특정 속성명을 구분으로 해서 제거하기 때문 SSG 어쩌고~)

    2. 그다음 복사한 style node를 다시 강제로 head에 삽입 
    3. 이렇게 복사된 style node는 next가 제거 하지 못하고 router가 변경되더라도 복사된 style이 유지됨 
    4. 하지만 그대로 두면 애니메이션이 끝나고 언마운트 될때 복사한게 중첩되기 때문에  강제로 복사한건 다시 삭제
    5. 위 기능을 함수로 만들어서 루트 컴포넌트에서 라우트가 변경될떄마다 호출



*/
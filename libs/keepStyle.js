import Router from 'next/router';

export const keepStyle = delay => {
    Router.events.on('beforeHistoryChange', () => {
        const nodes = document.querySelectorAll('link[rel=stylesheet], style:not([media=x])');
        const copies = [...nodes].map(el => el.cloneNode(true)) //true 옵션. 자식 노드까지 모두 복사
       
        // next가 복사한 스타일 노드를 제거하지 못하도록 전용 속성명을 제거
        for(let copy of copies) {
            copy.removeAttribute('data-n-g');
            copy.removeAttribute('data-n-href');
            document.head.appendChild(copy);
        }

        const handler = () => {
            Router.events.off('routeChangeComplete', handler);
            window.setTimeout(() => {
                for(let el of copies) {
                    document.head.removeChild(el)
                }
            }, delay)
        }

        Router.events.on('routeChangeComplete', handler);
    })
}
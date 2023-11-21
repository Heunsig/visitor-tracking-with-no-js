# Javascript 사용하지 않고 방문자 분석하기
이 프로젝트는 Client-side Javascript를 전혀 사용하지 않고, 오로지 CSS만을 통해 웹사이트 방문자 분석을 구현한 예제입니다. 자세한 방법론은 [How Bear does analytics with CSS](https://herman.bearblog.dev/how-bear-does-analytics-with-css/)에 설명되어 있습니다.


###  예제 실행 절차
1. Redis 설치  
    Docer를 활용하여 Redis를 설치합니다:
    ```bash
    docker run --name my-redis -d redis
    ```
2. 패키지 설치  
    프로젝트에 필요한 패키지를 pnpm을 통해 설치합니다 (npm이나 yarn을 사용해도 됩니다):
    ```bash
    pnpm install
    ```
3. 개발 서버 시작  
    ```bash
    pnpm run dev
    ```
4. 샘플 데이터 설정  
    웹 브라우저에서 [http://localhost:8000/seeds](http://localhost:8000/seeds)에 접근하여 샘플 데이터를 설정합니다.
5. Demo 실행  
    설정을 마친 후, 브라우저에서 [http://localhost:8000](http://localhost:8000)로 접속하여 데모를 실행합니다.

### ENV
|Key|Description|
|-|-|
|REDIS_URL(required)|Redis URL을 설정합니다. EX) 127.0.0.1:6379|
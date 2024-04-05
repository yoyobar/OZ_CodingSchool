## 투두리스트 (Todo List)

### 개발 도구
![HTML5](https://img.shields.io/badge/-HTML5-C34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white)<br>
![VS CODE](https://img.shields.io/badge/-VS%20CODE-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white)
<img src="https://img.shields.io/badge/-open%20weather%20api-eb6e4b?style=for-the-badge&Color=white&href"></img>

### 주요 기능
- OpenWeather API 연동을 통한 GPS 날씨 정보 획득
- 비동기 처리를 이용한 애니메이션 처리 (Alert 및 Weather 알림)
- Localstorage내 투두리스트 정보 등록

### Trouble shooting
- Fetch로 통한 정보의 `JSON.parse` 가 정상적으로 동작하지 않음<br>

  해결 수단 : `JSON`타입의 데이터가 `Header` 데이터를 포함해서 가지고 올경우, `json()`를 이용하여 처리
```javascript
    fetch(
        (...)
    )
        .then((res) => {
            return res.json();
        })
```

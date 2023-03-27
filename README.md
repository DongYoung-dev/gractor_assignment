# gractor_assignment

API 정의서
![image](https://user-images.githubusercontent.com/86117661/227777697-eb79967d-4726-4f39-b53b-22ac9e0596a3.png)
![image](https://user-images.githubusercontent.com/86117661/227821646-6a0c97c0-4636-467f-90a1-b94bae7f914d.png)



1. 우분투에 배포 후 데이터를 수집해봤더니 baseTime이 우분투의 UTC 시간에 맞춰져서 실행됨<br/>
-> sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime 명령어를 통해 타임존을 KST 시간으로 변경
<br/>
2. 세부지역 추가를 위한 함수 추가
![image](https://user-images.githubusercontent.com/86117661/227844182-44b5c32a-6276-4de0-887f-24d89ea46157.png)


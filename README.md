# Pickles API Document


## Manual Installation

1.install docker desktop  

2.clone this repository
```
git clone 레포지토리 주소
```


3.download .env in discord and copy in working folder

4.run command for docker(in re)
```bash
docker-compose up -d --build
```

5.check out http://localhost:3001/docs/

## how to check db status


1.run this command
```
docker exec -it <container-name> bash
mysql -u <user> -p
<user password>
use <database name>

desc <table name>;
or
show tables;
```

## 참고사항
JS의 변화사항은 도커에서 감지해서 자동 재구동   
DB의 변화는 수동으로 적용해줘야함   
현재는 서버 시동 시 models에 있는 테이블 insert하는 방식   



## License

[MIT](LICENSE)

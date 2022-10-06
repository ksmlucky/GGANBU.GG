package com.ssafy.gganbu.Service;

import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicHeader;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class RiotAPIServiceImpl implements RiotAPIService {

    private List<String> apiKeys;

    private int keyIdx = 0;

    private HttpClient client;

    public RiotAPIServiceImpl( @Value("${riot-api.api-keys}") List<String> apiKeys){

        this.apiKeys = apiKeys;
        List<Header> headers = new ArrayList<>();
        headers.add(new BasicHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.53"));
        headers.add(new BasicHeader("Accept-Language", "ko,en;q=0.9,en-US;q=0.8"));
        headers.add(new BasicHeader("Accept-Charset", "application/x-www-form-urlencoded; charset=UTF-8"));
        headers.add(new BasicHeader("Origin", "https://developer.riotgames.com"));
//        headers.add(new BasicHeader("X-Riot-Token", apiKeys.get(keyIdx)));

        client =HttpClients.custom().setDefaultHeaders(headers).build();

    }
    @Override
    public HttpResponse commonRiotAPI(String url) throws IOException {
        HttpGet getRequest = new HttpGet(url);
        getRequest.addHeader("X-Riot-Token", apiKeys.get(keyIdx));
        HttpResponse response = client.execute(getRequest);

        return response;
    }

    //자동 갱신
    @Override
    public HttpResponse commonRiotAPI2(String url) throws IOException, InterruptedException {
        HttpGet getRequest = new HttpGet(url);
        getRequest.addHeader("X-Riot-Token", apiKeys.get(keyIdx));
        HttpResponse response = client.execute(getRequest);

        long statusCode = response.getStatusLine().getStatusCode();
        while(statusCode == 429 || statusCode == 503 || (statusCode == 403 && apiKeys.size() >= 2)){
            // 키가 만료되었을 경우 키 삭제.
            if (statusCode == 403 && apiKeys.size() >= 2) {
                removeAPIKey();
                System.out.println("deleting expired Key");
            }
            changeAPIKey();
            getRequest.setHeader("X-Riot-Token", apiKeys.get(keyIdx));

            response = client.execute(getRequest);
            statusCode = response.getStatusLine().getStatusCode();
        }
        return response;
    }

    public void removeAPIKey(){
        apiKeys.remove(keyIdx);
        keyIdx = 0;
    }

    public void changeAPIKey() throws InterruptedException {
        keyIdx = (keyIdx + 1) % apiKeys.size();
        Thread.sleep(1000);
    }

}

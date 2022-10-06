package com.ssafy.gganbu.Service;

import org.apache.http.HttpResponse;

import java.io.IOException;

public interface RiotAPIService {
    public HttpResponse commonRiotAPI(String url) throws IOException;
    public HttpResponse commonRiotAPI2(String url) throws IOException, InterruptedException;

}

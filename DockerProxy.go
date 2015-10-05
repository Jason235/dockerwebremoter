package main

import (
	"io"
	"log"
	"net"
	"net/http"
	"net/http/httputil"
)

func HandleProxy(w http.ResponseWriter, req *http.Request) {
	// w.Write([]byte("Hello"))

	//log.Println(req)
	dumpRequest(req)
	client, err := net.Dial("unix", "/var/run/docker.sock")

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Println(err)
		return
	}

	httpclient := httputil.NewClientConn(client, nil)

	defer httpclient.Close()

	res, err := httpclient.Do(req)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Println(err)
		return
	}

	defer res.Body.Close()

	dumpResponse(res)

	copyHeader(w.Header(), res.Header)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Add("Access-Control-Allow-Headers", "Origin")
	w.Header().Add("Access-Control-Allow-Headers", "X-Requested-Width")
	w.Header().Add("Access-Control-Allow-Headers", "Context-Type")
	w.Header().Add("Access-Control-Allow-Headers", "accept")
	if _, err := io.Copy(w, res.Body); err != nil {
		log.Println(err)
	}

	//log.Println(w)
}

func dumpRequest(req *http.Request) {
	log.Println("Request: ==========")
	log.Println("Head : ", req.Header)
	log.Println("===================")
}

func dumpResponse(rsp *http.Response) {
	log.Println("Response: =========")
	log.Println("Status: ", rsp.Status)
	log.Println("Head:", rsp.Header)
	log.Println("Body:", rsp.Body)
	log.Println("===================")
}

func copyHeader(dst, src http.Header) {
	for k, vv := range src {
		for _, v := range vv {
			dst.Add(k, v)
		}
	}
}

func main() {
	http.HandleFunc("/", HandleProxy)
	http.ListenAndServe("0.0.0.0:6543", nil)
}

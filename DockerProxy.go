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

	copyHeader(w.Header(), res.Header)
	if _, err := io.Copy(w, res.Body); err != nil {
		log.Println(err)
	}

	log.Println(w)
}

func dumpRequest(req *http.Request) {
	log.Println("Head : ", req.Header)
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

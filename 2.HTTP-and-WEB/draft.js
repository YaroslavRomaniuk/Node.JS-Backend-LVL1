let string = `GET /doc/test.html HTTP/1.1 
Host: www.test101.com 
Accept: image/gif, image/jpeg, */* 
Accept-Language: en-us 
Accept-Encoding: gzip, deflate 
User-Agent: Mozilla/4.0 
Content-Length: 35

bookId=12345&author=Tan+Ah+Teck`;

let string2 = `GET /sum?nums=1,25,3 HTTP/1.1 
Host: www.test101.com 
Accept: image/gif, image/jpeg, */* 
Accept-Language: en-us 
Accept-Encoding: gzip, deflate 
User-Agent: Mozilla/4.0 
Content-Length: 35

bookId=12345&author=Tan+Ah+Teck`;

let string3 = `GET /?nums=1,25,3 HTTP/1.1 
Host: www.test101.com 
Accept: image/gif, image/jpeg, */* 
Accept-Language: en-us 
Accept-Encoding: gzip, deflate 
User-Agent: Mozilla/4.0 
Content-Length: 35

bookId=12345&author=Tan+Ah+Teck`;

let string4 = `GET /sum?=1,25,3 HTTP/1.1 
Host: www.test101.com 
Accept: image/gif, image/jpeg, */* 
Accept-Language: en-us 
Accept-Encoding: gzip, deflate 
User-Agent: Mozilla/4.0 
Content-Length: 35

bookId=12345&author=Tan+Ah+Teck`;

/**
 * Parses a TCP string representation of an HTTP request and returns an object containing the parsed data.
 * @param {string} string - The TCP string representation of the HTTP request.
 * @returns {object} - An object containing the parsed data of the HTTP request.
 */
function parseTcpStringAsHttpRequest(string) {
  let methodData,
    uriData,
    headersData = {},
    bodyData,
    key,
    value;

  let bufferArray = string.split('\n');
  let startLine = bufferArray[0].split(' ');

  // Extract the method and URI from the start line
  methodData = startLine[0];
  uriData = startLine[1];

  // Iterate through the remaining lines to extract headers data
  for (let i = 1; i < bufferArray.length; i++) {
    let bufferStringArray;
    if (bufferArray[i].includes(":")) {
      bufferStringArray = bufferArray[i].split(": ");
      key = bufferStringArray[0];
      value = bufferStringArray[1];
      headersData[key] = value;
    }
  }

  // Check if the last line contains the body data
  if (!bufferArray[bufferArray.length - 1].includes(":")) {
    bodyData = bufferArray[bufferArray.length - 1];
  }

  return {
    method: methodData,
    uri: uriData,
    headers: headersData,
    body: bodyData,
  };
}


function processHttpRequest($method, $uri, $headers, $body) {

  let statusCode,
  statusMessage,
  body;

  if($method === "GET" && /^\/sum\?nums=/g.test($uri)){
    
    statusCode = "200";
    statusMessage = "OK";
    body = $uri.match(/\d+/g).reduce((partialSum, a) => partialSum + parseInt(a), 0);
    outputHttpResponse(statusCode, statusMessage, body);
  }
  
  if($method === "GET" && !/^\/sum/g.test($uri)) {

    statusCode = "404";
    statusMessage = "Not Found";
    body = "not found";

    outputHttpResponse(statusCode, statusMessage, body);
  }

  if($method !== "GET" || !/^\?nums=/g.test($uri)) {

    statusCode = "400";
    statusMessage = "Bad Request";
    body = "bad request";

    outputHttpResponse(statusCode, statusMessage, body);
  }
}


function outputHttpResponse(statusCode, statusMessage, body) {

  console.log(
`HTTP/1.1 ${statusCode} ${statusMessage}
Date: ${Date()}
Server: Apache/2.2.14 (Win32)
Content-Length: ${String(body).length}
Connection: Closed
Content-Type: text/html; charset=utf-8
  
${body}`);

}


let test = parseTcpStringAsHttpRequest(string2);
let test2 = parseTcpStringAsHttpRequest(string3);
let test3 = parseTcpStringAsHttpRequest(string4);
//console.log(test);

//let testRequest = processHttpRequest(test.method,test.uri,test.headers,test.body);
//let testRequest2 = processHttpRequest(test2.method,test2.uri,test2.headers,test2.body);
let testRequest3 = processHttpRequest(test3.method,test3.uri,test3.headers,test3.body);
//outputHttpResponse(200,`OK`,"aaa: bbb","1234567test")

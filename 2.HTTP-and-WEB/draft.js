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

  let bufferArray = string.split('\n').filter(function (el) {
    return el != '';
  });

  //console.log(bufferArray);
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

  if ($method === "GET" && /^\/sum\?nums=/g.test($uri)) {

    statusCode = "200";
    statusMessage = "OK";
    body = $uri.match(/\d+/g).reduce((partialSum, a) => partialSum + parseInt(a), 0);
    outputHttpResponse(statusCode, statusMessage, body);
  }

  if ($method === "GET" && !/^\/sum/g.test($uri)) {

    statusCode = "404";
    statusMessage = "Not Found";
    body = "not found";

    outputHttpResponse(statusCode, statusMessage, body);
  }

  if ($method !== "GET" || !/^\?nums=/g.test($uri)) {

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


//let test = parseTcpStringAsHttpRequest(string2);
//let test2 = parseTcpStringAsHttpRequest(string3);
//let test3 = parseTcpStringAsHttpRequest(string4);
//console.log(test);

//let testRequest = processHttpRequest(test.method,test.uri,test.headers,test.body);
//let testRequest2 = processHttpRequest(test2.method,test2.uri,test2.headers,test2.body);
//let testRequest3 = processHttpRequest(test3.method,test3.uri,test3.headers,test3.body);
//outputHttpResponse(200,`OK`,"aaa: bbb","1234567test")



let string5 = `POST /api/checkLoginAndPassword HTTP/1.1
Accept: */*
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/4.0
Content-Length: 35

login=student&password=1234
`;

let string6 = `POST /api/checkLoginAndPassword HTTP/1.1
Accept: */*
Content-Type: application/x-www-form-urlenco
User-Agent: Mozilla/4.0
Content-Length: 35

login=student&password=12345
`;

//let test5 = parseTcpStringAsHttpRequest(string5);
//console.log(test5)
//let testOutput = processHttpRequest1(test5.method, test5.uri, test5.headers, test5.body);
//let test6 = parseTcpStringAsHttpRequest(string6);
//let testOutput2 = processHttpRequest1(test6.method,test6.uri,test6.headers,test6.body);

function processHttpRequest1($method, $uri, $headers, $body) {

  let statusCode,
    statusMessage,
    body;
  //console.log($method);
  //console.log($uri);
  //console.log($headers['Content-Type']);
  //console.log($body);

  if ($method === "POST" && $uri === "/api/checkLoginAndPassword"
    && $headers['Content-Type'] === "application/x-www-form-urlencoded") {

    let bodyBuffer = $body.split(/[\=\&]+/);
    let loginAndPass = {};
    let loginPasswordDataBase = parseLoginPasswordDataBase("passwords111.txt");

    loginAndPass[bodyBuffer[0]] = bodyBuffer[1];
    loginAndPass[bodyBuffer[2]] = bodyBuffer[3];

    //console.log(loginAndPass.login);
    //console.log(loginAndPass.password);
    //console.log(loginPasswordDataBase["student"]);

    if (loginPasswordDataBase !== -1) {
      if (loginPasswordDataBase.hasOwnProperty(loginAndPass.login)
        && loginPasswordDataBase[loginAndPass.login] === loginAndPass.password) {

        statusCode = "200";
        statusMessage = "OK";
        body = '<h1 style="color:green">FOUND</h1>';

        outputHttpResponse(statusCode, statusMessage, body);
      } else {
        statusCode = "401";
        statusMessage = "Unautorized";
        body = '<h1 style="color:red">WRONG LOGIN OR PASSWORD</h1>';

        outputHttpResponse(statusCode, statusMessage, body);
      }
    } else {
      statusCode = "500";
      statusMessage = "Internal Server Error";
      body = '<h1 style="color:red">Internal Server Error</h1>';

      outputHttpResponse(statusCode, statusMessage, body);
    }


  } else {
    statusCode = "400";
    statusMessage = "Bad Request";
    body = "bad request";

    outputHttpResponse(statusCode, statusMessage, body);

  }
}


function parseLoginPasswordDataBase(filePath) {

  let fs = require("fs");
  let data;

  if (fs.existsSync(filePath)) {
    data = require("fs").readFileSync(filePath, "utf-8");

    let dataBuffer = data.split('\r\n');

    console.log(dataBuffer);
    let loginPasswordDataBase = {};
    let loginPasswordBuffer;

    for (let i = 0; i < dataBuffer.length; i++) {
      loginPasswordBuffer = dataBuffer[i].split(':');
      loginPasswordDataBase[loginPasswordBuffer[0]] = loginPasswordBuffer[1];

    }

    return loginPasswordDataBase

  } else {

    return -1;
  }
}



let string7 = `GET /hey/hello.html HTTP/1.1
Host: student.shpp.me 
Accept: image/gif, image/jpeg, */* 
Accept-Language: en-us 
Accept-Encoding: gzip, deflate 
User-Agent: Mozilla/4.0 
Content-Length: 35

bookId=12345&author=Tan+Ah+Teck
`;

let testFiles = parseTcpStringAsHttpRequest(string7);
//console.log(test5)
let testOutputFiles = processHttpRequest2(testFiles.method, testFiles.uri, testFiles.headers, testFiles.body);

function processHttpRequest2($method, $uri, $headers, $body) {

  let statusCode,
    statusMessage,
    body,
    filePath,
    hostContent;

  if ($method !== "GET" || !/\w+.shpp.me/g.test($headers.Host)) {
    statusCode = "404";
    statusMessage = "Not Found";
    body = "not found";

    outputHttpResponse(statusCode, statusMessage, body);
    return
  } else {
    hostContent = $headers.Host.split('.')[0];
  }

  if (hostContent === "student" || hostContent === "another") {
    if ($uri !== "/") {
      filePath = `${__dirname}./${hostContent}${$uri}`
    } else {
      filePath = `${__dirname}./${hostContent}/index.html`
    }

    if (!filePath.startsWith(__dirname)) {
      statusCode = "403";
      statusMessage = "Not Found";
      body = "not found";

      outputHttpResponse(statusCode, statusMessage, body);
      return
    }

    let fs = require("fs");
    let dataFile;
    console.log($uri)

    if (fs.existsSync(filePath)) {
      dataFile = require("fs").readFileSync(filePath, "utf-8");
      console.log(dataFile);
    }
    return dataFile;

  } else {
    statusCode = "404";
    statusMessage = "Not Found";
    body = "not found";

    outputHttpResponse(statusCode, statusMessage, body);
    return
  }
}





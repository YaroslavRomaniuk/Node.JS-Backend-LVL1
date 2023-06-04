/**
   * Reads input from standard input until a line break is encountered.
   * Concatenates the input lines into a string and returns it.
   *
   * @returns {string} The concatenated input string.
   */
function readHttpLikeInput() {
  var fs = require("fs");
  var res = "";
  var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
  let was10 = 0;
  for (; ;) {
    try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) { break; /* windows */ }
    if (buffer[0] === 10 || buffer[0] === 13) {
      if (was10 > 10)
        break;
      was10++;
    } else
      was10 = 0;
    res += new String(buffer);
  }

  return res;
}

let contents = readHttpLikeInput();

/**
 * Outputs the HTTP response to the console.
 *
 * @param {string} statusCode - The status code of the response.
 * @param {string} statusMessage - The status message of the response.
 * @param {string} body - The body content of the response.
 */

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

/**
 * Processes the HTTP request based on the method, URI, headers, and body.
 * Determines the appropriate response based on the request parameters.
 * Calls the `outputHttpResponse` function to output the response.
 *
 * @param {string} $method - The HTTP method of the request.
 * @param {string} $uri - The URI of the request.
 * @param {Object} $headers - The headers object of the request.
 * @param {string} $body - The body content of the request.
 */
function processHttpRequest($method, $uri, $headers, $body) {

  let statusCode,
    statusMessage,
    body,
    filePath,
    hostContent;

  // Check if the method is not GET or the Host header doesn't match the expected pattern
  if ($method !== "GET" || !/\w+.shpp.me/g.test($headers.Host)) {
    statusCode = "404";
    statusMessage = "Not Found";
    body = "not found";

    outputHttpResponse(statusCode, statusMessage, body);
    return
  } else {
    hostContent = $headers.Host.split('.')[0];
  }

  // Check if the hostContent is "student" or "another"
  if (hostContent === "student" || hostContent === "another") {
    if ($uri !== "/") {
      filePath = `${__dirname}./${hostContent}${$uri}`
    } else {
      filePath = `${__dirname}./${hostContent}/index.html`
    }

    // Check if the filePath is within the allowed directory
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
    
    // Check if the file exists
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


/**
 * Parses the TCP string as an HTTP request.
 * Extracts the method, URI, headers, and body from the input string.
 *
 * @param {string} $string - The TCP string representing an HTTP request.
 * @returns {Object} An object containing the parsed HTTP request data.
 *                   { method, uri, headers, body }
 */

function parseTcpStringAsHttpRequest($string) {
  let methodData,
    uriData,
    headersData = {},
    bodyData,
    key,
    value;

  let bufferArray = $string.split('\n');
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

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body);
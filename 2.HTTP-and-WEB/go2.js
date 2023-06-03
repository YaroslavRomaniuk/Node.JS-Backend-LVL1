function readHttpLikeInput(){
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for(;;){ 
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) {break; /* windows */}
        if(buffer[0] === 10 || buffer[0] === 13) {
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

  console.log(bufferArray);
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
console.log(JSON.stringify(http, undefined, 2));

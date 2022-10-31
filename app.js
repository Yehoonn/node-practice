const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const port = 8080;

// http.createServer(8080, () => {
//   console.log("http server start port : 8080");
// });

const readFile = (path) => {
  return fs.readFileSync(path, (err) => {
    if (err) throw err;
  });
};

const connect = (status, path, type, res) => {
  res.writeHead(status, { "Content-Type": type });
  res.write(readFile(path));
  res.end();
};

const text = (text) => {
  let a = text.split("");
  a.push('"');
  a.unshift('"');
  let b = a.join("");
  return b;
};
let html;
let css;
let js;

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  const path = url.parse(req.url, true).pathname;
  if (query.css !== undefined) {
    html = query.html;
    css = query.css;
    js = query.js;
  }

  if (path === "/") {
    connect(200, html, "text/html", res);
  } else if (path === "/style.css") {
    connect(200, css, "text/css", res);
  } else if (path === "/index.js") {
    connect(200, js, "text/javascript", res);
  } else if (path === "/about") {
    connect(200, "./about.html", "text/html", res);
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
    res.end(
      "<h1>해당하는 주소가 없습니다</h1><br><a href='/'>홈페이지 돌아가기</a>"
    );
  }
});

server.listen(port, (err) => {
  if (err) throw err;
  console.log("http server on :", port);
});

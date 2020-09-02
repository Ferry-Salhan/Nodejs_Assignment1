const http = require("http");
const fs = require("fs");

http
  .createServer(function (req, res) {
    const url = req.url;
    if (url === "/") {
      res.setHeader("content-type", "text/html");
      res.write("<html>");
      res.write(
        "<body><form action='/result' method='POST'><input type='text' name='message' /><button type='submit'>send</button></form></body>"
      );

      res.write("</html>");

      return res.end();
    }
    if (url === "/result" && req.method === "POST") {
      const body = [];

      req.on("data", (chunks) => {
        body.push(chunks);
        console.log(body);
      });
      req.on("end", () => {
        const parsedBody = Buffer.concat(body).toString();
        const message = Number(parsedBody.split("=")[1]);
        function primeFactorsTo(max) {
          var store = [],
            i,
            j,
            primes = [];
          for (i = 2; i <= max; ++i) {
            if (!store[i]) {
              primes.push(i);
              for (j = i << 1; j <= max; j += i) {
                store[j] = true;
              }
            }
          }
          return primes;
        }

        const res = primeFactorsTo(message);
        console.log(res);

        fs.writeFileSync("primeNumbers.txt", res);
        console.log("Result send");
      });
      res.on("error", () => {
        console.log("Error Occurred");
      });
      res.write("inside msg block");
      return res.end();
    }
    res.write("after if block");
    res.end();
  })
  .listen(5000);
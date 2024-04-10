import app from "./app";

export function main() {
  const port = 3000;
  const ipAddress = "localhost";

  app.listen(port, ipAddress, () => {
    console.log(`Server running at port ${port}`);
  });
}

main();

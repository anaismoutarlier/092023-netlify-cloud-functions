exports.handler = async function (event) {
  console.log(event);
  const { name = "world" } = event.queryStringParameters;

  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello ${name}!` }),
  };
};

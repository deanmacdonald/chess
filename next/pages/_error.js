function ErrorPage({ statusCode }) {
  return (
    <div>
      <h1>Error {statusCode || 500}</h1>
      <p>Something went wrong.</p>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;

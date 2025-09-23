import withLayout from '../hocs/withLayout';

const Custom404 = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Page Not Found.</h1>
      <a href="/"  style={{ textDecoration: 'underline' }}>Go back home</a>
    </div>
  );
}

export default withLayout(Custom404);

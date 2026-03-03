export default function Custom404() {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <p style={styles.text}>Page Not Found</p>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#000",
    color: "#0ff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textShadow: "0 0 10px #0ff",
  },
  code: {
    fontSize: "80px",
    margin: 0,
  },
  text: {
    fontSize: "24px",
  },
};

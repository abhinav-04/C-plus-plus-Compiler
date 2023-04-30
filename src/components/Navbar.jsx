import { Container, Typography } from "@mui/material";

function Navbar() {
  return (
    <Container
      sx={{
        margin: "4% auto 2% auto",
      }}
    >
      <Typography textAlign="center" fontSize={"4.5rem"} fontWeight="600">
        {"Compiler Batch-1"}
      </Typography>
    </Container>
  );
}

export default Navbar;

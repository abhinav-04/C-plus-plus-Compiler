import { Stack, Link, Container, Button, Typography } from "@mui/material";

function Footer() {
  return (
    <Container>
      <Stack direction="row" justifyContent="center">
        <Button variant="string">
          <Link
            href="https://github.com/abhinav-04"
            color="inherit"
            underline="hover"
          >
            {"GitHub"}
          </Link>
        </Button>

        <Typography color="gray" sx={{ margin: "2%" }}>
          Made by Devansh, Abhinav, Rohan, Vansh & Advik
        </Typography>
      </Stack>
    </Container>
  );
}

export default Footer;

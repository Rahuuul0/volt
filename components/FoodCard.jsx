import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Grid,
  Button,
  Typography,
  CardContent,
  Card,
  TextField,
} from "@mui/material";
import { cartCountAtom } from "../_state";
import { useRecoilState } from "recoil";

function FoodCard() {
  const theme = useTheme();
  const [cartCount, setCartCount] = useRecoilState(cartCountAtom);
  const [quantity, setQuantity] = useState(0);
  console.log(quantity, "quantity");

  const handleAddToCart = () => {
    setCartCount(cartCount + quantity);
  };

  return (
    <Card
      sx={{
        margin: "1rem",
        display: "flex",
        padding: "1rem",
        alignItems: "center",
      }}
      md={10}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            Cheezy-7 Pizza
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            An Exotic Combination of White Mozzarilla, Cream White Cheese,
          </Typography>
        </CardContent>
        <Box
          sx={{
            pl: 1,
            pb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">₹275</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Typography>Quantity</Typography>
            <Grid item xs={2}>
              <TextField
                type="number"
                defaultValue={1}
                size="small"
                onChange={(e) => setQuantity(e.target.value)}
              ></TextField>
            </Grid>
            <Button variant="contained" onClick={handleAddToCart}>
              Add To Cart
            </Button>
          </Box>
        </Box>
      </Box>
      <Box></Box>
    </Card>
  );
}

export default FoodCard;

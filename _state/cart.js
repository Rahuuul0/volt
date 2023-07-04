import { atom } from "recoil";

const cartCountAtom = atom({
  key: "cartCount",
  // get initial state from local storage to enable user to stay logged in
  default: 0,
});

export { cartCountAtom };

const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const validateMongoDbId = require("../utils/validateMongoId");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/generateRefreshToken");

//Register account

const createUser = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//user login
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//admin login

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.isAdmin === true) throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//handle RefreshToken

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No RefreshToken in Cookie");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No refreshToken present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id != decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

// logout

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No RefreshToken in Cookie");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(403);
  }
  await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: "",
    }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.status(200).json("Logout successful");
});

//get all users

const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (err) {
    throw new Error(err);
  }
});

//get single user

const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaUser = await User.findById(id);
    const { password, ...info } = getaUser._doc;
    res.json(info);
  } catch (err) {
    throw new Error(err);
  }
});

//delete User

const deletedUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (err) {
    throw new Error(err);
  }
});

const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user; // user login already
  validateMongoDbId(_id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (err) {
    throw new Error(err);
  }
});

//block-users

const blockUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const blockUsr = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockUsr);
  } catch (err) {
    throw new Error(err);
  }
});

//unblock-users

const unblockUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json("User Unblocked");
  } catch (err) {
    throw new Error(err);
  }
});

//addToCart

const addToCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await User.findById(_id);
    // check if user already have product in cart
    let alreadyExistCart = await Cart.findOne({ orderby: user._id });
    if (!alreadyExistCart) {
      alreadyExistCart = new Cart({ orderby: user._id });
    }
    for (let i = 0; i < cart.length; i++) {
      const existingProductIndex = alreadyExistCart.products.findIndex(
        (p) => p.product.toString() === cart[i]._id
      );
      if (existingProductIndex >= 0) {
        // product already exists in the cart, update the quantity
        alreadyExistCart.products[existingProductIndex].count += cart[i].count;
      } else {
        // new product, add to cart
        let object = {};
        object.product = cart[i]._id;
        object.count = cart[i].count;
        object.color = cart[i].color;
        let getPrice = await Product.findById(cart[i]._id)
          .select("price")
          .exec();
        object.price = getPrice.price;
        alreadyExistCart.products.push(object);
      }
    }
    let cartTotal = 0;
    for (let i = 0; i < alreadyExistCart.products.length; i++) {
      cartTotal =
        cartTotal +
        alreadyExistCart.products[i].price * alreadyExistCart.products[i].count;
    }
    alreadyExistCart.cartTotal = cartTotal;
    let newCart = await alreadyExistCart.save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

//get your cart
const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.findOne({ orderby: _id }).populate(
      "products.product"
    );
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

//empty cart
const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndDelete({ orderby: user._id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

//GET wishList

const getWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const getWishList = await User.findById(_id).populate("wishlist");
    res.json(getWishList);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  loginAdmin,
  logout,
  handleRefreshToken,
  getallUser,
  getaUser,
  deletedUser,
  updatedUser,
  blockUser,
  unblockUser,
  addToCart,
  getUserCart,
  emptyCart,
  getWishList,
};

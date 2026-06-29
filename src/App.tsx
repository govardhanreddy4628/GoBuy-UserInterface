import { lazy, Suspense } from 'react';
import "./App.css"
import { Routes, Route, Navigate } from "react-router-dom";
// import { ThemeProvider } from '@mui/material';

import { ThemeProvider } from './context/themeContext';
//import NotFound from "./pages/NotFound";
import BlogDetail from "./components/blogs/BlogDetails.tsx";
import BlogSection from "./components/blogs/BlogSection.tsx";
import { AuthProvider } from "./context/authContext";
import AddressForm from "./components/addressForm";
import OtpVerify from "./components/auth/otpVerify.tsx";
import AddressPage from "./components/addAddress";
import ResetPassword from "./components/auth/resetPassword";
import ForgotPassword from "./components/auth/forgotPassword";
import Toaster from "./ui/Toaster";
import GuestRoute from "./routes/GuestRoute";
//import ProtectedRoute from "./routes/ProtectedRoute";
import CustomerSupport from "./pages/CustomerSupport";
const SignUpPage = lazy(() => import ("./pages/SignUpPage.tsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.tsx"));

const Home = lazy(() => import("./pages/home"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage.tsx"));
import ProductCategories from "./pages/ProductCategories.tsx";
import { CartProvider } from "./context/cartContext.tsx";
import MyProfile from "./components/myAccount/myProfile.tsx";
import MyAddress from "./components/myAccount/myAddress.tsx";
import MyAccount from "./pages/MyAccount.tsx";
import MyWishList from './components/myAccount/myWishList.tsx';
import MyOrders from "./components/myAccount/myOrders.tsx";
const Checkout = lazy(() => import("./pages/Checkout.tsx"));
import OrderConfirmation from "./pages/OrderConfirmation.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const CartPage = lazy(() => import("./pages/cartPage.tsx"));

import PhonePeClone from "./components/fakePhonepe.tsx";
import StarRating from "./components/starRating.tsx";
import { WishlistProvider } from "./context/wishlistContext.tsx";

import Loader from './ui/Loader.tsx';

import TrackOrder from './pages/trackOrderPage.tsx';
import PaymentPage from './pages/paymentPage.tsx';
import { CategoryProvider } from './context/categoryContext.tsx';
//import { ProductProvider } from "./components/admin/context/productsContext.tsx";


const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      {/* <FormikComponent/> */}
      {/* <ThemeProvider theme={theme}> */}
      <ThemeProvider defaultTheme="system" storageKey="marketpulse-ui-theme">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <CategoryProvider>
                  <QueryClientProvider client={queryClient}>

                    {/* ✅ Suspense wrapper */}
                    <Suspense fallback={<Loader/>}>

                    {/* <RegisterForm/> */}
                    {/* <Counter/> */}

                    <Routes>
                      {/* <Route path='/' element={<Layout/>}>
        <Route index element={<Hero/>} />
      </Route>
      <Route path='formikfieldarray' element={<FormikFieldArray/>}></Route>
      <Route path='calendar2' element={<Calendar2/>}></Route>
      <Route path='calendar3' element={<Calendar3/>}></Route>


              {/* <Route element={<ProtectedRoute />}> */}
                      {/* <Route path='/' element={<Header />}></Route> */}
                      <Route path='/' element={<Home />}></Route>
                      <Route path="/address" element={<AddressForm />}></Route>
                      <Route path='productdetails/:id' element={<ProductDetailsPage />}></Route>
                      <Route path='search' element={<ProductDetailsPage />}></Route>
                      <Route path="products" element={<ProductCategories />}></Route>
                      <Route path="/blogsection" element={<BlogSection />}></Route>
                      <Route path="/blog/:id" element={<BlogDetail />} />
                      <Route path="cartPage" element={<CartPage />}></Route>
                      <Route path="/myaccount" element={<MyAccount />}>
                        <Route index element={<MyProfile />} />
                        <Route path="profile" element={<MyProfile />} />
                        <Route path="wishlist" element={<MyWishList />} />
                        <Route path="orders" element={<MyOrders />} />
                        <Route path="address" element={<MyAddress />} />
                      </Route>
                      <Route path="addaddress" element={<AddressPage />}></Route>
                      <Route path="checkout" element={<Checkout />}></Route>
                      <Route path="payment" element={<PaymentPage />}></Route>
                      <Route path="phonepe/:id" element={<PhonePeClone />}></Route>
                      <Route path="order-confirmation" element={<OrderConfirmation />}></Route>
                      <Route path="/track-order/:orderId" element={<TrackOrder />} />
                      <Route path="customersupport" element={<CustomerSupport />}></Route>
                      <Route path="rating"></Route>
                      <Route path="starrating" element={<StarRating />}></Route>
                      {/* </Route> */}


                      <Route element={<GuestRoute />}>
                        <Route path="signup" element={<SignUpPage />}></Route>
                        <Route path="login" element={<LoginPage />}></Route>
                        <Route path="otpverify" element={<OtpVerify />}></Route>
                        <Route path="forgot-password/:email" element={<ForgotPassword />}></Route>
                        <Route path="reset-password" element={<ResetPassword />}></Route>
                      </Route>

                      {/* <Route path='*' element={<NotFound />}></Route>  */}
                      {/* or */}
                      <Route path="*" element={<Navigate to="/" replace />} />

                    </Routes>
                    </Suspense>

                    {/*</ThemeProvider> */}
                    <Toaster />
                  </QueryClientProvider>
              </CategoryProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider >
    </>
  )
};

export default App;

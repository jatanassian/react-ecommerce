import { Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import Spinner from "./components/spinner/spinner.component";
import { checkUserSession } from "./store/user/user.action";

const Home = lazy(() => import('./routes/home/home.component'));
const Authentication = lazy(() => import('./routes/authentication/authentication.component'));
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));
const Navigation = lazy(() => import('./routes/navigation/navigation.component'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
	<Suspense fallback={<Spinner />}>
    	<Routes>
    	  <Route path="/" element={<Navigation />}>
    	    <Route index element={<Home />}></Route>
    	    <Route path="shop/*" element={<Shop />}></Route>
    	    <Route path="auth" element={<Authentication />}></Route>
    	    <Route path="checkout" element={<Checkout />}></Route>
    	  </Route>
    	</Routes>
	</Suspense>
  );
};

export default App;

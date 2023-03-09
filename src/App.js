import { Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { useDispatch } from "react-redux";
import Spinner from "./components/spinner/spinner.component";
import { checkUserSession } from "./store/user/user.action";

const Home = lazy(() => import('./routes/home/home.component'));

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

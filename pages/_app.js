import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <NotificationsProvider position="top-right">
        <Provider store={store}>
          {/* store.getState().auth.success */}
          <Navbar />
          <Component {...pageProps} />
        </Provider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default MyApp;

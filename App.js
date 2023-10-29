import * as React from "react";
import { Provider } from "react-redux";
import store from "./src/stores/store";
import AppContainer from "./src/pages/AppContainer";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
	default: "native",
});

const App = () => {
	return (
		<Provider store={store}>
			<AppContainer />
		</Provider>
	);
};

export default App;
